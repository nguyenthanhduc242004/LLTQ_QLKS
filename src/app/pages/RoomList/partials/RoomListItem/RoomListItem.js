import classNames from 'classnames/bind';
import styles from './roomListItem.module.scss';
import { BedIcon, RoomSizeIcon } from '../../../../components/Icons';

const cx = classNames.bind(styles);

function RoomListItem({ className }) {
    return (
        <div className={className + ' ' + cx('wrapper') + ' row'}>
            <div className={cx('room-image') + ' col c-3 m-3 l-3'} />
            <div className={cx('body') + ' col c-9 m-9 l-9'}>
                <div className={cx('room-identifier-wrapper')}>
                    <p className={cx('room-type')}>Phòng Deluxe Twin</p>
                    <p className={cx('room-id')}>P1.01</p>
                </div>
                <div className={cx('room-information-wrapper')}>
                    <p className={cx('room-size')}>
                        <RoomSizeIcon />
                        60m2
                    </p>
                    <p className={cx('bed-detail')}>
                        <BedIcon />1 giường sofa đơn, 1 giường king size
                    </p>
                </div>
                <div className={cx('body-footer')}></div>
            </div>
        </div>
    );
}

export default RoomListItem;
