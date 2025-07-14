import {
  Recycle,
  Droplets,
  Users,
  Sun,
  Boxes,
  ListChecks,
  Globe,
} from 'lucide-react';
import {SiderItem} from './type';

export const siderItems: SiderItem[] = [
  {id: 1, path: '/dashboard', label: 'Dashboard', icon: '/icons/dashboard'},
  {
    id: 2,
    path: '/all-company-targets',
    label: 'All Company Targets',
    icon: ListChecks,
  },
  {
    id: 3,
    path: '/carbon-reduction',
    label: 'Carbon Reduction',
    icon: '/icons/carbon-reduction',
  },
  {
    id: 4,
    path: '/waste-and-recycling',
    label: 'Waste and Recycling',
    icon: Recycle,
  },
  {
    id: 5,
    path: '/water-management',
    label: 'Water Management',
    icon: Droplets,
  },
  {
    id: 6,
    path: '/gender-diversity',
    label: 'Gender Diversity',
    icon: Users,
  },
  {
    id: 7,
    path: '/supply-chain',
    label: 'Supply Chain',
    icon: Boxes,
  },
  {
    id: 8,
    path: '/renewables',
    label: 'Renewables',
    icon: Sun,
  },
  {
    id: 9,
    path: '/company-universe',
    label: 'Company Universe',
    icon: Globe,
  },
  {
    id: 10,
    path: '/account',
    label: 'Account',
    icon: '/icons/circle-user',
  },
  {
    id: 11,
    path: '/support-tickets',
    label: 'Support Tickets',
    icon: '/icons/head-phones',
  },
  {id: 12, path: '/faqs', label: 'FAQs', icon: '/icons/faqs'},
];
