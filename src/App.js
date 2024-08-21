import './assets/css/App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import ClientLayout from './layouts/seller';
import {ChakraProvider} from '@chakra-ui/react';
import initialTheme from './theme/theme';
import {useState} from 'react';

export default function Main() {
    const [currentTheme, setCurrentTheme] = useState(initialTheme);
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
                <Route path="*" element={<Navigate to="/auth/sign-in" replace/>}/>
            </Routes>
        </ChakraProvider>
    );
}
