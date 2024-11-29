import classNames from 'classnames/bind';
import styles from './guestList.module.scss';
import { SearchIcon } from '../../components/Icons';
import GuestItem from './partials/GuestItem';
import { useEffect, useState } from 'react';
import { sCurrentPage } from '../../layouts/DefaultLayout/Sidebar/sidebarStore';
import { signify } from 'react-signify';
import GuestModal from '../../components/GuestModal';
import '../../styles/modal.scss';
import { get } from '../../modules/lib/httpHandle';

const cx = classNames.bind(styles);

const sShowModal = signify({
    isShowing: false,
    data: undefined,
});

function GuestList() {
    const [guests, setGuests] = useState([]);

    useEffect(() => {
        sCurrentPage.set('/danh-sach-khach-hang');

        get(
            'guests/',
            (data) => {
                setGuests(data);
            },
            () => {
                alert('Guests not found!');
            },
        );
    }, []);

    return (
        <div className={cx('wrapper') + ' grid'}>
            <div className={cx('header')}>
                <div className={cx('search-wrapper')}>
                    <SearchIcon />
                    <input type="text" />
                </div>
            </div>
            <div className={'row ' + cx('list-header')}>
                <p className="col c-2 m-2 l-2">CCCD</p>
                <p className="col c-3 m-3 l-3">Họ tên</p>
                <p className="col c-1 m-1 l-1">Giới tính</p>
                <p className="col c-1 m-1 l-1">Ngày sinh</p>
                <p className="col c-3 m-3 l-3">Email</p>
                <p className="col c-2 m-2 l-2">Điện thoại</p>
            </div>
            {guests.map((item, index) => (
                <GuestItem
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
                    if (value.isShowing) {
                        return (
                            <div id="khach-hang" className="modal">
                                <a href="/danh-sach-khach-hang#" className="modal-overlay">
                                    {' '}
                                </a>
                                <GuestModal className="modal-body" data={value.data} />
                            </div>
                        );
                    }
                }}
            </sShowModal.HardWrap>
        </div>
    );
}

export default GuestList;
