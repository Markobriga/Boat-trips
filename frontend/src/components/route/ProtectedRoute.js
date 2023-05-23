import React, {Fragment, useEffect} from "react";
import {Route, Navigate} from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, roles }) => {

    const {isAuthenticated, loading, user } = useSelector(state => state.auth)

    if(loading===false && isAuthenticated===false) {
        return <Navigate to="/login" />
    }
    else if(loading===false && roles && roles.includes(user.role)===false) {
        return <Navigate to="/"/>
    }
    else if(loading===false) {
        return children
    }    
}

export default ProtectedRoute;