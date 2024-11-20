import React from 'react';
import MainRoutes from './app/routes/MainRoutes';
import GlobalStyles from './app/components/GlobalStyles';

export default function App() {
    return (
        <GlobalStyles>
            <MainRoutes />
        </GlobalStyles>
    );
}
