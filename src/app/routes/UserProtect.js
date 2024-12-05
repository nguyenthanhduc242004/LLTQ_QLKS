import React from 'react';
import { Navigate } from 'react-router-dom';
import { sIsLoggedIn } from '../../settings/globalStore';

// Higher Order Component : HOC
// Magic Number
export default function UserProtect({ children }) {
    if (!sIsLoggedIn.value) {
        return (
            <>
                <Navigate to={'/login'} />
            </>
        );
    }
    return <>{children}</>;
}
