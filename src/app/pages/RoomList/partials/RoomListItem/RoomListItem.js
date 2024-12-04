import classNames from 'classnames/bind';
import styles from './roomListItem.module.scss';
import { TYPE_CHECKIN, TYPE_CHECKOUT, TYPE_ROOM_TYPE } from '../../../Home/partials/Room';

const cx = classNames.bind(styles);

function RoomListItem({ className, data, onClick }) {
    var stateText = 'Còn trống';
    var date;
    var type = TYPE_ROOM_TYPE;
    if (data) {
        if (data.state === 1) {
            stateText = 'Chờ check-in';
            type = TYPE_CHECKIN;
            if (data.checkinDate) {
                date = new Date(data.checkinDate.split('-')).toLocaleDateString();
            }
        } else if (data.state === 2) {
            stateText = 'Chờ check-out';
            type = TYPE_CHECKOUT;
            if (data.checkoutDate) {
                date = new Date(data.checkoutDate.split('-')).toLocaleDateString();
            }
        }
    }

    return (
        <a href={'#' + type} className={className + ' ' + cx('wrapper') + ' row'} onClick={onClick}>
            {data && (
                <>
                    <p className="col c-1 m-1 l-1">{data.roomNumber}</p>
                    <p className="col c-2 m-2 l-2">{data.roomTypeText}</p>
                    <p className="col c-3 m-3 l-3">{data.bedDetailText}</p>
                    <p className="col c-2 m-2 l-2">{data.size}m2</p>
                    <p className="col c-2 m-2 l-2">{stateText}</p>
                    <p className="col c-2 m-2 l-2">{date}</p>
                </>
            )}
        </a>
    );
}

export default RoomListItem;
