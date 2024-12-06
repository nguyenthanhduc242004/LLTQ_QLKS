import classNames from 'classnames/bind';
import styles from './heading.module.scss';
import { ArrowRightIcon, ChevronRightIcon } from '../../../../components/Icons';

const cx = classNames.bind(styles);

function Heading({ label, className, state, onClick }) {
    return (
        <div className={className + ' ' + cx('wrapper')} state={state}>
            <div className={cx('container')}>
                <h2 className={cx('label')}>{label}</h2>
                <span className={cx('icon-wrapper')}>
                    <ArrowRightIcon className={cx('icon')} />
                </span>
            </div>

            <button className={cx('btn')} onClick={onClick}>
                Xem tất cả
                <ChevronRightIcon className={cx('btn-icon')} />
            </button>
        </div>
    );
}

export default Heading;
