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
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import {TranslateUz} from 'variables/locales/translateUz';
import {TranslateRu} from 'variables/locales/translateRu';
import {LanguageStore} from 'contexts/state-management/language/languageStore';
import {siteSecurity} from 'contexts/allRequest';

i18n.use(initReactI18next).init({
    resources: {
        uz: {translation: TranslateUz},
        ru: {translation: TranslateRu},
    },
    lng: "uz",
    fallbackLng: "uz",
});

export default function Main() {
    const {setLanguageData, languageData} = LanguageStore()
    const [currentTheme, setCurrentTheme] = useState(initialTheme);
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const tokens = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('ROLE');
    const tokenExpiry = sessionStorage.getItem('tokenExpiry');

    useEffect(() => {
        setLanguageData(localStorage.getItem("selectedLang"))
        // siteSecurity()
    }, []);

    useEffect(() => {
        i18n.changeLanguage(languageData);
    }, [languageData]);

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
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('tokenExpiry');
                sessionStorage.removeItem('ROLE');
            }
        } else {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('tokenExpiry');
            sessionStorage.removeItem('ROLE');
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
