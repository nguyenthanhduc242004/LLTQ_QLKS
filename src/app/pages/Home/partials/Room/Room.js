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
import Swal from 'sweetalert2';
import { post } from '../../../../modules/lib/httpHandle';
import { BE_ENDPOINT } from '../../../../../settings/localVar';

const cx = classNames.bind(styles);

const reformatDate = (date) => {
    if (date) {
        return date.toLocaleDateString();
    }
    else return ''
};

function Room({ classNames, type, data, onClick }) {
    const handleDeleteBooking = (e) => {
        e.stopPropagation();
        console.log(data.id)
        Swal.fire({
            title: 'Xác nhận hủy đặt phòng?',
            text: 'Lưu ý không thể hoàn tất sau khi thực hiện thao tác này!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Thoát',
        }).then(async function (result)  {

            if (result.isConfirmed) {
                //alert('DELETING A BOOKING!');
                const response= await fetch(BE_ENDPOINT+"booking/delete/"+data.id,{
                    method:"DELETE",
                    header:{
                        "Content-Type":"Plain/text"
                    }
                });
                if(!response.ok)
                {
                    alert("Hủy đặt phòng thất bại");
                    return;
                }
                
                console.log(data.id);
                Swal.fire({
                    title: 'Đã hủy!',
                    text: 'Bạn vừa hủy đặt phòng thành công.',
                    icon: 'success',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            }
        });
    };

    const handleCheckinConfirm = (e) => {
        e.stopPropagation();
        Swal.fire({
            title: 'Xác nhận check-in?',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: `Thoát`,
            icon: 'info',
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
             
            
            if (result.isConfirmed) {
                //alert('UPDATING A BOOKING AND A ROOM STATE!');
                // Thay đổi room state, thay dổi ngày checkin là ngày hôm nay
                const checkinURL= BE_ENDPOINT+"checkin/"+data.id;
            const response= await fetch(checkinURL,{
                method:"GET",
                headers:{
                    "Content-Type":"Application/json"
                }
            });
            if(!response.ok)
            {
                alert("Fail");
                return;
            }
            const responseData= await response.json();
            console.log(responseData);
                const today = new Date();
                const year = today.getFullYear();
                const month = today.getMonth() + 1;
                const day = today.getDate();
                console.log(data.id, data.roomId, `${year}/${month}/${day}`);

                Swal.fire('Check-in thành công!', '', 'success').then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            } else if (result.isDenied) {
                Swal.fire('Check-in thất bại!', '', 'error');
            }
        });
    };

    const handleExtendCheckoutDate = (e) => {
        e.stopPropagation();
        let requestBody={};
        Swal.fire({
            title: 'Vui lòng nhập ngày trả phòng mới',
            input: 'date',
            inputAttributes: {
                autocapitalize: 'off',
            },
            showCancelButton: true,
            confirmButtonText: 'Kiểm tra',
            cancelButtonText: 'Thoát',
            showLoaderOnConfirm: true,
            preConfirm: async (date) => {
                try {
                    const body = {
                        id: data.id,
                        checkoutDate: date,
                        roomId: data.roomId,
                    };
                    console.log(body);
                    requestBody={
                        newCheckoutDate:date
                    
                    }
                    const response = await fetch(BE_ENDPOINT+"renewal/check/"+body.id,{
                        method:"POST",
                        headers:{
                            "Content-Type":"Application/json"
                        },
                        body:JSON.stringify(requestBody)
                    });
                    if(!response.ok)
                    {
                        return Swal.showValidationMessage('Ngày trả phòng không hợp lệ!');
                    }


                    /*await post(
                        'someURI/',
                        body,
                        (data) => {
                            // UPDATING A BOOKING'S CHECKOUTDATE
                           
                        },
                        () => {
                            
                            // UPDATE FAILED
                            return Swal.showValidationMessage('Ngày trả phòng không hợp lệ!');
                        },
                    );*/
                } catch (error) {
                    Swal.showValidationMessage(`
                  Yêu cầu thất bại: ${error}!
                `);
                }
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then(async function(result)  {
            if (result.isConfirmed) { 
               console.log(requestBody);
                Swal.fire({
                    title: `Gia hạn thành công`,
                    icon: 'success',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            }
        });
    };

    const handlePay = (e) => {
        e.stopPropagation();
        Swal.fire({
            title: 'Xác nhận thanh toán?',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: `Thoát`,
        }).then(async function (result)  {
            
            if (result.isConfirmed) {
                //alert('UPDATING A BOOKING!');
                const payURL= BE_ENDPOINT+"checkout/"+data.id;
            const response= await fetch(payURL, {
                method:"GET",
                headers:{
                    "Content-Type":"Application/json"
                }
            });
            if(!response.ok)
            {
                alert("Fail");
                return;
            } 
            const responseData= await response.json();
            console.log(responseData);
                console.log(data.id, data.roomId);
                Swal.fire('Thanh toán thành công!', '', 'success').then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            } else if (result.isDenied) {
                Swal.fire('Thanh toán thất bại!', '', 'error');
            }
        });
    };

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
                            <p className={cx('room-name')}>{data?.roomTypeText}</p>
                            <p className={cx('room-number')}>{data?.roomNumber}</p>
                        </div>
                        {type === TYPE_CHECKIN && (
                            <>
                                <div className={cx('body-container')}>
                                    <span className={cx('customer-name')}>
                                        <PersonIcon className={cx('icon')} />
                                        {data?.guestName}
                                    </span>
                                    <span className={cx('bed-detail')}>
                                        <ClockIcon className={cx('icon')} />
                                        {new Date(data?.checkinDate.split('-')).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className={cx('btn-wrapper')}>
                                    <Button label="Hủy đặt phòng" onClick={handleDeleteBooking} />
                                    <Button
                                        label="Check-in"
                                        type={TYPE_CHECKIN}
                                        primary
                                        icon={<CheckinIcon />}
                                        onClick={handleCheckinConfirm}
                                    />
                                </div>
                            </>
                        )}
                        {type === TYPE_CHECKOUT && (
                            <>
                                <div className={cx('body-container')}>
                                    <span className={cx('customer-name')}>
                                        <PersonIcon className={cx('icon')} />
                                        {data?.guestName}
                                    </span>
                                    <span className={cx('bed-detail')}>
                                        <ClockIcon className={cx('icon')} />
                                        {new Date(data?.checkoutDate.split('-')).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className={cx('btn-wrapper')}>
                                    <Button label="Gia hạn" onClick={handleExtendCheckoutDate} />
                                    <Button
                                        label="Thanh toán"
                                        type={TYPE_CHECKOUT}
                                        primary
                                        icon={<HomePaymentIcon />}
                                        onClick={handlePay}
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
