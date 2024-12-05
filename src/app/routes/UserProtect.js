import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { sIsLoggedIn } from '../../settings/globalStore';

// Higher Order Component : HOC
// Magic Number

export default function UserProtect({ children }) {
    const nav = useNavigate();

    useEffect(() => {
        const userDateToken = localStorage.getItem('userDateToken');
        if (new Date(userDateToken?.split('-')).getTime() > new Date().getTime()) {
            sIsLoggedIn.set(true);
            nav('/');
        }
    }, [nav]);

    if (!sIsLoggedIn.value) {
        return (
            <>
                <Navigate to={'/login'} />
            </>
        );
    }
    return <>{children}</>;
}
