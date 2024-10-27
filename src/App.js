import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Following from './pages/Following';
import { DefaultLayout } from './components/Layouts';

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
                    path="/following"
                    element={
                        <DefaultLayout>
                            <Following />
                        </DefaultLayout>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
