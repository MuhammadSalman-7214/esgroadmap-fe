import {Recycle, Droplets, Users, Sun, Boxes} from 'lucide-react';
import {SiderItem} from './type';

export const siderItems: SiderItem[] = [
  {id: 1, path: '/dashboard', label: 'Dashboard', icon: '/icons/dashboard'},
  {
    id: 2,
    path: '/carbon-reduction',
    label: 'Carbon Reduction',
    icon: '/icons/carbon-reduction',
  },
  {
    id: 3,
    path: '/waste-and-recycling',
    label: 'Waste and Recycling',
    icon: Recycle,
  },
  {
    id: 4,
    path: '/water-management',
    label: 'Water Management',
    icon: Droplets,
  },
  {
    id: 5,
    path: '/gender-diversity',
    label: 'Gender Diversity',
    icon: Users,
  },
  {
    id: 6,
    path: '/supply-chain',
    label: 'Supply Chain',
    icon: Sun,
  },
  {
    id: 7,
    path: '/renewables',
    label: 'Renewables',
    icon: Boxes,
  },
  {
    id: 8,
    path: '/account',
    label: 'Account',
    icon: '/icons/circle-user',
  },
  {
    id: 9,
    path: '/support-tickets',
    label: 'Support Tickets',
    icon: '/icons/head-phones',
  },
  {id: 10, path: '/faqs', label: 'FAQs', icon: '/icons/faqs'},
];
