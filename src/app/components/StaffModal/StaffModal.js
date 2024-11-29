import classNames from 'classnames/bind';
import styles from './StaffModal.module.scss';

const cx = classNames.bind(styles);

function StaffModal({ className }) {
    return (
        <a href="#nhan-vien" className={cx('wrapper' + ' ' + className)}>
            STAFFMODAL
        </a>
    );
}

export default StaffModal;
