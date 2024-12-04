import React from 'react';
import { Navigate } from 'react-router-dom';

// Higher Order Component : HOC
// Magic Number
export default function UserProtect({ children }) {
    if (!localStorage.getItem('username')) {
        return (
            <>
                <Navigate to={'/login'} />
            </>
        );
    }
    return <>{children}</>;
}
