import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import GuestList from '../pages/GuestList';
import Home from '../pages/Home';
import RoomList from '../pages/RoomList';
import StaffList from '../pages/StaffList';
import PaymentList from '../pages/PaymentList/PaymentList';
import UserProtect from './UserProtect';

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <DefaultLayout>
                            {/* <UserProtect> */}
                            <Home />
                            {/* </UserProtect> */}
                        </DefaultLayout>
                    }
                />
                <Route
                    path="/danh-sach-phong"
                    element={
                        <DefaultLayout>
                            <UserProtect>
                                <RoomList />
                            </UserProtect>
                        </DefaultLayout>
                    }
                />
                <Route
                    path="/danh-sach-khach-hang"
                    element={
                        <DefaultLayout>
                            <UserProtect>
                                <GuestList />
                            </UserProtect>
                        </DefaultLayout>
                    }
                />
                <Route
                    path="/danh-sach-nhan-vien"
                    element={
                        <DefaultLayout>
                            <UserProtect>
                                <StaffList />
                            </UserProtect>
                        </DefaultLayout>
                    }
                />
                <Route
                    path="/lich-su-dat-phong"
                    element={
                        <DefaultLayout>
                            <UserProtect>
                                <PaymentList />
                            </UserProtect>
                        </DefaultLayout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
