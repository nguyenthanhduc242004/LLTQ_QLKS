import classNames from 'classnames/bind';
import { CustomerIcon, HomeIcon, PaymentIcon, RoomIcon, StaffsIcon } from '../../../components/Icons';
import Image from '../../../components/Image';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';
import '../../../styles/grid.scss';
import { sCurrentPage } from './sidebarStore';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('user')}>
                <Image
                    className={cx('user-avt')}
                    src="https://hotelair-react.pixelwibes.in/static/media/profile_av.387360c31abf06d6cc50.png"
                    alt="user-avt"
                />
                <div className={cx('user-description')}>
                    <h4 className={cx('user-name')}>Username</h4>
                    <p>Super admin</p>
                </div>
            </div>

            {/* Sidebar nav */}
            <div className="grid">
                <nav className={cx('nav') + ' row no-gutters'}>
                    <a href="/" className={cx('nav-item', 'focus') + ' col l-6 m-6 c-6'}>
                        Khách sạn
                    </a>
                    {/* <li className={cx('nav-item', 'focus') + ' col l-6 m-6 c-6'}>NV</li> */}
                    <a href="/" className={cx('nav-item') + ' col l-6 m-6 c-6'}>
                        Thống kê
                    </a>
                </nav>
            </div>

            {/* Sidebar Items */}
            <sCurrentPage.Wrap>
                {(value) => (
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
                        <Link to="/thanh-toan" className={cx('sidebar-item', value === '/thanh-toan' ? 'focus' : '')}>
                            <PaymentIcon className={cx('icon')} />
                            Thanh toán
                        </Link>
                    </>
                )}
            </sCurrentPage.Wrap>
        </aside>
    );
}

export default Sidebar;
