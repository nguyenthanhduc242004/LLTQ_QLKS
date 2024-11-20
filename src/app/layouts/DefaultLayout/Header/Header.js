import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import {
    CircleHalfIcon,
    HideSideBarIcon,
    MoonStarsIcon,
    NotificationIcon,
    SettingIcon,
    SunIcon,
} from '../../../components/Icons';
import Image from '../../../components/Image';
import images from '../../../assets/imgs';

const cx = classNames.bind(styles);

function Header() {
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
            </div>
        </div>
    );
}

export default Header;
