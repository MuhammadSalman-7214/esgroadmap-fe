import {useRoutes} from 'react-router-dom';
import {routesConfig} from './routes';
import {FunctionComponent} from 'react';

export const AppRoutes: FunctionComponent = () => {
  const element = useRoutes(routesConfig);
  return element;
};
