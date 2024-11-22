import classNames from 'classnames/bind';
import styles from './roomListItem.module.scss';

const cx = classNames.bind(styles);

function RoomListItem({ className }) {
    return (
        <div className={className + ' ' + cx('wrapper') + ' row'}>
            <p className="col c-1 m-1 l-1">P1.01</p>
            <p className="col c-2 m-2 l-2">Phòng Deluxe Twin</p>
            <p className="col c-3 m-3 l-3">1 giường sofa đơn, 1 giường king size</p>
            <p className="col c-2 m-2 l-2">60m2</p>
            <p className="col c-2 m-2 l-2">Chờ check-out</p>
            <p className="col c-2 m-2 l-2">12/12/2024</p>
        </div>
    );
}

export default RoomListItem;
