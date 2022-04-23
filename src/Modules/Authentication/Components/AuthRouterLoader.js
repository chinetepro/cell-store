import React, {memo, useMemo} from 'react';
import PropTypes from 'prop-types';
import reduce from 'lodash/reduce';
import { RouterLoader, useUser } from '../../../lib';

// eslint-disable-next-line react/display-name
const AuthRouterLoader = memo(({routes, notfoundRedirect}) => {
    const {user, hasPermission} = useUser();
    
    const validRoutes = useMemo(() => reduce(routes, (result, value, key) => {
        if (value?.permission) {
            return hasPermission(value.permission) ? {...result, [key]: value} : result;
        }
        
        if (value?.existSpace) {
            return result;
        }
        
        return {...result, [key]: value};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, {}), [user, hasPermission, routes]);
    
    return (<RouterLoader routes={validRoutes} notfoundRedirect={notfoundRedirect}/>);
});

AuthRouterLoader.propTypes = {
    routes: PropTypes.object,
    notfoundRedirect: PropTypes.string,
};

AuthRouterLoader.defaultProps = {};

export default memo(AuthRouterLoader);
