import React, {useCallback} from 'react'
import {useAuth} from './auth-context'

const UserContext = React.createContext();


function UserProvider(props) {
    const {
        data,
        updateCache
    } = useAuth();

    const user = data ? data.user : null;
    const hasPermission = useCallback((permission) => {
        if (!permission) return true;
        if (!user || !user.permissions) return false;
        return user.permissions.some((userPermission) => userPermission === "ADMIN" || userPermission === permission.toUpperCase());
    }, [user]);

    const hasRoles = useCallback((roles, needAll) => {
        if (!roles) return true;
        if (!user || !user.roles) return false;
        const _hasRole = (role) => user.roles.some((userRole) => userRole === role);
        if (Array.isArray(roles)) {
            if (needAll)
                return !roles.some(role => !_hasRole(role));
            else
                return roles.some(role => _hasRole(role))
        }
        return _hasRole(roles);
    }, [user]);

    return <UserContext.Provider value={{user, updateCache, hasPermission, hasRoles}} {...props} />
}

function useUser() {
    const context = React.useContext(UserContext);
    if (context === undefined) {
        throw new Error(`useUser must be used within a UserProvider`)
    }
    return context
}

export {UserProvider, useUser}
