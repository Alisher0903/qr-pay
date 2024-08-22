import {Icon} from '@chakra-ui/react';
import {
    MdBarChart,
    MdPerson,
    MdHome,
    MdLock,
    MdOutlineShoppingCart,
} from 'react-icons/md';
import {TbCashRegister} from "react-icons/tb";

import AdminDashboard from 'views/admin/default';
import SellerDashboard from 'views/seller/default';
import Partner from 'views/admin/partner';
import TerminalAdmin from 'views/admin/terminal';
import Payment from 'views/admin/dataTables';
import SignInCentered from 'views/auth/signIn';
import {IoQrCode} from 'react-icons/io5';
import {RiRefund2Line} from 'react-icons/ri';
import SellerTerminal from 'views/seller/terminal';
import SellerOrder from 'views/seller/order';
import SellerRefund from 'views/seller/refund';

const routes = [
    //  Admin panel route
    {
        name: 'Dashboard',
        layout: '/admin',
        path: '/dashboard',
        icon: <Icon as={MdHome} width="20px" height="20px" color="inherit"/>,
        component: <AdminDashboard/>,
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
        component: <Partner/>,
        // secondary: true,
    },
    {
        name: 'Payment',
        layout: '/admin',
        icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit"/>,
        path: '/payments',
        component: <Payment/>,
    },
    {
        name: 'Terminal',
        layout: '/admin',
        path: '/terminal_lists',
        icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit"/>,
        component: <TerminalAdmin/>,
    },
    //  Seller panel route
    {
        name: 'Dashboard',
        layout: '/seller',
        path: '/main',
        icon: <Icon as={MdHome} width="20px" height="20px" color="inherit"/>,
        component: <SellerDashboard/>,
    },
    {
        name: 'Terminal',
        layout: '/seller',
        path: '/sellerterminal',
        icon: <Icon as={TbCashRegister} width="20px" height="20px" color="inherit"/>,
        component: <SellerTerminal/>,
    },
    {
        name: 'Orders',
        layout: '/seller',
        path: '/order',
        icon: <Icon as={IoQrCode} width="20px" height="20px" color="inherit"/>,
        component: <SellerOrder/>,
    },
    {
        name: 'Refund',
        layout: '/seller',
        path: '/refund',
        icon: <Icon as={RiRefund2Line} width="20px" height="20px" color="inherit"/>,
        component: <SellerRefund/>,
    },
    //  Terminal panel route
    {
        name: 'Terminal dashboard',
        layout: '/terminal',
        path: '/default',
        icon: <Icon as={RiRefund2Line} width="20px" height="20px" color="inherit"/>,
        component: <SellerRefund/>,
    },
    {
        name: 'Sign In',
        layout: '/auth',
        path: '/sign-in',
        icon: <Icon as={MdLock} width="20px" height="20px" color="inherit"/>,
        component: <SignInCentered/>,
    },
];

export default routes;
