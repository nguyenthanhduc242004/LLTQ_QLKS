import classNames from 'classnames/bind';
import styles from './guestItem.module.scss';

const cx = classNames.bind(styles);

function GuestItem({ className, onClick, data }) {
    var gender;
    if (data.guestGender === 'male') gender = 'Nam';
    else if (data.guestGender === 'female') gender = 'Nữ';
    const dob = new Date(data.guestDob.split('-')).toLocaleDateString();

    return (
        <a href={'#khach-hang'} className={className + ' ' + cx('wrapper') + ' row'} onClick={onClick}>
            <p className="col c-2 m-2 l-2">{data.guestId}</p>
            <p className="col c-3 m-3 l-3">{data.guestName}</p>
            <p className="col c-1 m-1 l-1">{gender}</p>
            <p className="col c-1 m-1 l-1">{dob}</p>
            <p className="col c-3 m-3 l-3">{data.guestEmail}</p>
            <p className="col c-2 m-2 l-2">{data.guestPhone}</p>
        </a>
    );
}

export default GuestItem;
