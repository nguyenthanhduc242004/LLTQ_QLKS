import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import Home from '../pages/Home';
import RoomList from '../pages/RoomList';
import Checkin from '../pages/Checkin';

export default function MainRoutes() {
    return (
        <BrowserRouter>
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
                    path="/danh-sach-phong"
                    element={
                        <DefaultLayout>
                            <RoomList />
                        </DefaultLayout>
                    }
                />
                <Route path="/checkin" element={<Checkin />} />
            </Routes>
        </BrowserRouter>
    );
}
