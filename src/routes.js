import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from 'react-icons/md';

import MainDashboard from 'views/admin/default';
import SellerDashboard from 'views/seller/default';
import NFTMarketplace from 'views/admin/marketplace';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';
import SignInCentered from 'views/auth/signIn';

const routes = [
  {
    name: 'Dashboard',
    layout: '/admin',
    path: '/dashboard',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
  },
  {
    name: 'Partner',
    layout: '/admin',
    path: '/partners',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <NFTMarketplace />,
    // secondary: true,
  },
  {
    name: 'Payment',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/payments',
    component: <DataTables />,
  },
  {
    name: 'Terminal',
    layout: '/admin',
    path: '/terminal',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
  },
  {
    name: 'Seller-dashboard',
    layout: '/seller',
    path: '/main',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <SellerDashboard />,
  },
  {
    name: 'Seller-terminal',
    layout: '/seller',
    path: '/sellerterminal',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <SellerDashboard />,
  },
  {
    name: 'Seller-orders',
    layout: '/seller',
    path: '/order',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <SellerDashboard />,
  },
  {
    name: 'Seller-refund',
    layout: '/seller',
    path: '/refund',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <SellerDashboard />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignInCentered />,
  },
];

export default routes;
