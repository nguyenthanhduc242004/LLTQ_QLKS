import classNames from 'classnames/bind';
import styles from './guestItem.module.scss';

const cx = classNames.bind(styles);

function GuestItem({ className, onClick, data }) {
    var gender;
    if (data.gender === 'male') gender = 'Nam';
    else if (data.gender === 'female') gender = 'Nữ';
    const dob = new Date(data.dob.split('-')).toLocaleDateString();

    return (
        <a href={'#khach-hang'} className={className + ' ' + cx('wrapper') + ' row'} onClick={onClick}>
            <p className="col c-2 m-2 l-2">{data.citizenId}</p>
            <p className="col c-3 m-3 l-3">{data.name}</p>
            <p className="col c-1 m-1 l-1">{gender}</p>
            <p className="col c-1 m-1 l-1">{dob}</p>
            <p className="col c-3 m-3 l-3">{data.email}</p>
            <p className="col c-2 m-2 l-2">{data.phone}</p>
        </a>
    );
}

export default GuestItem;
