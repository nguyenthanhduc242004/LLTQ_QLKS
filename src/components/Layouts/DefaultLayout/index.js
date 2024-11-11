import classNames from 'classnames/bind';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <>
            <Sidebar />
            <div className={cx('header-and-content')}>
                <Header />
                <div className={cx('content')}>{children}</div>
            </div>
        </>
    );
}

export default DefaultLayout;
