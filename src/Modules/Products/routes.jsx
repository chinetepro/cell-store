import React from 'react';
import routes from './constants/routes.constant';
import AuthRouterLoader from '../Authentication/Components/AuthRouterLoader';


const Routes = () => {
    return (
        <>
            <AuthRouterLoader routes={routes} notfoundRedirect={'/'}/>
        </>
    );
};

Routes.propTypes = {};

Routes.defaultProps = {};

export {Routes};
