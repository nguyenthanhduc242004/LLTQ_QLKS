import classNames from 'classnames/bind';
import styles from './guestList.module.scss';
import { SearchIcon } from '../../components/Icons';
import GuestItem from './partials/GuestItem';
import { useEffect } from 'react';
import { sCurrentPage } from '../../layouts/DefaultLayout/Sidebar/sidebarStore';

const cx = classNames.bind(styles);

function GuestList() {
    useEffect(() => {
        sCurrentPage.set('/danh-sach-khach-hang');
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
            <GuestItem />
            <GuestItem />
            <GuestItem />
            <GuestItem />
        </div>
    );
}

export default GuestList;
