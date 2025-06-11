import {AuthBannerProps} from './type';
import {FunctionComponent} from 'react';

const AuthBanner: FunctionComponent<AuthBannerProps> = ({text}) => {
  return (
    <div className="w-full min-h-[10rem] bannerbg !flex items-center justify-center px-4 text-center">
      <h2 className="text-3xl font-semibold themetext">{text}</h2>
    </div>
  );
};

export default AuthBanner;
