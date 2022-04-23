import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Pass props down to child component.
 */
const RouteWithProps = ({component, ...rest}) => {
    const Component = component;
    return (<Route
            {...rest}
            render={props => <Component {...rest} {...props}/>}
        />
    );
}

RouteWithProps.propTypes = {
    component: PropTypes.func.isRequired,
};

export default RouteWithProps;
