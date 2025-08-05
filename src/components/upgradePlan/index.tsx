import {FunctionComponent} from 'react';
import Button from '../ui/button';
import {Link} from 'react-router-dom';

const FREE_PLAN_ID = import.meta.env.VITE_FREE_PLAN_ID;
const CURRENT_PLAN_ID = localStorage.getItem('planId');

const UpgradePlan: FunctionComponent = () => {
  return (
    <div className="w-full my-5 px-4 sm:px-6">
      <h1 className="text-2xl pt-6 pb-5 text-start">
        <span className="font-bold themetext">Upgrade Account</span> - Benefit
        from all features by upgrading to a Comprehensive Account
      </h1>
      <div className="flex flex-col space-y-4">
        <span className="w-full">
          Current Package: {localStorage.getItem('planName')}
        </span>
      </div>

      <Link to="/plans">
        {CURRENT_PLAN_ID === FREE_PLAN_ID ? (
          <Button
            type="submit"
            label={'Upgrade'}
            // label={`${
            //   CURRENT_PLAN_ID === FREE_PLAN_ID ? 'Upgrade' : 'Downgrade'
            // }`}
            className="mt-5 w-full sm:w-auto buttonbg cursor-pointer"
          />
        ) : null}
      </Link>
    </div>
  );
};

export default UpgradePlan;
