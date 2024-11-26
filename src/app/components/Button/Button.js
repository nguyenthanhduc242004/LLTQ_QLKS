import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ className, label, type, icon, primary }) {
    return (
        <button className={cx('wrapper', type, primary ? 'primary' : 'normal') + ' ' + className}>
            {icon && <span className={cx('icon')}>{icon}</span>}
            {label}
        </button>
    );
}

export default Button;
