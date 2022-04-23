import './index.css';
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as authClient from './lib/services/auth-client'
import PageLoader from './Components/PageLoader';
import { AppProviders } from './lib';

ReactDOM.render(
    <AppProviders authClient={authClient} PageLoader={PageLoader}>
        <App/>
    </AppProviders>,
    document.getElementById('root'),
)

