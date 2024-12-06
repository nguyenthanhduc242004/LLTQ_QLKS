import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import GuestList from '../pages/GuestList';
import Home from '../pages/Home';
import Login from '../pages/Login/Login';
import PaymentList from '../pages/PaymentList/PaymentList';
import RoomList from '../pages/RoomList';
import StaffList from '../pages/StaffList';
import UserProtect from './UserProtect';
import BedDetailList from '../pages/BedDetailList';
import { sIsAdmin } from '../../settings/globalStore';
import RoomTypeList from '../pages/RoomTypeList/RoomTypeList';
import StaffTypeList from '../pages/StaffTypeList/StaffTypeList';
import RoomListManagement from '../pages/RoomListManagement';

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <DefaultLayout>
                            <UserProtect>
                                <Home />
                            </UserProtect>
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
                {sIsAdmin && (
                    <>
                        <Route
                            path="/chi-tiet-giuong"
                            element={
                                <DefaultLayout>
                                    <UserProtect>
                                        <BedDetailList />
                                    </UserProtect>
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path="/hang-phong"
                            element={
                                <DefaultLayout>
                                    <UserProtect>
                                        <RoomTypeList />
                                    </UserProtect>
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path="/loai-nhan-vien"
                            element={
                                <DefaultLayout>
                                    <UserProtect>
                                        <StaffTypeList />
                                    </UserProtect>
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path="/quan-ly-phong"
                            element={
                                <DefaultLayout>
                                    <UserProtect>
                                        <RoomListManagement />
                                    </UserProtect>
                                </DefaultLayout>
                            }
                        />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
}
