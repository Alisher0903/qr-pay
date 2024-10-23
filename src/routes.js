import {Icon} from '@chakra-ui/react';
import {MdHome, MdLock, MdOutlineShoppingCart,} from 'react-icons/md';
import {TbCashRegister} from 'react-icons/tb';
import {IoQrCode, IoStatsChart, IoTerminal} from 'react-icons/io5';
import {RiFileList3Line, RiRefund2Line} from 'react-icons/ri';
import {SiContactlesspayment} from "react-icons/si";
import {FaCodePullRequest} from "react-icons/fa6";
import AdminDashboard from 'views/admin/default';
import Partner from 'views/admin/partner';
import SignInCentered from 'views/auth/signIn';
import SellerTerminal from 'views/seller/terminal';
import SellerOrder from 'views/seller/order';
// import SellerRefund from 'views/seller/refund';
import Notification from 'views/notification/notification';
import Request from "./views/admin/request";
import SignUp from 'views/auth/signUp';
import UserTerminal from "./views/seller/users-terminal";
import {FaUsersCog} from "react-icons/fa";
import CheckCode from 'views/auth/signIn/checkCode';
import PrivacyTermsPage from 'views/shartlar/PrivacyTermsPage';
import WordsPage from 'views/admin/words';
import OrderStats from 'views/admin/orderStats';

export const generateRoutes = (t) => [
    // Admin panel route
    {
        name: t('dashboard'),
        layout: '/admin',
        path: '/dashboard',
        icon: <Icon as={MdHome} width="20px" height="20px" color="inherit"/>,
        component: <AdminDashboard/>,
    },
    {
        name: t('merchant'),
        layout: '/admin',
        path: '/partner',
        icon: <Icon as={MdOutlineShoppingCart} width="20px" height="20px" color="inherit"/>,
        component: <Partner/>,
        secondary: true,
    },
    {
        name: t('terminal'),
        layout: '/admin',
        path: '/terminal',
        icon: <Icon as={IoTerminal} width="20px" height="20px" color="inherit"/>,
        component: <SellerTerminal/>,
    },
    {
        name: t('payment'),
        layout: '/admin',
        icon: <Icon as={SiContactlesspayment} width="20px" height="20px" color="inherit"/>,
        path: '/payment',
        component: <SellerOrder/>,
    },
    {
        name: t('request'),
        layout: '/admin',
        path: '/request',
        icon: <Icon as={FaCodePullRequest} width="20px" height="20px" color="inherit"/>,
        component: <Request/>,
    },
    {
        name: t('paymentStats'),
        layout: '/admin',
        path: '/statistic',
        icon: <Icon as={IoStatsChart} width="20px" height="20px" color="inherit"/>,
        component: <OrderStats/>,
    },

    {
        name: t("words"),
        layout: '/admin',
        path: '/words',
        icon: <Icon as={RiFileList3Line} width="20px" height="20px" color="inherit"/>,
        component: <WordsPage/>,
    },
    {
        name: '',
        layout: '/admin',
        path: '/notification',
        icon: <Icon as={RiRefund2Line} width="20px" height="20px" color="inherit"/>,
        component: <Notification/>,
    },
    // Seller panel route
    {
        name: t('dashboard'),
        layout: '/seller',
        path: '/dashboard',
        icon: <Icon as={MdHome} width="20px" height="20px" color="inherit"/>,
        component: <AdminDashboard/>,
    },
    {
        name: t('terminal'),
        layout: '/seller',
        path: '/terminal',
        icon: <Icon as={TbCashRegister} width="20px" height="20px" color="inherit"/>,
        component: <SellerTerminal/>,
    },
    {
        name: t('terminalUsers'),
        layout: '/seller',
        path: '/users-terminal',
        icon: <Icon as={FaUsersCog} width="20px" height="20px" color="inherit"/>,
        component: <UserTerminal/>,
    },
    {
        name: t('payment'),
        layout: '/seller',
        path: '/payment',
        icon: <Icon as={IoQrCode} width="20px" height="20px" color="inherit"/>,
        component: <SellerOrder/>,
    },
    {
        name: t('paymentStats'),
        layout: '/seller',
        path: '/statistic',
        icon: <Icon as={IoStatsChart} width="20px" height="20px" color="inherit"/>,
        component: <OrderStats/>,
    },
    // {
    //     name: t('refund'),
    //     layout: '/seller',
    //     path: '/refund',
    //     icon: <Icon as={RiRefund2Line} width="20px" height="20px" color="inherit"/>,
    //     component: <SellerRefund/>,
    // },
    {
        name: '',
        layout: '/seller',
        path: '/notification',
        icon: <Icon as={RiRefund2Line} width="20px" height="20px" color="inherit"/>,
        component: <Notification/>,
    },
    // Terminal panel route
    {
        name: t('payment'),
        layout: '/terminal',
        path: '/payment',
        icon: <Icon as={RiRefund2Line} width="20px" height="20px" color="inherit"/>,
        component: <SellerOrder/>,
    },
    {
        name: '',
        layout: '/terminal',
        path: '/notification',
        icon: <Icon as={RiRefund2Line} width="20px" height="20px" color="inherit"/>,
        component: <Notification/>,
    },
    {
        name: t('signIn'),
        layout: '/auth',
        path: '/sign-in',
        icon: <Icon as={MdLock} width="20px" height="20px" color="inherit"/>,
        component: <SignInCentered/>,
    },
    {
        name: "ckeck code",
        layout: '/auth',
        path: '/check-code',
        icon: <Icon as={MdLock} width="20px" height="20px" color="inherit"/>,
        component: <CheckCode/>,
    },
    {
        name: "ckeck code",
        layout: '/auth',
        path: '/privacy-policy',
        icon: <Icon as={MdLock} width="20px" height="20px" color="inherit"/>,
        component: <PrivacyTermsPage />,
    },
    {
        name: t('signUp'),
        layout: '/auth',
        path: '/sign-up',
        icon: <Icon as={MdLock} width="20px" height="20px" color="inherit"/>,
        component: <SignUp/>,
    },
];
