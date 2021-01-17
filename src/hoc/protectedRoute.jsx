import React from 'react'
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { ROUTES } from "../constants";

const ProtectedRoute = ({ component: Component, ...rest }) => {

    const auth = useSelector((state) => {
        return state?.auth;
    });

    const isLoggedIn = auth?.isAuthenticated;
    console.log(isLoggedIn)

    return (
        <Route {...rest} render={
            props => {
                if (isLoggedIn) {
                    return <Component {...rest} {...props} />
                } else {
                    return <Redirect to={ROUTES.FORBIDDEN}/>
                }
            }
        } />
    )
}

export default ProtectedRoute;