import React from 'react'
import {AuthProvider} from './auth-context'
import {UserProvider} from './user-context'

function AppProviders({children, authClient, PageLoader}) {
    return (
        <AuthProvider authClient={authClient} PageLoader={PageLoader}>
            <UserProvider>{children}</UserProvider>
        </AuthProvider>
    )
}


export default AppProviders
