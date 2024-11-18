import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import { DefaultLayout, AuthLayout } from './components/Layouts';
import Signup from './pages/Signup';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        <DefaultLayout>
                            <Home />
                        </DefaultLayout>
                    }
                />
                <Route
                    path="/Signin"
                    element={
                        <AuthLayout>
                            <Signin />
                        </AuthLayout>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <AuthLayout>
                            <Signup />
                        </AuthLayout>
                    }
                />
                <Route
                    path="/revenue"
                    element={
                        <DefaultLayout>
                            <RevenueChart />
                        </DefaultLayout>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
