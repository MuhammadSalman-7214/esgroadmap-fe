import {FunctionComponent, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Button from '../ui/button';
import api from '../../middleware';
import {Plan, PackageProp} from './type';

const Packages: FunctionComponent = () => {
  const [plans, setPlans] = useState<Plan[]>([]);

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

  return (
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

          <Link
            to="/auth/membership-account/membership-checkout"
            state={{packageData: pkg}}
          >
            <Button type="submit" label="Signup" className="mt-5 themebg" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Packages;
