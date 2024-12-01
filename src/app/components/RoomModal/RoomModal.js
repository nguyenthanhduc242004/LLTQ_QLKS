import classNames from 'classnames/bind';
import { signify } from 'react-signify';
import { TYPE_CHECKIN, TYPE_CHECKOUT, TYPE_ROOM_TYPE } from '../../pages/Home/partials/Room';
import '../../styles/grid.scss';
import Button from '../Button';
import DetailInformation from '../DetailInformation';
import {
    BedIcon,
    BookIcon,
    CancelIcon,
    CheckIcon,
    CheckinIcon,
    EditIcon,
    HomePaymentIcon,
    RoomSizeIcon,
} from '../Icons';
import styles from './roomModal.module.scss';
import { useEffect, useRef, useState } from 'react';
import { get } from '../../modules/lib/httpHandle';

const cx = classNames.bind(styles);

// const sDate = signify({
//     checkinDate: '',
//     checkoutDate: '',
// });
// const sIsEditting = signify(false);

let mainHeading;
// let stateText;
const dayTimeInMills = 24 * 60 * 60 * 1000;

const handleGuestInformationEditBtnClick = (e) => {};

var rooms = [];
var bookings = [];

function RoomModal({ className, type, data }) {
    const checkinDateInput = useRef();
    const checkoutDateInput = useRef();

    const [date, setDate] = useState({
        checkinDate: '',
        checkoutDate: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState([]);

    const getFilteredRooms = () => {
        return rooms.filter((room) => {
            var condition = true;
            bookings.forEach((booking) => {
                console.log('booking.roomId: ' + booking.roomId, 'room.id: ' + room.id);
                if (booking.roomId === room.id) {
                    if (new Date(booking.checkinDate.split('-')) < new Date(date.checkoutDate.split('-')))
                        condition = false;
                    if (new Date(booking.checkoutDate.split('-')) < new Date(date.checkinDate.split('-')))
                        condition = false;
                }
            });
            return condition;
        });
    };

    useEffect(() => {
        console.log(date.checkinDate, date.checkoutDate, !!date.checkinDate && !!date.checkoutDate);
        if (!!date.checkinDate && !!date.checkoutDate) {
            setFilteredRooms(getFilteredRooms());
        }
    }, [date]);

    useEffect(() => {
        window.addEventListener('click', () => {
            setIsEditing(false);
            setDate({
                checkinDate: '',
                checkoutDate: '',
            });
        });

        get(
            'rooms/',
            (data) => {
                rooms = data;
                setFilteredRooms(data);
            },
            () => {
                alert('Rooms not found!');
            },
        );

        get(
            'bookings/',
            (data) => {
                bookings = data;
            },
            () => {
                alert('Rooms not found!');
            },
        );
    }, []);

    if (type === TYPE_ROOM_TYPE) {
        mainHeading = 'ĐẶT PHÒNG';
        if (checkinDateInput.current) checkinDateInput.current.value = '';
        if (checkoutDateInput.current) checkoutDateInput.current.value = '';
    } else if (type === TYPE_CHECKIN) {
        mainHeading = 'CHECK-IN';
    } else if (type === TYPE_CHECKOUT) {
        mainHeading = 'CHECK-OUT';
    } else if (type === 'booking-detail') {
        mainHeading = 'CHI TIẾT ĐẶT PHÒNG';
    }

    // if (data.state === 0) stateText = 'Còn trống';
    // else if (data.state === 1) stateText = 'Chờ check-in';
    // else if (data.state === 2) stateText = 'Chờ check-out';

    const handleDateInput = (e) => {
        setDate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const tomorrow = new Date(new Date().getTime() + dayTimeInMills);

    const checkinNextDay = new Date(new Date(date.checkinDate).getTime() + dayTimeInMills);
    const checkoutMinDate = checkinNextDay > tomorrow ? checkinNextDay : tomorrow;
    const checkoutMinDateString = checkoutMinDate.toISOString().split('T')[0];

    var checkinMaxDateString = '';
    if (date.checkoutDate) {
        const checkoutPreviousDay = new Date(new Date(date.checkoutDate).getTime() - dayTimeInMills);
        const checkoutPreviousDayString = checkoutPreviousDay.toISOString().split('T')[0];
        checkinMaxDateString = checkoutPreviousDayString;
    }

    // const [isEditing, setIsEditing] = useState(false);

    const handleReservationInforamtionEditBtnClick = (e) => {
        if (isEditing) {
            setDate({
                checkinDate: '',
                checkoutDate: '',
            });
        } else {
            setDate({
                checkinDate: checkinDateInput.current.value,
                checkoutDate: checkoutDateInput.current.value,
            });
        }
        setIsEditing((prev) => !prev);
    };

    return (
        <div
            className={cx('wrapper') + ' grid ' + className}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <h2 className={cx('main-heading')}>{mainHeading}</h2>

            {/* ROOM TYPE: BEGIN */}
            <div className={cx('room-wrapper')}>
                <div className={cx('room-image')} />
                <div className={cx('room-body')}>
                    <div>
                        <p className={cx('room-name')}>{data.roomTypeText}</p>
                        <div className={cx('room-body-container')}>
                            <span className={cx('room-size')}>
                                <RoomSizeIcon className={cx('icon')} />
                                {data.size}m²
                            </span>
                            <span className={cx('bed-detail')}>
                                <BedIcon className={cx('icon')} />
                                {data.bedDetailText}
                            </span>
                        </div>
                    </div>
                    <span className={cx('room-price')}>Giá phòng: {data.price.toLocaleString('de-DE')}đ</span>
                </div>
            </div>
            {/* ROOM TYPE: END */}

            {/* RESERVATION INFORMATION: BEGIN */}
            <div className={cx('heading-wrapper')}>
                <h3 className={cx('heading')}>Thông tin đặt phòng</h3>
                {type !== TYPE_ROOM_TYPE &&
                    type !== 'booking-detail' &&
                    (isEditing === true ? (
                        <button className={cx('cancel-btn')} onClick={handleReservationInforamtionEditBtnClick}>
                            Hủy
                            <CancelIcon className={cx('cancel-icon')} />
                        </button>
                    ) : (
                        <button className={cx('edit-btn')} onClick={handleReservationInforamtionEditBtnClick}>
                            Sửa
                            <EditIcon className={cx('edit-icon')} />
                        </button>
                    ))}
            </div>
            <div className={cx('reservation-information')}>
                <div className="row">
                    <div className="col c-6 m-6 l-6">
                        <span>Ngày nhận phòng: </span>
                        <input
                            ref={checkinDateInput}
                            {...{
                                disabled: type !== TYPE_ROOM_TYPE && (!isEditing || type !== TYPE_CHECKIN),
                                value: !!date.checkinDate && !isEditing ? date.checkinDate : data.checkinDate,
                            }}
                            type="date"
                            min={todayString}
                            max={checkinMaxDateString}
                            name="checkinDate"
                            onInput={handleDateInput}
                        />
                    </div>
                    <div className="col c-6 m-6 l-6">
                        <span>Ngày trả phòng: </span>
                        <input
                            ref={checkoutDateInput}
                            {...{
                                disabled: !isEditing && type !== TYPE_ROOM_TYPE,
                                value: !!date.checkoutDate && !isEditing ? date.checkoutDate : data.checkoutDate,
                            }}
                            type="date"
                            min={checkoutMinDateString}
                            name="checkoutDate"
                            onInput={handleDateInput}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col" style={{ flex: '1' }}>
                        {data.roomNumber !== undefined &&
                            type !== TYPE_CHECKOUT &&
                            (!!date.checkinDate && !!date.checkoutDate ? (
                                <select name="room" required defaultValue="0">
                                    <option value="0" disabled>
                                        Chọn phòng
                                    </option>
                                    {filteredRooms.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            Phòng {item.roomNumber}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <select name="room" required defaultValue={data.roomNumber} disabled>
                                    <option value={data.roomNumber}>Phòng {data.roomNumber}</option>
                                </select>
                            ))}
                        {data.roomNumber === undefined &&
                            (!!date.checkinDate && !!date.checkoutDate ? (
                                <select name="room" required defaultValue="0">
                                    <option value="0" disabled>
                                        Chọn phòng
                                    </option>
                                    {filteredRooms.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            Phòng {item.roomNumber}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <select name="room" required disabled defaultValue="-1">
                                    <option value="-1">Vui lòng nhập ngày nhận, trả phòng</option>
                                </select>
                            ))}
                    </div>
                </div>
            </div>
            {/* RESERVATION INFORMATION: END */}

            {/* GUEST INFORMATION: BEGIN */}
            {type === TYPE_ROOM_TYPE && (
                <>
                    <h3 className={cx('heading')}>Thông tin người đặt</h3>
                    <DetailInformation className={cx('guest-information')} />
                </>
            )}

            {type !== TYPE_ROOM_TYPE && (
                <>
                    <div className={cx('heading-wrapper')}>
                        <h3 className={cx('heading')}>Thông tin người đặt</h3>
                        {type !== 'booking-detail' && (
                            <button
                                className={cx('edit-btn')}
                                name="guest-information"
                                onClick={handleGuestInformationEditBtnClick}
                            >
                                Sửa
                                <EditIcon className={cx('edit-icon')} width="14px" height="14px" />
                            </button>
                        )}
                    </div>
                    <DetailInformation className={cx('guest-information')} data={data} />
                </>
            )}
            {/* GUEST INFORMATION: END */}

            {/* BUTTONS: BEGIN */}
            <div className={cx('btn-wrapper')}>
                {type === TYPE_ROOM_TYPE && (
                    <Button label="Đặt phòng" type={TYPE_ROOM_TYPE} primary icon={<BookIcon />} className={cx('btn')} />
                )}
                {isEditing && (
                    <>
                        <Button className={cx('btn')} label="Hủy" />
                        <Button className={cx('btn')} label="Xác nhận" type="confirm" primary icon={<CheckIcon />} />
                    </>
                )}
                {!isEditing && type === TYPE_CHECKIN && (
                    <>
                        <Button className={cx('btn')} label="Hủy đặt phòng" />
                        <Button
                            className={cx('btn')}
                            label="Check-in"
                            type={TYPE_CHECKIN}
                            primary
                            icon={<CheckinIcon />}
                        />
                    </>
                )}
                {!isEditing && type === TYPE_CHECKOUT && (
                    <>
                        <Button className={cx('btn')} label="Gia hạn" type={TYPE_CHECKIN} />
                        <Button
                            className={cx('btn')}
                            label="Thanh toán"
                            type={TYPE_CHECKOUT}
                            primary
                            icon={<HomePaymentIcon />}
                        />
                    </>
                )}
            </div>
            {/* BUTTONS: BEGIN */}
        </div>
    );
}

export default RoomModal;
