import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Common from '../utils/Common';

const PrivateRoute = ({component: Component, restricted, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        // <Route {...rest} render={props => (
        //     (Common.getUser() && restricted) ?
        //         <Component {...props} />
        //     : <Redirect to="/" />
        // )} />
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            sessionStorage.getItem("user") && restricted ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;