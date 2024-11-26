import classNames from 'classnames/bind';
import styles from './roomListItem.module.scss';

const cx = classNames.bind(styles);

function RoomListItem({ className, data }) {
    var stateText;
    var date;
    if (data.state === 0) {
        stateText = 'Còn trống';
    } else if (data.state === 1) {
        stateText = 'Chờ check-in';
        date = new Date(data.checkinDate.split('-')).toLocaleDateString();
    } else if (data.state === 2) {
        stateText = 'Chờ check-out';
        date = new Date(data.checkoutDate.split('-')).toLocaleDateString();
    }
    return (
        <div className={className + ' ' + cx('wrapper') + ' row'}>
            <p className="col c-1 m-1 l-1">{data.roomId}</p>
            <p className="col c-2 m-2 l-2">{data.roomTypeText}</p>
            <p className="col c-3 m-3 l-3">{data.bedDetail}</p>
            <p className="col c-2 m-2 l-2">{data.size}m2</p>
            <p className="col c-2 m-2 l-2">{stateText}</p>
            <p className="col c-2 m-2 l-2">{date}</p>
        </div>
    );
}

export default RoomListItem;
