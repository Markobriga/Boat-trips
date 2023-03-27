import React, {Fragment} from "react";
import {Route, Navigate} from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {

    const {isAuthenticated, loading, user } = useSelector(state => state.auth)
   
    if(!loading && !isAuthenticated) {
        return <Navigate to="/login" />
    }
    return children
}

export default ProtectedRoute;