import {NavItem} from './type';

export const navItems: NavItem[] = [
  {
    id: 1,
    title: 'Sign up',
    link: '/auth/signup',
    isButton: false,
    className: 'cursor-pointer',
  },
  {
    id: 2,
    title: 'Contact Us',
    isButton: true,
    link: '/',
  },
];
