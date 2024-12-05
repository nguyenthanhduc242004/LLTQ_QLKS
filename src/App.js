import React from 'react';
import GlobalStyles from './app/components/GlobalStyles';
import MainRoutes from './app/routes/MainRoutes';

export default function App() {
    return (
        <GlobalStyles>
            <MainRoutes />
        </GlobalStyles>
    );
}
