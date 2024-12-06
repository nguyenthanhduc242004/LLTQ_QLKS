import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { sIsAdmin } from '../../settings/globalStore';
import DefaultLayout from '../layouts/DefaultLayout';
import BedDetailList from '../pages/BedDetailList';
import GuestList from '../pages/GuestList';
import Home from '../pages/Home';
import Login from '../pages/Login/Login';
import PaymentList from '../pages/PaymentList/PaymentList';
import RoomList from '../pages/RoomList';
import RoomListManagement from '../pages/RoomListManagement';
import RoomTypeList from '../pages/RoomTypeList/RoomTypeList';
import StaffList from '../pages/StaffList';
import StaffTypeList from '../pages/StaffTypeList/StaffTypeList';
import UserProtect from './UserProtect';
import RevenueChart from '../pages/RevenueChart/RevenueChart';

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
                        <Route
                            path="/thong-ke"
                            element={
                                <DefaultLayout>
                                    <UserProtect>
                                        <RevenueChart />
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
