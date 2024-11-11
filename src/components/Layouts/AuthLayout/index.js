import classNames from 'classnames/bind';
import styles from './AuthLayout.module.scss';
import images from '../../../assets/imgs';

const cx = classNames.bind(styles);

function AuthLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo-section')}>
                <a href="/login">
                    <img src={images.logo} alt="logo" />
                    <span className={cx('brand-name')}>HotelAir</span>
                </a>
            </div>
            <div className={cx('content')}>{children}</div>
            <footer className={cx('footer')}>
                © 2024
                <a href="/">HotelAir</a>, All Rights Reserved.
            </footer>
        </div>
    );
}

export default AuthLayout;
