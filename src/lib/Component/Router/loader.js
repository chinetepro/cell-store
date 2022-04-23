import React from 'react';
import _ from 'lodash';
import {Redirect, Route, Switch} from 'react-router-dom';

const getPaths = (prefix = '', path) => {
    if (!prefix) return path;
    if (typeof path === 'string') {
        return `${prefix}${path}`;
    }
    if(Array.isArray(path))
        return path.map((itemPath)=>`${prefix}${itemPath}`);

    return path;
}

function loadRoute({routes, prefix, notfoundRedirect}) {
    return <Switch>
        {_.map(routes, ({path, ...props}, key) => <Route key={key} path={getPaths(prefix, path)}{...props}/>)}
        {notfoundRedirect && <Route name="page_no_found" component={() => <Redirect to={notfoundRedirect}/>}/>}
    </Switch>
}

export default loadRoute
