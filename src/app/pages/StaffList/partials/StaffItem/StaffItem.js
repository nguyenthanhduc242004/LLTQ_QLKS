import classNames from 'classnames/bind';
import styles from './staffItem.module.scss';

const cx = classNames.bind(styles);

function StaffItem({ className }) {
    return (
        <div className={className + ' ' + cx('wrapper') + ' row'}>
            <img
                className={cx('staff-avt') + ' col c-1 m-1 l-1'}
                src="https://i.pinimg.com/236x/cd/cb/0c/cdcb0cb30bc700c53f12eff840156b29.jpg"
                alt="staff-avt"
            />
            <p className="col c-2 m-2 l-2">Nguyễn Thành Đức</p>
            <p className="col c-2 m-2 l-2">Nam</p>
            <p className="col c-2 m-2 l-2">0345967735</p>
            <p className="col c-3 m-3 l-3">nguyenthanhduc242004@gmail.com</p>
            <p className="col c-2 m-2 l-2">Nhân viên dọn dẹp</p>
        </div>
    );
}

export default StaffItem;
