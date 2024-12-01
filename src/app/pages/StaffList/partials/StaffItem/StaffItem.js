import classNames from 'classnames/bind';
import styles from './staffItem.module.scss';

const cx = classNames.bind(styles);

function StaffItem({ className, data, onClick }) {
    var gender;
    if (data.gender === 'male') gender = 'Nam';
    else if (data.gender === 'female') gender = 'Nữ';
    return (
        <a href="#nhan-vien" className={className + ' ' + cx('wrapper') + ' row'} onClick={onClick}>
            <img
                className={cx('staff-avt') + ' col c-1 m-1 l-1'}
                src="https://i.pinimg.com/236x/cd/cb/0c/cdcb0cb30bc700c53f12eff840156b29.jpg"
                alt="staff-avt"
            />
            <p className="col c-2 m-2 l-2">{data.name}</p>
            <p className="col c-2 m-2 l-2">{gender}</p>
            <p className="col c-2 m-2 l-2">{data.phone}</p>
            <p className="col c-3 m-3 l-3">{data.email}</p>
            <p className="col c-2 m-2 l-2">{data.staffTypeText}</p>
        </a>
    );
}

export default StaffItem;
