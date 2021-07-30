import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Common from '../utils/Common';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            Common.getUser() && Common.getToken() && restricted ?
                <Redirect to="/dashboard" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;