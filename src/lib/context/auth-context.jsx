import React, {createContext, useContext, useLayoutEffect, useMemo, useState} from 'react'
import FullPageSpinner from '../Component/Loading'
import ApiClientService from '../services/ApiClient'


const AuthContext = createContext();

function AuthProvider({authClient, PageLoader, ...props}) {
    const [isPending, setPending] = React.useState(true);
    const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);
    const [data, setData] = useState({});
    const [error, setError] = useState({error: null, isRejected: false});

    const {subscribe, reload, logout, updateCache} = useMemo(() => {
        const {subscribe, reload, updateCache} = authClient.bootstrapAppData();
        const logout = () => authClient.logout().then(reload);
        return {subscribe, reload, updateCache, logout};
    }, [authClient]);


    useLayoutEffect(() => {
        if (!firstAttemptFinished) {
            subscribe({
                next: (data) => {
                    setFirstAttemptFinished(true);
                    setData(data);
                    setPending(false);
                },
                error: (error) => {
                    setFirstAttemptFinished(true);
                    setError({error, isRejected: true});
                    setPending(false);
                }
            });
            ApiClientService.onError(logout, 401);
        }
    }, [firstAttemptFinished, subscribe, logout]);

    if (!firstAttemptFinished) {
        if (isPending) {
            return PageLoader ? <PageLoader/> : <FullPageSpinner/>
        }
        if (error.isRejected) {
            return (
                <div style={{color: 'red'}}>
                    <p>Uh oh... There's a problem. Try refreshing the app.</p>
                    <pre>{error.error.message}</pre>
                </div>
            )
        }
    }

    const login = form => authClient.login(form).then(reload);
    const register = form => authClient.register(form).then(reload);


    return (
        <AuthContext.Provider value={{data, login, logout, register, reload, updateCache}} {...props} />
    )
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error(`useAuth must be used within a AuthProvider`)
    }
    return context
}

export {AuthProvider, useAuth}
