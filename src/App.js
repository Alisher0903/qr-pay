import './assets/css/App.css';
import {Routes, Route, Navigate, useLocation, useNavigate} from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import ClientLayout from './layouts/seller';
import TerminalLayout from './layouts/terminal';
import {ChakraProvider} from '@chakra-ui/react';
import initialTheme from './theme/theme';
import {useEffect, useState} from 'react';
import {consoleClear} from "./contexts/toast-message";
import {setConfig} from "./contexts/token";

export default function Main() {
    const [currentTheme, setCurrentTheme] = useState(initialTheme);
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const tokens = localStorage.getItem('token');
    const role = localStorage.getItem('ROLE');
    const tokenExpiry = localStorage.getItem('tokenExpiry');

    useEffect(() => {
        setConfig();
        const refresh = sessionStorage.getItem('refreshes');

        if (!tokens) {
            sessionStorage.removeItem('refreshes');
            if (!pathname.startsWith('/auth')) navigate('/auth/sign-in');
        } else if (!refresh) sessionStorage.setItem('refreshes', 'true');
    }, [tokens, pathname, navigate]);

    useEffect(() => {
        setConfig();
        window.scrollTo(0, 0);

        if (pathname === '/') {
            if (role === 'ROLE_SUPER_ADMIN') {
                if (!tokens) navigate('/auth/sign-in');
                else navigate('/admin/dashboard');
            } else if (role === 'ROLE_SELLER') {
                if (!tokens) navigate('/auth/sign-in');
                else navigate('/seller/dashboard');
            } else if (role === 'ROLE_TERMINAL') {
                if (!tokens) navigate('/auth/sign-in');
                else navigate('/terminal/payment');
            }
        }

        if (tokens && tokenExpiry) {
            const now = new Date().getTime();
            if (now > parseInt(tokenExpiry)) {
                localStorage.removeItem('token');
                localStorage.removeItem('tokenExpiry');
                localStorage.removeItem('ROLE');
            }
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiry');
            localStorage.removeItem('ROLE');
        }

        if (!tokens && !pathname.startsWith('/auth')) navigate('/auth/sign-in');
        if (!tokens && pathname.startsWith('/auth')) sessionStorage.removeItem('refreshes');

        setTimeout(() => {
            consoleClear();
        }, 10000)
    }, [pathname, tokens, navigate]);

    return (
        <ChakraProvider theme={currentTheme}>
            <Routes>
                <Route path="auth/*" element={<AuthLayout/>}/>
                <Route
                    path="admin/*"
                    element={<AdminLayout theme={currentTheme} setTheme={setCurrentTheme}/>}
                />
                <Route
                    path="seller/*"
                    element={<ClientLayout theme={currentTheme} setTheme={setCurrentTheme}/>}
                />
                <Route
                    path="terminal/*"
                    element={<TerminalLayout theme={currentTheme} setTheme={setCurrentTheme}/>}
                />
                <Route path="*" element={<Navigate to="/auth/sign-in" replace/>}/>
            </Routes>
        </ChakraProvider>
    );
}
