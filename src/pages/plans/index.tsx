import {useEffect, useState} from 'react';
import * as Paddle from '@paddle/paddle-js';
import Layout from '../../layout';
import api from '../../middleware';
import Button from '../../components/ui/button';
import {toast} from 'react-toastify';
import {PackageProp, Plan} from './type';

const Plans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const currentCustomerId = String(localStorage.getItem('customerId'));
  const [currentSubscriptionId, setCurrentSubscriptionId] = useState<
    string | null
  >(null);
  console.log('🚀 ~ Plans ~ currentSubscriptionId:', currentSubscriptionId);

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
        features: ['Feature 1', 'Feature 2'],
      }));

      setPlans(parsedPlans);
    };

    getPlans();
  }, []);

  useEffect(() => {
    const init = async () => {
      await Paddle.initializePaddle({
        token: 'test_b1eec75ae400731203d413a79f3',
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
              customerId: currentCustomerId,
              planId: newPriceId,
              planName: selectedPlan.title,
            };
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
    console.log('🛒 Opening checkout with priceId:', priceId);
    const paddle = Paddle.getPaddleInstance('v1');
    if (!paddle) return console.error('Paddle not initialized');

    const checkoutOptions: any = {
      items: [{price_id: priceId, quantity: 1}], // 🔥 FIXED
      customer: {id: currentCustomerId},
      settings: {displayMode: 'overlay'},
      existingSubscriptionId: currentSubscriptionId, // also OK here
    };

    paddle.Checkout.open(checkoutOptions);
  };

  return (
    <Layout bannerText="Upgrade Plan">
      <div className="w-full flex flex-wrap gap-6 my-8 px-4 md:px-10 lg:px-20 xl:px-32">
        {plans.map((pkg: Plan) => (
          <div
            key={pkg.id}
            className="w-full sm:w-[48%] lg:w-[31%] flex flex-col gap-4 text-center whitebg"
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
              className="mt-5 themebg mx-auto"
              onClick={() => openCheckout(pkg.id)}
            />
            {/* <button
              className="mt-6 w-full py-2 border-0 rounded-full text-white bg-blue-500 hover:bg-blue-700"
              onClick={() => openCheckout(pkg.priceId)} // assuming `plan.priceId` exists
            >
              Subscribe
            </button> */}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Plans;
