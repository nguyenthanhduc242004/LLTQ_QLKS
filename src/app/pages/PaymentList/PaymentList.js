import classNames from 'classnames/bind';
import styles from './paymentList.module.scss';
import { SearchIcon } from '../../components/Icons';
import { useEffect, useState } from 'react';
import { sCurrentPage } from '../../layouts/DefaultLayout/Sidebar/sidebarStore';
import { get } from '../../modules/lib/httpHandle';
import { signify } from 'react-signify';
import { removeVietnameseTones } from '../../modules/lib/removeVietnameseTones';
import PaymentItem from './partials/PaymentItem/PaymentItem';
import RoomModal from '../../components/RoomModal';
import { TYPE_CHECKIN, TYPE_CHECKOUT } from '../Home/partials/Room';

const cx = classNames.bind(styles);

const sShowModal = signify({
    isShowing: false,
    data: undefined,
});

var payments = [];

function PaymentList() {
    const [filteredPayment, setFilteredPayment] = useState([]);

    const handleSearchInput = (e) => {
        // const value = e.target.value.toLowerCase();
        // const searchingPayments = payments.filter((item) => {
        //     if (removeVietnameseTones(item.name).toLowerCase().includes(value)) return true;
        //     if (item.phone.includes(value)) return true;
        //     if (item.email.toLowerCase().includes(value)) return true;
        //     if (removeVietnameseTones(item.staffTypeText).toLowerCase().includes(value)) return true;
        //     var gender;
        //     if (item.gender === 'male') gender = 'nam';
        //     else if (item.gender === 'female') gender = 'nữ';
        //     if (gender.includes(value)) return true;
        //     return false;
        // });
        // setFilteredPayment(searchingPayments);
    };

    useEffect(() => {
        sCurrentPage.set('/danh-sach-thanh-toán');

        get(
            'bookings/',
            (data) => {
                payments = data;
                setFilteredPayment(data);
            },
            () => {
                alert('Bookings not found!');
            },
        );
    }, []);

    return (
        <div className={cx('wrapper') + ' grid'}>
            <div className={cx('header')}>
                <div className={cx('search-wrapper')}>
                    <SearchIcon />
                    <input type="text" placeholder="Tìm kiếm..." onInput={handleSearchInput} />
                </div>
            </div>
            <div className={'row ' + cx('list-header')}>
                <p className="col c-2 m-2 l-2">Tên khách hàng</p>
                <p className="col c-2 m-2 l-2">Ngày check-in</p>
                <p className="col c-2 m-2 l-2">Ngày check-out</p>
                <p className="col c-2 m-2 l-2">Nhân viên thanh toán</p>
                <p className="col c-2 m-2 l-2">Tổng tiền</p>
                <p className="col c-2 m-2 l-2">Tình trạng</p>
            </div>
            {filteredPayment.map((item, index) => (
                <PaymentItem
                    key={index}
                    data={item}
                    onClick={() => {
                        sShowModal.set({
                            isShowing: true,
                            data: item,
                        });
                    }}
                />
            ))}
            <sShowModal.HardWrap>
                {(value) => {
                    console.log(value);

                    if (value.isShowing) {
                        var type = 'booking-detail';
                        if (value.data.isPaid === false) {
                            if (Number(value.data.state) === 1) type = TYPE_CHECKIN;
                            else if (Number(value.data.state) === 2) type = TYPE_CHECKOUT;
                        }
                        return (
                            <div id="chi-tiet-dat-phong" className="modal">
                                <a href="/lich-su-dat-phong#" className="modal-overlay">
                                    {' '}
                                </a>
                                <RoomModal className="modal-body" type={type} data={value.data} />
                            </div>
                        );
                    }
                }}
            </sShowModal.HardWrap>
        </div>
    );
}

export default PaymentList;
