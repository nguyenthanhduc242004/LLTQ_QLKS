import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { signify } from 'react-signify';
import { sIsLoggedIn } from '../../../../settings/globalStore';
import images from '../../../assets/imgs';
import ChangePasswordModal from '../../../components/ChangePasswordModal';
import {
    CircleHalfIcon,
    HideSideBarIcon,
    MoonStarsIcon,
    NotificationIcon,
    SettingIcon,
    SunIcon,
} from '../../../components/Icons';
import Image from '../../../components/Image';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const sShowModal = signify({
    isShowing: false,
    data: undefined,
});

function Header() {
    const nav = useNavigate();

    return (
        <div className={cx('wrapper')}>
            <button className={cx('hide-side-bar-btn')}>
                <HideSideBarIcon />
            </button>

            {/* Logo and brand name*/}
            <div className={cx('logo-section')}>
                <a href="/">
                    <img src={images.logo} alt="logo" />
                    <span className={cx('brand-name')}>HotelAir</span>
                </a>
            </div>

            <div className={cx('action-wrapper')}>
                <button className={cx('action')}>
                    <NotificationIcon />
                </button>

                <button className={cx('action', 'action__change-background')}>
                    <SunIcon />
                    <ul className={cx('dropdown-menu')}>
                        <li className={cx('dropdown-item')}>
                            <SunIcon />
                            <span>Light</span>
                        </li>
                        <li className={cx('dropdown-item')}>
                            <MoonStarsIcon />
                            <span>Dark</span>
                        </li>
                        <li className={cx('dropdown-item')}>
                            <CircleHalfIcon />
                            <span>Auto</span>
                        </li>
                    </ul>
                </button>

                <button className={cx('action')}>
                    <SettingIcon />
                </button>
            </div>

            <span className={cx('divider')}></span>

            <div className={cx('user')}>
                <Image
                    className={cx('user-avt')}
                    src="https://hotelair-react.pixelwibes.in/static/media/profile_av.387360c31abf06d6cc50.png"
                    alt="user-avt"
                    fallback="https://fullstack.edu.vn/assets/f8-icon-lV2rGpF0.png"
                />
                <p className={cx('user-name')}>Michelle</p>
                <ul className={cx('menu')}>
                    <li className={cx('menu-item')}>Thông tin cá nhân</li>
                    <a
                        href="#doi-mat-khau"
                        className={cx('menu-item')}
                        onClick={() => {
                            sShowModal.set({
                                isShowing: true,
                                data: JSON.parse(localStorage.getItem('userToken')),
                            });
                        }}
                    >
                        Đổi mật khẩu
                    </a>
                    <li
                        className={cx('menu-item')}
                        onClick={() => {
                            sIsLoggedIn.set(false);
                            localStorage.removeItem('userDateToken');
                            nav('/login');
                        }}
                    >
                        Đăng xuất
                    </li>
                </ul>
            </div>
            <sShowModal.HardWrap>
                {(value) => {
                    if (value.isShowing) {
                        return (
                            <div id="doi-mat-khau" className="modal">
                                <a href="#" className="modal-overlay">
                                    {' '}
                                </a>
                                <ChangePasswordModal className="modal-body" data={value.data} />
                            </div>
                        );
                    }
                }}
            </sShowModal.HardWrap>
        </div>
    );
}

export default Header;
