import classNames from 'classnames/bind';
import { signify } from 'react-signify';
import { TYPE_CHECKIN, TYPE_CHECKOUT, TYPE_ROOM_TYPE } from '../../pages/Home/partials/Room';
import '../../styles/grid.scss';
import { BedIcon, BookIcon, CheckinIcon, HomePaymentIcon, RoomSizeIcon } from '../Icons';
import styles from './roomModal.module.scss';
import Button from '../Button';

const cx = classNames.bind(styles);

const sDate = signify({
    checkinDate: '',
    checkoutDate: '',
});

let mainHeading;
let stateText;

const dayTimeInMills = 24 * 60 * 60 * 1000;

function RoomModal({ className, type, data }) {
    if (type === TYPE_ROOM_TYPE) {
        mainHeading = 'ĐẶT PHÒNG';
    } else if (type === TYPE_CHECKIN) {
        mainHeading = 'CHECK-IN';
    } else if (type === TYPE_CHECKOUT) {
        mainHeading = 'CHECK-OUT';
    }

    if (data.state === 0) stateText = 'Còn trống';
    else if (data.state === 1) stateText = 'Chờ check-in';
    else if (data.state === 2) stateText = 'Chờ check-out';

    const handleDateInput = (e) => {
        sDate.set({ ...sDate.value, [e.target.name]: e.target.value });
        if (!!sDate.value.checkinDate && !!sDate.value.checkoutDate) {
            alert();
        }
    };

    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const tomorrow = new Date(new Date().getTime() + dayTimeInMills);

    return (
        <div className={cx('wrapper') + ' grid ' + className}>
            <h2 className={cx('main-heading')}>{mainHeading}</h2>
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

            <h3 className={cx('heading')}>Thông tin đặt phòng</h3>
            {type === TYPE_ROOM_TYPE && (
                <>
                    <sDate.Wrap>
                        {(value) => {
                            console.log('sDate.Wrap re-rendered!');

                            const checkinNextDay = new Date(new Date(value.checkinDate).getTime() + dayTimeInMills);
                            const checkoutMinDate = checkinNextDay > tomorrow ? checkinNextDay : tomorrow;
                            const checkoutMinDateString = checkoutMinDate.toISOString().split('T')[0];

                            var checkinMaxDateString;
                            if (value.checkoutDate) {
                                const checkoutPreviousDay = new Date(
                                    new Date(value.checkoutDate).getTime() - dayTimeInMills,
                                );
                                const checkoutPreviousDayString = checkoutPreviousDay.toISOString().split('T')[0];
                                checkinMaxDateString = checkoutPreviousDayString;
                            } else {
                                checkinMaxDateString = '';
                            }

                            return (
                                <div className={cx('reservation-information')}>
                                    <div className="row">
                                        <div className="col c-6 m-6 l-6">
                                            <span>Ngày nhận phòng: </span>
                                            <input
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
                                                type="date"
                                                min={checkoutMinDateString}
                                                name="checkoutDate"
                                                onInput={handleDateInput}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col" style={{ flex: '1' }}>
                                            {!!value.checkinDate && !!value.checkoutDate ? (
                                                <select name="room" required defaultValue="0">
                                                    <option value="0" disabled>
                                                        Chọn phòng
                                                    </option>
                                                    <option value="101">Phòng 101</option>
                                                    <option value="102">Phòng 102</option>
                                                </select>
                                            ) : (
                                                <select name="room" required disabled defaultValue="-1">
                                                    <option value="-1">Vui lòng nhập ngày nhận, trả phòng</option>
                                                </select>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        }}
                    </sDate.Wrap>
                    <h3 className={cx('heading')}>Thông tin người đặt</h3>
                    <div className={cx('booker-information')}>
                        <div className="row">
                            <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                                <span>CCCD: </span>
                                <input type="text" />
                            </div>
                            <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                                <span>Họ tên: </span>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="row">
                            <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                                <span>Điện thoại: </span>
                                <input type="tel" />
                            </div>
                            <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                                <span>Email: </span>
                                <input type="email" />
                            </div>
                        </div>
                        <div className="row">
                            <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                                <span>Ngày sinh: </span>
                                <input type="date" />
                            </div>
                            <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                                <span>Giới tính: </span>
                                <select name="room" required="">
                                    <option value="" disabled="" defaultValue="">
                                        Chọn giới tính
                                    </option>
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className={cx('input-with-label') + ' col c-12 m-12 l-12'}>
                                <span>Địa chỉ: </span>
                                <input type="text" />
                            </div>
                        </div>
                        <Button
                            label="Đặt phòng"
                            type={TYPE_ROOM_TYPE}
                            primary
                            icon={<BookIcon />}
                            className={cx('btn')}
                        />
                        <div className="clear" />
                    </div>
                </>
            )}
            {type !== TYPE_ROOM_TYPE && (
                <>
                    <div className={cx('reservation-information')}>
                        <div className="row">
                            <div className="col c-6 m-6 l-6">
                                <span>Ngày nhận phòng: </span>
                                <input type="date" name="checkinDate" value={data.checkinDate} disabled />
                            </div>
                            <div className="col c-6 m-6 l-6">
                                <span>Ngày trả phòng: </span>
                                <input type="date" name="checkoutDate" value={data.checkoutDate} disabled />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col" style={{ flex: '1' }}>
                                <select name="room" required defaultValue={data.roomId} disabled>
                                    <option value={data.roomId}>Phòng {data.roomId}</option>
                                </select>
                            </div>

                            <p className={cx('room-state-wrapper') + ' col c-4 m-4 l-4'}>
                                Tình trạng:
                                <span className={cx('room-state')}>{stateText}</span>
                            </p>
                        </div>
                    </div>
                    <h3 className={cx('heading')}>Thông tin người đặt</h3>
                    <div className={cx('booker-information')}>
                        <div className="row">
                            <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                                <span>CCCD: </span>
                                <input type="text" value={data.guestId} disabled />
                            </div>
                            <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                                <span>Họ tên: </span>
                                <input type="text" value={data.guestName} disabled />
                            </div>
                        </div>
                        <div className="row">
                            <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                                <span>Điện thoại: </span>
                                <input type="tel" value={data.guestPhone} disabled />
                            </div>
                            <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                                <span>Email: </span>
                                <input type="email" value={data.guestEmail} disabled />
                            </div>
                        </div>
                        <div className="row">
                            <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                                <span>Ngày sinh: </span>
                                <input type="date" value={data.guestDob} disabled />
                            </div>
                            <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                                <span>Giới tính: </span>
                                <select name="room" required="" defaultValue={data.guestGender} disabled>
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className={cx('input-with-label') + ' col c-12 m-12 l-12'}>
                                <span>Địa chỉ: </span>
                                <input type="text" value={data.guestAddress} disabled />
                            </div>
                        </div>
                        {type === TYPE_CHECKIN && (
                            <Button
                                className={cx('btn')}
                                label="Check-in"
                                type={TYPE_CHECKIN}
                                primary
                                icon={<CheckinIcon />}
                            />
                        )}
                        {type === TYPE_CHECKOUT && (
                            <Button
                                className={cx('btn')}
                                label="Thanh toán"
                                type={TYPE_CHECKOUT}
                                primary
                                icon={<HomePaymentIcon />}
                            />
                        )}
                        <div className="clear" />
                    </div>
                </>
            )}
        </div>
    );
}

export default RoomModal;
