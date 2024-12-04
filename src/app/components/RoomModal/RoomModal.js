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

let mainHeading;
const dayTimeInMills = 24 * 60 * 60 * 1000;

var rooms = [];
var bookings = [];

function RoomModal({ className, type, data }) {
    const checkinDateInput = useRef();
    const checkoutDateInput = useRef();

    const [submitData, setSubmitData] = useState({});

    const [date, setDate] = useState({
        checkinDate: undefined,
        checkoutDate: undefined,
    });
    const [isReservationInformationEditing, setIsReservationInformationEditing] = useState(false);
    const [isGuestInformationEditing, setIsGuestInformationEditing] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState([]);

    const getFilteredRooms = () => {
        return rooms.filter((room) => {
            var condition = true;
            bookings.forEach((booking) => {
                if (booking.roomId === Number(room.id)) {
                    if (
                        !(
                            new Date(booking.checkoutDate.split('-')) <= new Date(date.checkinDate.split('-')) ||
                            new Date(booking.checkinDate.split('-')) >= new Date(date.checkoutDate.split('-'))
                        )
                    )
                        condition = false;
                }
            });
            return condition;
        });
    };

    useEffect(() => {
        if (!!date.checkinDate && !!date.checkoutDate) {
            setFilteredRooms(getFilteredRooms());
        }
    }, [date]);

    const handleWindowClick = () => {
        setIsReservationInformationEditing(false);
        setIsGuestInformationEditing(false);
        setDate(() => {
            return {
                checkinDate: undefined,
                checkoutDate: undefined,
            };
        });
        setSubmitData({});
    };

    useEffect(() => {
        window.addEventListener('click', handleWindowClick);

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

        return () => {
            window.removeEventListener('click', handleWindowClick);
        };
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

    const handleReservationInforamtionEditBtnClick = () => {
        if (isReservationInformationEditing) {
            setDate({
                checkinDate: undefined,
                checkoutDate: undefined,
            });
        } else {
            setDate({
                checkinDate: data.checkinDate,
                checkoutDate: data.checkoutDate,
            });
        }
        setIsReservationInformationEditing((prev) => !prev);
    };

    const handleGuestInformationEditBtnClick = () => {
        setIsGuestInformationEditing((prev) => !prev);
    };

    // Calculate the type of RoomSelect
    var roomSelectType;
    if (
        type === TYPE_CHECKOUT ||
        (type === TYPE_CHECKIN && !isReservationInformationEditing) ||
        type === 'booking-detail'
    )
        roomSelectType = 0;
    else if (!!date.checkinDate && !!date.checkoutDate) roomSelectType = 1;
    else roomSelectType = 2;

    // SUBMITS:
    const handleChange = (e) => {
        setSubmitData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleBookingSubmit = () => {
        console.log(submitData);
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
                    (isReservationInformationEditing === true ? (
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
                        {type === TYPE_ROOM_TYPE ? (
                            <input
                                ref={checkinDateInput}
                                type="date"
                                min={todayString}
                                max={checkinMaxDateString}
                                name="checkinDate"
                                value={date.checkinDate ? date.checkinDate : undefined}
                                onInput={handleDateInput}
                                onChange={handleChange}
                            />
                        ) : (
                            <input
                                disabled={
                                    type === TYPE_CHECKOUT ||
                                    (type === TYPE_CHECKIN && !isReservationInformationEditing) ||
                                    type === 'booking-detail'
                                }
                                value={date.checkinDate !== undefined ? date.checkinDate : data.checkinDate}
                                type="date"
                                max={checkinMaxDateString}
                                name="checkinDate"
                                onInput={handleDateInput}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                    <div className="col c-6 m-6 l-6">
                        <span>Ngày trả phòng: </span>
                        {type === TYPE_ROOM_TYPE ? (
                            <input
                                ref={checkoutDateInput}
                                type="date"
                                min={checkoutMinDateString}
                                value={date.checkoutDate}
                                name="checkoutDate"
                                onInput={handleDateInput}
                                onChange={handleChange}
                            />
                        ) : (
                            <input
                                disabled={
                                    (type !== TYPE_ROOM_TYPE && !isReservationInformationEditing) ||
                                    type === 'booking-detail'
                                }
                                value={date.checkoutDate !== undefined ? date.checkoutDate : data.checkoutDate}
                                type="date"
                                min={checkoutMinDateString}
                                name="checkoutDate"
                                onInput={handleDateInput}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col" style={{ flex: '1' }}>
                        {roomSelectType === 0 && (
                            <select name="room" required defaultValue={data.roomNumber} disabled>
                                <option value={data.roomNumber}>Phòng {data.roomNumber}</option>
                            </select>
                        )}
                        {roomSelectType === 1 && (
                            <select name="roomId" required defaultValue="0" onChange={handleChange}>
                                <option value="0" disabled>
                                    Chọn phòng
                                </option>
                                {filteredRooms.map((item, index) => (
                                    <option key={index} value={item.id}>
                                        Phòng {item.roomNumber}
                                    </option>
                                ))}
                            </select>
                        )}
                        {roomSelectType === 2 && (
                            <select name="room" required disabled defaultValue="-1">
                                <option value="-1">Vui lòng nhập ngày nhận, trả phòng</option>
                            </select>
                        )}
                    </div>
                </div>
            </div>
            {/* RESERVATION INFORMATION: END */}

            {/* GUEST INFORMATION: BEGIN */}
            {type === TYPE_ROOM_TYPE && (
                <>
                    <h3 className={cx('heading')}>Thông tin người đặt</h3>
                    <DetailInformation className={cx('guest-information')} setSubmitData={setSubmitData} />
                </>
            )}

            {type !== TYPE_ROOM_TYPE && (
                <>
                    <div className={cx('heading-wrapper')}>
                        <h3 className={cx('heading')}>Thông tin người đặt</h3>
                        {/* {type !== 'booking-detail' && (
                            <button
                                className={cx('edit-btn')}
                                name="guest-information"
                                onClick={handleGuestInformationEditBtnClick}
                            >
                                Sửa
                                <EditIcon className={cx('edit-icon')} width="14px" height="14px" />
                            </button>
                        )} */}
                        {isGuestInformationEditing === true ? (
                            <button className={cx('cancel-btn')} onClick={handleGuestInformationEditBtnClick}>
                                Hủy
                                <CancelIcon className={cx('cancel-icon')} />
                            </button>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>
                    <DetailInformation
                        className={cx('guest-information')}
                        data={data}
                        isEditing={isGuestInformationEditing}
                        setSubmitData={setSubmitData}
                    />
                </>
            )}
            {/* GUEST INFORMATION: END */}

            {/* BUTTONS: BEGIN */}
            <div className={cx('btn-wrapper')}>
                {type === TYPE_ROOM_TYPE && (
                    <Button
                        onClick={handleBookingSubmit}
                        label="Đặt phòng"
                        type={TYPE_ROOM_TYPE}
                        primary
                        icon={<BookIcon />}
                        className={cx('btn')}
                        disabled={
                            submitData.checkinDate &&
                            submitData.checkoutDate &&
                            submitData.roomId &&
                            submitData.citizenId &&
                            submitData.guestName &&
                            submitData.phone
                                ? false
                                : true
                        }
                        // {...{
                        //     disabled:
                        // sData.value.checkinDate &&
                        // sData.value.checkoutDate &&
                        // sData.value.roomId &&
                        // sData.value.citizenId &&
                        // sData.value.guestName &&
                        // sData.value.phone,
                        // }}
                    />
                )}
                {isReservationInformationEditing && (
                    <>
                        <Button className={cx('btn')} label="Hủy" />
                        <Button className={cx('btn')} label="Xác nhận" type="confirm" primary icon={<CheckIcon />} />
                    </>
                )}
                {!isReservationInformationEditing && type === TYPE_CHECKIN && (
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
                {!isReservationInformationEditing && type === TYPE_CHECKOUT && (
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
