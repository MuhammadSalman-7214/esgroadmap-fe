import {useEffect, useState} from 'react';
import * as Paddle from '@paddle/paddle-js';
import Layout from '../../layout';
import api from '../../middleware';
import Button from '../../components/ui/button';
import {toast} from 'react-toastify';
import {PackageProp, Plan} from './type';
import {useNavigate} from 'react-router-dom';

const CLIENT_SIDE_TOKEN = import.meta.env.VITE_CLIENT_SIDE_TOKEN;
const FREE_PLAN_ID = import.meta.env.VITE_FREE_PLAN_ID;

const Plans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const currentCustomerId = String(localStorage.getItem('customerId'));
  const [currentSubscriptionId, setCurrentSubscriptionId] = useState<
    string | null
  >(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getSubscription = async () => {
      try {
        const res = await api.get(`/subscription/subscriptions`);
        const subscriptions = res.data;

        if (subscriptions.subscription?.length > 0) {
          setCurrentSubscriptionId(subscriptions.subscription[0].id);
        } else {
          console.warn('No active subscriptions found.');
        }
      } catch (err) {
        console.error('Error fetching subscription:', err);
      }
    };

    if (currentCustomerId) {
      getSubscription();
    }
  }, []);

  useEffect(() => {
    const getPlans = async () => {
      const response = await api.get('/subscription/products');
      const data: PackageProp = response.data;

      const parsedPlans: Plan[] = data.prices.data.map((price) => ({
        id: price.id,
        title: price.name,
        access: price.description,
        amount: (Number(price.unit_price.amount) / 100).toFixed(2),
        currency: price.unit_price.currency_code,
        duration: `${price.billing_cycle.frequency} ${price.billing_cycle.interval}`,
        features: price.custom_data ? Object.values(price.custom_data) : [],
      }));

      setPlans(parsedPlans);
    };

    getPlans();
  }, []);

  useEffect(() => {
    const init = async () => {
      await Paddle.initializePaddle({
        token: `${CLIENT_SIDE_TOKEN}`,
        environment: 'sandbox',
        eventCallback: async (event: any) => {
          console.log('🚀 Paddle Event:', event);

          if (event.name === 'checkout.completed') {
            const items = event.data.items || [];

            if (!items.length) {
              console.error('❌ No items in event payload');
              toast.error('No items in transaction.');
              return;
            }

            const newPriceId = items[0].price_id;
            const selectedPlan = plans.find((plan) => plan.id === newPriceId);

            if (!selectedPlan) {
              console.error(
                '❌ Could not find matching plan for priceId:',
                newPriceId
              );
              toast.error('Failed to identify selected plan.');
              return;
            }

            const payload = {
              customerId: event.data.customer?.id,
              planId: newPriceId,
              planName: selectedPlan.title,
              isPaid: true,
            };
            localStorage.setItem('customerId', event.data.customer?.id || '');
            localStorage.setItem('planId', newPriceId);
            localStorage.setItem('planName', selectedPlan.title);
            console.log('📦 Sending payload to update user:', payload);

            try {
              await api.put('/user/update', payload);
              toast.success('Subscription upgraded successfully!');
            } catch (error) {
              console.error('❌ API error during user update:', error);
              toast.error('Failed to update subscription');
            }
          }
        },
      });
    };

    init();
  }, [currentSubscriptionId, plans]);

  const openCheckout = (priceId: string) => {
    const paddle = Paddle.getPaddleInstance('v1');
    if (!paddle) return console.error('Paddle not initialized');

    // Create base checkout options
    const checkoutOptions: any = {
      items: [{price_id: priceId, quantity: 1}],
      settings: {displayMode: 'overlay'},
    };

    // Only include customer and existing subscription if customerId is available
    if (currentCustomerId) {
      checkoutOptions.customer = {id: currentCustomerId};
      if (currentSubscriptionId) {
        checkoutOptions.existingSubscriptionId = currentSubscriptionId;
      }
    }

    paddle.Checkout.open(checkoutOptions);
  };

  return (
    <Layout bannerText="Upgrade Plan">
      <div className="w-full flex flex-wrap gap-6 my-8 px-4 md:px-10 lg:px-20 xl:px-32">
        {plans.map((pkg: Plan) => (
          <div
            key={pkg.id}
            className="w-full sm:w-[48%] flex flex-col gap-4 text-center whitebg"
          >
            <div className="textwhite py-3 px-4 text-xl md:text-2xl font-semibold themebg">
              <span>{pkg.title}</span>
              <span>{' - '}</span>
              <span>{pkg.access}</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <div className="relative">
                <span className="absolute top-1 left-2 text-xl md:text-2xl font-bold themetext">
                  {pkg.currency}
                </span>
                <div className="text-5xl md:text-6xl font-bold leading-none px-6 mt-6 themetext">
                  {pkg.amount.split('.')[0]}
                </div>
                <span className="absolute top-1 -right-2 text-lg md:text-xl font-medium themetext">
                  {pkg.amount.split('.')[1]}
                </span>
              </div>

              <div className="text-sm textgray mt-3">{pkg.duration}</div>
            </div>

            <ul className="pl-4 text-sm flex flex-col mx-1 mt-8 space-y-2">
              {pkg.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex gap-2 items-center justify-center py-2 px-3 border-t bordergray"
                >
                  <img
                    src="/icons/circle-tick.svg"
                    alt="tick"
                    className="h-4 w-4"
                  />
                  <span className="text-left">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              type="submit"
              label="Upgrade Plan"
              className="mt-5 themebg mx-auto cursor-pointer"
              onClick={async () => {
                console.log('CLicked');
                const isFreePlan = pkg.id === `${FREE_PLAN_ID}`;

                // Downgrade to free from paid
                if (isFreePlan && currentCustomerId) {
                  try {
                    const payload = {
                      customerId: '',
                      planId: pkg.id,
                      planName: pkg.title,
                      isPaid: false,
                    };
                    await api.put('/user/update', payload);
                    localStorage.setItem('planId', pkg.id);
                    localStorage.setItem('planName', pkg.title);
                    localStorage.removeItem('customerId');
                    toast.success('Successfully downgraded to free plan.');
                    navigate('/account');
                  } catch (error) {
                    console.error('❌ Error updating to free plan:', error);
                    toast.error('Failed to downgrade to free plan.');
                  }
                  return;
                }

                // Upgrade to paid from free (no customerId)
                if (!currentCustomerId && !isFreePlan) {
                  openCheckout(pkg.id);
                  return;
                }

                // Normal upgrade for existing customer (switching paid plan)
                if (currentCustomerId && !isFreePlan) {
                  openCheckout(pkg.id);
                  return;
                }
              }}
            />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Plans;
