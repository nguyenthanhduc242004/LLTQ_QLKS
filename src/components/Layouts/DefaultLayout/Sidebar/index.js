import { CustomerIcon, HomeIcon, PaymentIcon, RoomIcon, StaffsIcon } from '../../../Icons';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('user')}>
                <img
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
                <nav className={cx('nav') + ' row'}>
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
            <a href="/" className={cx('sidebar-item', 'focus')}>
                <HomeIcon className={cx('left-icon')} />
                Danh sách phòng
            </a>
            <a href="/" className={cx('sidebar-item')}>
                <CustomerIcon className={cx('left-icon')} />
                Danh sách khách hàng
            </a>
            <a href="/" className={cx('sidebar-item')}>
                <StaffsIcon className={cx('left-icon')} />
                Danh sách nhân viên
            </a>
            <a href="/" className={cx('sidebar-item')}>
                <RoomIcon className={cx('left-icon')} />
                Đặt phòng
            </a>
            <a href="/" className={cx('sidebar-item')}>
                <PaymentIcon className={cx('left-icon')} />
                Thanh toán
            </a>
        </aside>
    );
}

export default Sidebar;
