import React, { memo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MainLayout from "./Layouts/MainLayout";
import mainRoutes from './routesMain';
import AuthRouterLoader from './Modules/Authentication/Components/AuthRouterLoader';
import { logout } from './lib/services/auth-client';

const AuthenticatedApp = () => {
    const history = useHistory();
    useEffect(() => {
        const initialLocation = sessionStorage.getItem('__initial_location__');
        if (initialLocation) {
            sessionStorage.removeItem('__initial_location__');
            history.push(initialLocation);
        }
        window.addEventListener('storage', e => {
            const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKKEN);
            if (!token) {
                logout();
                window.location.href = '/';
            }
        });
    }, []);

    return  <MainApp />;
};

AuthenticatedApp.propTypes = {};

AuthenticatedApp.defaultProps = {};

export default memo(AuthenticatedApp);


const MainApp = memo(() => <MainLayout>
    <AuthRouterLoader routes={mainRoutes} notfoundRedirect={'/'} />
</MainLayout>);
