import classNames from 'classnames/bind';
import styles from './staffList.module.scss';
import { SearchIcon } from '../../components/Icons';
import StaffItem from './partials/StaffItem';

const cx = classNames.bind(styles);

function StaffList() {
    return (
        <div className={cx('wrapper') + ' grid'}>
            <div className={cx('header')}>
                <div className={cx('search-wrapper')}>
                    <SearchIcon />
                    <input type="text" />
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
            <StaffItem />
            <StaffItem />
            <StaffItem />
            <StaffItem />
        </div>
    );
}

export default StaffList;
