import React, { Fragment, lazy, Suspense, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import PageLoader from './Components/PageLoader';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import NetworkAlert from './Modules/NetworkAlert/Page/Alert';
// import { useUser } from './lib';

const history = createBrowserHistory();

const loadAuthenticatedApp = () => import('./AuthenticatedApp');
const AuthenticatedApp = lazy(loadAuthenticatedApp);
// const UnauthenticatedApp = lazy(() => import('./UnauthenticatedApp'));

let initialLocation = window.location.pathname;

// eslint-disable-next-line no-undef
sessionStorage.setItem('__initial_location__', initialLocation); // hack to redirect after login;

function App() {
    // const { user } = useUser();
    // pre-load the authenticated side in the background while the user's
    // filling out the login form.
    useEffect(() => {
        loadAuthenticatedApp();
    }, []);

    return (
        <Router history={history}>
            <Fragment>
                <I18nextProvider i18n={i18n}>
                    <Suspense fallback={<PageLoader />}>
                        <BrowserRouter>
                            <AuthenticatedApp initialLocation={initialLocation} />                           
                        </BrowserRouter>
                    </Suspense>
                    <NetworkAlert />
                </I18nextProvider>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    limit={4}
                />
            </Fragment>
        </Router>
    );
}

export default App;
