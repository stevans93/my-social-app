import React from 'react';
import { Navigate } from 'react-router-dom';

function AuthGuardianLogIn({ children }) {
    function isLoggedInUser() {
        if(!localStorage.hasOwnProperty('sm_user')) {
            return !localStorage.getItem('sm_user');
        }
    }

    return isLoggedInUser() ? children : <Navigate to={'/'} />;
}

export default AuthGuardianLogIn;