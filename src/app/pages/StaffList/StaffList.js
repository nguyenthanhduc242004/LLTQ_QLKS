import classNames from 'classnames/bind';
import styles from './staffList.module.scss';
import { SearchIcon } from '../../components/Icons';
import StaffItem from './partials/StaffItem';
import { useEffect, useState } from 'react';
import { sCurrentPage } from '../../layouts/DefaultLayout/Sidebar/sidebarStore';
import { get } from '../../modules/lib/httpHandle';
import { signify } from 'react-signify';
import StaffModal from '../../components/StaffModal/StaffModal';
import { removeVietnameseTones } from '../../modules/lib/removeVietnameseTones';

const cx = classNames.bind(styles);

const sShowModal = signify({
    isShowing: false,
    data: undefined,
});

var staffs = [];

function StaffList() {
    const [filteredStaffs, setFilteredStaffs] = useState([]);

    const handleSearchInput = (e) => {
        const value = e.target.value.toLowerCase();
        const searchingStaffs = staffs.filter((item) => {
            if (removeVietnameseTones(item.name).toLowerCase().includes(value)) return true;
            if (item.phone.includes(value)) return true;
            if (item.email.toLowerCase().includes(value)) return true;
            if (removeVietnameseTones(item.staffTypeText).toLowerCase().includes(value)) return true;
            var gender;
            if (item.gender === 'male') gender = 'nam';
            else if (item.gender === 'female') gender = 'nữ';
            if (gender.includes(value)) return true;
            return false;
        });
        setFilteredStaffs(searchingStaffs);
    };

    useEffect(() => {
        sCurrentPage.set('/danh-sach-nhan-vien');

        get(
            'staffs/',
            (data) => {
                staffs = data;
                setFilteredStaffs(data);
            },
            () => {
                alert('Staffs not found!');
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
                <p className="col c-1 m-1 l-1">Avatar</p>
                <p className="col c-2 m-2 l-2">Họ tên</p>
                <p className="col c-2 m-2 l-2">Giới tính</p>
                <p className="col c-2 m-2 l-2">Điện thoại</p>
                <p className="col c-3 m-3 l-3">Email</p>
                <p className="col c-2 m-2 l-2">Loại nhân viên</p>
            </div>
            {filteredStaffs.map((item, index) => (
                <StaffItem
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
                            <div id="nhan-vien" className="modal">
                                <a href="/danh-sach-nhan-vien#" className="modal-overlay">
                                    {' '}
                                </a>
                                <StaffModal className="modal-body" data={value.data} />
                            </div>
                        );
                    }
                }}
            </sShowModal.HardWrap>
        </div>
    );
}

export default StaffList;
