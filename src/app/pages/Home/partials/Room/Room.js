import classNames from 'classnames/bind';
import styles from './room.module.scss';
import { BedIcon, ClockIcon, PersonIcon, RoomSizeIcon } from '../../../../components/Icons';
import { CHECKOUT_ROOM, ROOM_TYPE } from './roomStore';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function RoomType({ classNames, type }) {
    const nav = useNavigate();

    const handleClick = () => {
        nav('checkin');
    };

    return (
        <div className={classNames + ' ' + cx('wrapper')} onClick={handleClick}>
            <div className={cx('room-image')} />
            <div className={cx('body')}>
                {type === ROOM_TYPE && (
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
                        <button className={cx('btn-check-in')}>Đặt phòng</button>
                        <div className="clear" />
                    </>
                )}
                {type === CHECKOUT_ROOM && (
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
                        <div className={cx('btn-wrapper')}>
                            <button className={cx('btn-extend')}>Gia hạn</button>
                            <button className={cx('btn-check-out')}>Thanh toán</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default RoomType;
