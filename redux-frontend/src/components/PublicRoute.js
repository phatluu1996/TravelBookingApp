import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Common from '../utils/Common';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        // <Route {...rest} render={props => (
        //     restricted ? <Component {...props} />
        //        : <Redirect to="/" />
        // )} />

        <Route {...rest} render={props => (
            sessionStorage.getItem("user") && restricted ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;