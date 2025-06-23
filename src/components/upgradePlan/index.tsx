import {FunctionComponent} from 'react';
import Button from '../ui/button';
import {Link} from 'react-router-dom';

const UpgradePlan: FunctionComponent = () => {
  return (
    <div className="w-full my-5 px-4 sm:px-6">
      <h1 className="text-2xl font-bold pt-6 pb-5 themetext text-start">
        Update Package
      </h1>
      <div className="flex flex-col space-y-4">
        <span className="w-full">
          Current Package: {localStorage.getItem('planName')}
        </span>
      </div>

      <Link to="/plans">
        <Button
          type="submit"
          label={'Upgrade'}
          className="mt-5 w-full sm:w-auto buttonbg"
        />
      </Link>
    </div>
  );
};

export default UpgradePlan;
