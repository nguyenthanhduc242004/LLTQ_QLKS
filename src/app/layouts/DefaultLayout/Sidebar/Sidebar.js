import classNames from 'classnames/bind';
// import { signify } from 'react-signify';
import { CustomerIcon, HomeIcon, PaymentIcon, RoomIcon, StaffsIcon } from '../../../components/Icons';
import Image from '../../../components/Image';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';
import '../../../styles/grid.scss';

const cx = classNames.bind(styles);

// const sFocusingTab = signify(0);

const handleSidebarItemClick = (e) => {
    const focusedSidebarItem = document.querySelector(`.${cx('sidebar-item')}.${cx('focus')}`);
    focusedSidebarItem.classList.remove(cx('focus'));
    e.target.classList.add(cx('focus'));
};

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
            <Link to="/" className={cx('sidebar-item', 'focus')} onClick={handleSidebarItemClick}>
                <HomeIcon className={cx('left-icon')} />
                Trang chủ
            </Link>
            <Link to="/danh-sach-phong" className={cx('sidebar-item')} onClick={handleSidebarItemClick}>
                <RoomIcon className={cx('left-icon')} />
                Danh sách phòng
            </Link>
            <Link to="/danh-sach-khach-hang" className={cx('sidebar-item')} onClick={handleSidebarItemClick}>
                <CustomerIcon className={cx('left-icon')} />
                Danh sách khách hàng
            </Link>
            <Link to="/danh-sach-nhan-vien" className={cx('sidebar-item')} onClick={handleSidebarItemClick}>
                <StaffsIcon className={cx('left-icon')} />
                Danh sách nhân viên
            </Link>
            <Link to="/thanh-toan" className={cx('sidebar-item')} onClick={handleSidebarItemClick}>
                <PaymentIcon className={cx('left-icon')} />
                Thanh toán
            </Link>
        </aside>
    );
}

export default Sidebar;
