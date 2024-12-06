import React from 'react';
import { Navigate } from 'react-router-dom';
import { sIsLoggedIn } from '../../settings/globalStore';

// Higher Order Component : HOC
// Magic Number

export default function UserProtect({ children }) {
    const isLoggedIn = sIsLoggedIn.use();
    if (!isLoggedIn) {
        return (
            <>
                <Navigate to={'/login'} />
            </>
        );
    }
    return <>{children}</>;
}
