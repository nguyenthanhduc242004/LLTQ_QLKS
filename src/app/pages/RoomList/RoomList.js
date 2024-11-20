import classNames from 'classnames/bind';
import styles from './roomList.module.scss';
import RoomListItem from './partials/RoomListItem/RoomListItem';

const cx = classNames.bind(styles);

function RoomList() {
    return (
        <div className={cx('wrapper')}>
            <div className="grid">
                <div className={'row ' + cx('header')}>
                    <p className="col c-1 m-1 l-1">Số phòng</p>
                    <p className="col c-2 m-2 l-2">Hạng phòng</p>
                    <p className="col c-2 m-2 l-2">Chi tiết giường</p>
                    <p className="col c-1 m-1 l-1">Diện tích</p>
                    <p className="col c-2 m-2 l-2">Hướng nhìn</p>
                    <p className="col c-2 m-2 l-2">Tình trạng</p>
                    <p className="col c-2 m-2 l-2">Giờ checkout dự tính</p>
                </div>
                <RoomListItem />
                <RoomListItem />
                <RoomListItem />
                <RoomListItem />
                <RoomListItem />
            </div>
        </div>
    );
}

export default RoomList;
