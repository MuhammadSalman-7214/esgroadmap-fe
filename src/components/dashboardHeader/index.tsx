import {UserRound} from 'lucide-react';

const DashboardHeader = () => {
  return (
    <div className="whitebg px-4 sm:px-10 md:px-5 flex items-center justify-between h-16 sm:h-20 relative">
      <div className="hidden lg:block w-6" />

      <div
        className="absolute left-1/2 -translate-x-1/2 transform text-center px-2 
                      md:static md:translate-x-0 md:left-0 md:text-left 
                      lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:text-center"
      >
        <h5 className="text-base sm:text-xl md:text-2xl lg:text-3xl m-0">
          {/* Welcome to{' '} */}
          <span className="themetext font-semibold whitespace-nowrap">
            ESGRoadmap Member Portal
          </span>
        </h5>
      </div>

      <div
        className="hidden md:flex gap-2 items-center 
                      md:ml-auto lg:ml-0 lg:absolute lg:right-10"
      >
        <p className="m-0 text-lg sm:text-md">
          {' '}
          {localStorage.getItem('username')}
        </p>

        <UserRound className="pt-0.5 rounded-full border-2" />
      </div>
    </div>
  );
};

export default DashboardHeader;
