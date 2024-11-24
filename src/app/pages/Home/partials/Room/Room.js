import classNames from 'classnames/bind';
import { BedIcon, ClockIcon, PersonIcon, RoomSizeIcon } from '../../../../components/Icons';
import styles from './room.module.scss';
import { TYPE_CHECKIN, TYPE_CHECKOUT, TYPE_ROOM_TYPE } from './roomStore';

const cx = classNames.bind(styles);

function RoomType({ classNames, type }) {
    return (
        <a href={'#' + type} className={classNames + ' ' + cx('wrapper')}>
            <div className={cx('room-image')} />
            <div className={cx('body')}>
                {type === TYPE_ROOM_TYPE && (
                    <>
                        <p className={cx('room-name')}>Phòng Executive Suite</p>
                        <div className={cx('body-container')}>
                            <span className={cx('room-size')}>
                                <RoomSizeIcon className={cx('icon')} />
                                60m²
                            </span>
                            <span className={cx('bed-detail')}>
                                <BedIcon className={cx('icon')} />1 giường sofa đơn, 1 giường king size
                            </span>
                        </div>
                        <div className={cx('btn-wrapper')}>
                            <div className={cx('price')}>
                                Giá phòng:
                                <span className={cx('price-number')}>2.400.000đ/ngày</span>
                            </div>
                            <button className={cx('btn-check-in')}>Đặt phòng</button>
                        </div>
                    </>
                )}
                {(type === TYPE_CHECKIN || type === TYPE_CHECKOUT) && (
                    <>
                        <div className={cx('body-container')}>
                            <p className={cx('room-name')}>Phòng Executive Suite</p>
                            <p className={cx('room-number')}>P4.12</p>
                        </div>
                        <div className={cx('body-container')}>
                            <span className={cx('customer-name')}>
                                <PersonIcon className={cx('icon')} />
                                Nguyễn Thành Đức
                            </span>
                            <span className={cx('bed-detail')}>
                                <ClockIcon className={cx('icon')} />
                                14:00 18/11/2024
                            </span>
                        </div>
                        {type === TYPE_CHECKOUT && (
                            <div className={cx('btn-wrapper')}>
                                <button className={cx('btn-left')}>Gia hạn</button>
                                <button
                                    className={cx('btn-right')}
                                    style={{
                                        backgroundColor: '#1ec700',
                                    }}
                                >
                                    Thanh toán
                                </button>
                            </div>
                        )}
                        {type === TYPE_CHECKIN && (
                            <div className={cx('btn-wrapper')}>
                                <button className={cx('btn-left')}>Hủy đặt phòng</button>
                                <button
                                    className={cx('btn-right')}
                                    style={{
                                        backgroundColor: '#ff5900',
                                    }}
                                >
                                    Check-in
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </a>
    );
}

export default RoomType;
