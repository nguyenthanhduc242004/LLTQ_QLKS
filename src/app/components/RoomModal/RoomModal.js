import classNames from 'classnames/bind';
import { signify } from 'react-signify';
import { TYPE_CHECKIN, TYPE_CHECKOUT, TYPE_ROOM_TYPE } from '../../pages/Home/partials/Room';
import '../../styles/grid.scss';
import Button from '../Button';
import GuestInformation from '../GuestInformation/GuestInformation';
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
import { useEffect } from 'react';

const cx = classNames.bind(styles);

const sDate = signify({
    checkinDate: '',
    checkoutDate: '',
});

let mainHeading;
// let stateText;
const dayTimeInMills = 24 * 60 * 60 * 1000;

const handleGuestInformationEditBtnClick = (e) => {};

const sIsEditting = signify(false);

function RoomModal({ className, type, data }) {
    useEffect(() => {
        window.addEventListener('click', () => {
            console.log('window sIsEditing clicked!');
            if (sIsEditting.value) {
                sIsEditting.set(!sIsEditting.value);
            }
        });
    }, []);

    if (type === TYPE_ROOM_TYPE) {
        mainHeading = 'ĐẶT PHÒNG';
    } else if (type === TYPE_CHECKIN) {
        mainHeading = 'CHECK-IN';
    } else if (type === TYPE_CHECKOUT) {
        mainHeading = 'CHECK-OUT';
    }

    // if (data.state === 0) stateText = 'Còn trống';
    // else if (data.state === 1) stateText = 'Chờ check-in';
    // else if (data.state === 2) stateText = 'Chờ check-out';

    const handleDateInput = (e) => {
        sDate.set({ ...sDate.value, [e.target.name]: e.target.value });
        if (!!sDate.value.checkinDate && !!sDate.value.checkoutDate) {
            alert();
        }
    };

    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const tomorrow = new Date(new Date().getTime() + dayTimeInMills);

    // const [isEditing, setIsEditing] = useState(false);

    const handleReservationInforamtionEditBtnClick = (e) => {
        sIsEditting.set(!sIsEditting.value);
    };

    // Có thể xảy ra lỗi: if exists then don't addEventLisener

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
                                {data.bedDetail}
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
                {type !== TYPE_ROOM_TYPE && (
                    <sIsEditting.Wrap>
                        {(value) => {
                            if (value === true)
                                return (
                                    <button
                                        className={cx('cancel-btn')}
                                        onClick={handleReservationInforamtionEditBtnClick}
                                    >
                                        Hủy
                                        <CancelIcon className={cx('cancel-icon')} />
                                    </button>
                                );
                            else {
                                return (
                                    <button
                                        className={cx('edit-btn')}
                                        onClick={handleReservationInforamtionEditBtnClick}
                                    >
                                        Sửa
                                        <EditIcon className={cx('edit-icon')} />
                                    </button>
                                );
                            }
                        }}
                    </sIsEditting.Wrap>
                )}
            </div>
            <sDate.Wrap>
                {(value) => {
                    const checkinNextDay = new Date(new Date(value.checkinDate).getTime() + dayTimeInMills);
                    const checkoutMinDate = checkinNextDay > tomorrow ? checkinNextDay : tomorrow;
                    const checkoutMinDateString = checkoutMinDate.toISOString().split('T')[0];

                    var checkinMaxDateString = '';
                    if (value.checkoutDate) {
                        const checkoutPreviousDay = new Date(new Date(value.checkoutDate).getTime() - dayTimeInMills);
                        const checkoutPreviousDayString = checkoutPreviousDay.toISOString().split('T')[0];
                        checkinMaxDateString = checkoutPreviousDayString;
                    }

                    return (
                        <div className={cx('reservation-information')}>
                            <sIsEditting.Wrap>
                                {(value) => (
                                    <div className="row">
                                        <div className="col c-6 m-6 l-6">
                                            <span>Ngày nhận phòng: </span>
                                            <input
                                                {...{
                                                    disabled:
                                                        type !== TYPE_ROOM_TYPE &&
                                                        (!sIsEditting.value || type !== TYPE_CHECKIN),
                                                    defaultValue: type !== TYPE_ROOM_TYPE && data.checkinDate,
                                                }}
                                                type="date"
                                                min={todayString}
                                                max={checkinMaxDateString}
                                                name="checkinDate"
                                                onInput={type !== TYPE_ROOM_TYPE ? handleDateInput : () => {}}
                                            />
                                        </div>
                                        <div className="col c-6 m-6 l-6">
                                            <span>Ngày trả phòng: </span>
                                            <input
                                                {...{
                                                    disabled: !sIsEditting.value && type !== TYPE_ROOM_TYPE,
                                                    defaultValue: type !== TYPE_ROOM_TYPE && data.checkoutDate,
                                                }}
                                                type="date"
                                                min={checkoutMinDateString}
                                                name="checkoutDate"
                                                onInput={type !== TYPE_ROOM_TYPE ? handleDateInput : () => {}}
                                            />
                                        </div>
                                    </div>
                                )}
                            </sIsEditting.Wrap>
                            <div className="row">
                                <div className="col" style={{ flex: '1' }}>
                                    {data.roomId !== undefined && (
                                        <select name="room" required defaultValue={data.roomId}>
                                            <option value="0" disabled>
                                                Chọn phòng
                                            </option>
                                            {/* Apply data các phòng còn trống */}
                                            <option value={data.roomId}>Phòng {data.roomId}</option>
                                            <option value="P1.02">Phòng "P1.02"</option>
                                        </select>
                                    )}
                                    {data.roomId === undefined &&
                                        (!!value.checkinDate && !!value.checkoutDate ? (
                                            <select name="room" required defaultValue="0">
                                                <option value="0" disabled>
                                                    Chọn phòng
                                                </option>
                                                {/* Apply data các phòng còn trống */}
                                                <option value="P1.01">Phòng P1.01</option>
                                                <option value="P1.02">Phòng P1.02</option>
                                            </select>
                                        ) : (
                                            <select name="room" required disabled defaultValue="-1">
                                                <option value="-1">Vui lòng nhập ngày nhận, trả phòng</option>
                                            </select>
                                        ))}
                                </div>
                            </div>
                        </div>
                    );
                }}
            </sDate.Wrap>
            {/* RESERVATION INFORMATION: END */}

            {/* GUEST INFORMATION: BEGIN */}
            {type === TYPE_ROOM_TYPE && (
                <>
                    <h3 className={cx('heading')}>Thông tin người đặt</h3>
                    <GuestInformation className={cx('guest-information')} />
                </>
            )}

            {type !== TYPE_ROOM_TYPE && (
                <>
                    <div className={cx('heading-wrapper')}>
                        <h3 className={cx('heading')}>Thông tin người đặt</h3>
                        <button
                            className={cx('edit-btn')}
                            name="guest-information"
                            onClick={handleGuestInformationEditBtnClick}
                        >
                            Sửa
                            <EditIcon className={cx('edit-icon')} width="14px" height="14px" />
                        </button>
                    </div>
                    <GuestInformation className={cx('guest-information')} data={data} />
                </>
            )}
            {/* GUEST INFORMATION: END */}

            {/* BUTTONS: BEGIN */}
            <div className={cx('btn-wrapper')}>
                {type === TYPE_ROOM_TYPE && (
                    <Button label="Đặt phòng" type={TYPE_ROOM_TYPE} primary icon={<BookIcon />} className={cx('btn')} />
                )}
                <sIsEditting.Wrap>
                    {(value) => {
                        if (value === true)
                            return (
                                <>
                                    <Button className={cx('btn')} label="Hủy" />
                                    <Button
                                        className={cx('btn')}
                                        label="Xác nhận"
                                        type="confirm"
                                        primary
                                        icon={<CheckIcon />}
                                    />
                                </>
                            );
                        if (type === TYPE_CHECKIN)
                            return (
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
                            );
                        else if (type === TYPE_CHECKOUT)
                            return (
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
                            );
                    }}
                </sIsEditting.Wrap>
            </div>
            {/* BUTTONS: BEGIN */}
        </div>
    );
}

export default RoomModal;
