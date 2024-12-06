import classNames from 'classnames/bind';
import { CustomerIcon, HomeIcon, PaymentIcon, PremiumIcon, RoomIcon, StaffsIcon } from '../../../components/Icons';
import Image from '../../../components/Image';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';
import '../../../styles/grid.scss';
import { sCurrentPage } from './sidebarStore';
import { sIsAdmin } from '../../../../settings/globalStore';
import { useState } from 'react';

const cx = classNames.bind(styles);

var currentStaffData = {};

function Sidebar() {
    const [currentTab, setCurrentTab] = useState(true);
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('user')}>
                <Image
                    className={cx('user-avt')}
                    src="https://hotelair-react.pixelwibes.in/static/media/profile_av.387360c31abf06d6cc50.png"
                    alt="user-avt"
                />
                <div className={cx('user-description')}>
                    <h4 className={cx('user-name')}>{currentStaffData.staff?.name ?? 'username'}</h4>
                    <p>{!!currentStaffData.type ? 'Admin' : 'Lễ tân'}</p>
                </div>
            </div>

            {/* Sidebar nav */}
            <div className="grid">
                <sIsAdmin.Wrap>
                    {(value) => {
                        if (value) {
                            return (
                                <nav className={cx('nav') + ' row no-gutters'}>
                                    <button
                                        className={cx('nav-item', currentTab ? 'focus' : '') + ' col l-6 m-6 c-6'}
                                        onClick={() => {
                                            setCurrentTab(true);
                                        }}
                                    >
                                        Khách sạn
                                    </button>
                                    <button
                                        className={cx('nav-item', !currentTab ? 'focus' : '') + ' col l-6 m-6 c-6'}
                                        onClick={() => {
                                            setCurrentTab(false);
                                        }}
                                    >
                                        Quản lý
                                    </button>
                                </nav>
                            );
                        }
                    }}
                </sIsAdmin.Wrap>
            </div>

            {/* Sidebar Items */}
            <sCurrentPage.Wrap>
                {(value) => (
                    <>
                        {currentTab && (
                            <>
                                <Link to="/" className={cx('sidebar-item', value === '/' ? 'focus' : '')}>
                                    <HomeIcon className={cx('icon')} />
                                    Trang chủ
                                </Link>
                                <Link
                                    to="/danh-sach-phong"
                                    className={cx('sidebar-item', value === '/danh-sach-phong' ? 'focus' : '')}
                                >
                                    <RoomIcon className={cx('icon')} />
                                    Danh sách phòng
                                </Link>
                                <Link
                                    to="/danh-sach-khach-hang"
                                    className={cx('sidebar-item', value === '/danh-sach-khach-hang' ? 'focus' : '')}
                                >
                                    <CustomerIcon className={cx('icon')} />
                                    Danh sách khách hàng
                                </Link>
                                <Link
                                    to="/danh-sach-nhan-vien"
                                    className={cx('sidebar-item', value === '/danh-sach-nhan-vien' ? 'focus' : '')}
                                >
                                    <StaffsIcon className={cx('icon')} />
                                    Danh sách nhân viên
                                </Link>
                                <Link
                                    to="/lich-su-dat-phong"
                                    className={cx('sidebar-item', value === '/lich-su-dat-phong' ? 'focus' : '')}
                                >
                                    <PaymentIcon className={cx('icon')} />
                                    Lịch sử đặt phòng
                                </Link>
                            </>
                        )}
                        <sIsAdmin.Wrap>
                            {(isAdmin) => {
                                if (isAdmin && !currentTab) {
                                    return (
                                        <>
                                            <Link
                                                to="/chi-tiet-giuong"
                                                className={cx(
                                                    'sidebar-item',
                                                    value === '/chi-tiet-giuong' ? 'focus' : '',
                                                )}
                                            >
                                                <PremiumIcon className={cx('icon')} />
                                                Chi tiết giường
                                            </Link>
                                            <Link
                                                to="/hang-phong"
                                                className={cx('sidebar-item', value === '/hang-phong' ? 'focus' : '')}
                                            >
                                                <PremiumIcon className={cx('icon')} />
                                                Hạng phòng
                                            </Link>
                                            <Link
                                                to="/loai-nhan-vien"
                                                className={cx(
                                                    'sidebar-item',
                                                    value === '/loai-nhan-vien' ? 'focus' : '',
                                                )}
                                            >
                                                <PremiumIcon className={cx('icon')} />
                                                Loại nhân viên
                                            </Link>
                                            <Link
                                                to="/quan-ly-phong"
                                                className={cx(
                                                    'sidebar-item',
                                                    value === '/quan-ly-phong' ? 'focus' : '',
                                                )}
                                            >
                                                <PremiumIcon className={cx('icon')} />
                                                Quản lý phòng
                                            </Link>
                                            <Link
                                                to="/thong-ke"
                                                className={cx('sidebar-item', value === '/thong-ke' ? 'focus' : '')}
                                            >
                                                <PremiumIcon className={cx('icon')} />
                                                Thống kê
                                            </Link>
                                        </>
                                    );
                                }
                            }}
                        </sIsAdmin.Wrap>
                    </>
                )}
            </sCurrentPage.Wrap>
        </aside>
    );
}

export default Sidebar;
