import React from 'react';
import { Route, Redirect } from 'react-router-dom';
 

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            !!localStorage.getItem("token") && restricted ?
                <Redirect to="/expenses" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;