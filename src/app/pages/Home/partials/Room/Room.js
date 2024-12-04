import classNames from 'classnames/bind';
import {
    BedIcon,
    BookIcon,
    CheckinIcon,
    ClockIcon,
    HomePaymentIcon,
    PersonIcon,
    RoomSizeIcon,
} from '../../../../components/Icons';
import styles from './room.module.scss';
import { TYPE_ROOM_TYPE, TYPE_CHECKIN, TYPE_CHECKOUT } from './roomStore';
import Button from '../../../../components/Button';

const cx = classNames.bind(styles);

const reformatDate = (date) => {
    const dateObject = new Date(date.split('-'));
    return dateObject.toLocaleDateString();
};

function Room({ classNames, type, data, onClick }) {
    return (
        <a href={'#' + type} className={classNames + ' ' + cx('wrapper')} onClick={onClick}>
            <div className={cx('room-image')} />
            <div className={cx('body')}>
                {type === TYPE_ROOM_TYPE && (
                    <>
                        <p className={cx('room-name')}>{data.roomTypeText}</p>
                        <div className={cx('body-container')}>
                            <span className={cx('room-size')}>
                                <RoomSizeIcon className={cx('icon')} />
                                {data.size}m²
                            </span>
                            <span className={cx('bed-detail')}>
                                <BedIcon className={cx('icon')} />
                                {data.bedDetailText}
                            </span>
                        </div>
                        <div className={cx('btn-wrapper')}>
                            <div className={cx('price')}>
                                Giá phòng:
                                <span className={cx('price-number')}>{data.price.toLocaleString('de-DE')}đ/ngày</span>
                            </div>
                            <Button label="Đặt phòng" type={TYPE_ROOM_TYPE} primary icon={<BookIcon />} />
                        </div>
                    </>
                )}
                {(type === TYPE_CHECKIN || type === TYPE_CHECKOUT) && (
                    <>
                        <div className={cx('body-container')}>
                            <p className={cx('room-name')}>{data.roomTypeText}</p>
                            <p className={cx('room-number')}>{data.roomNumber}</p>
                        </div>
                        {type === TYPE_CHECKIN && (
                            <>
                                <div className={cx('body-container')}>
                                    <span className={cx('customer-name')}>
                                        <PersonIcon className={cx('icon')} />
                                        {data.guestName}
                                    </span>
                                    <span className={cx('bed-detail')}>
                                        <ClockIcon className={cx('icon')} />
                                        {reformatDate(data.checkinDate)}
                                    </span>
                                </div>
                                <div className={cx('btn-wrapper')}>
                                    <Button label="Hủy đặt phòng" />
                                    <Button label="Check-in" type={TYPE_CHECKIN} primary icon={<CheckinIcon />} />
                                </div>
                            </>
                        )}
                        {type === TYPE_CHECKOUT && (
                            <>
                                <div className={cx('body-container')}>
                                    <span className={cx('customer-name')}>
                                        <PersonIcon className={cx('icon')} />
                                        {data.guestName}
                                    </span>
                                    <span className={cx('bed-detail')}>
                                        <ClockIcon className={cx('icon')} />
                                        {reformatDate(data.checkoutDate)}
                                    </span>
                                </div>
                                <div className={cx('btn-wrapper')}>
                                    <Button label="Gia hạn" />
                                    <Button
                                        label="Thanh toán"
                                        type={TYPE_CHECKOUT}
                                        primary
                                        icon={<HomePaymentIcon />}
                                    />
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </a>
    );
}

export default Room;
