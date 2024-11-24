import classNames from 'classnames/bind';
import styles from './roomList.module.scss';
import RoomListItem from './partials/RoomListItem/RoomListItem';
import { CaretDownIcon, RemoveFilterIcon, SearchIcon } from '../../components/Icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

const removeFocus = (e) => {
    const focusingNode = document.querySelector('.' + cx('show'));

    if (focusingNode) {
        focusingNode.classList.remove(cx('show'));
    }
};

document.addEventListener('click', removeFocus);

function RoomList() {
    const [floor, setFloor] = useState('Chọn tầng');
    const [roomType, setRoomType] = useState('Chọn hạng phòng');
    const [bedDetail, setBedDetail] = useState('Chi tiết giường');
    const [roomState, setRoomState] = useState('Tình trạng');
    const [firstDate, setFirstDate] = useState();
    const [secondDate, setSecondDate] = useState();

    const handleFilterClick = (e) => {
        e.stopPropagation();
        removeFocus();
        const filterItem = e.target.closest('.' + cx('filter-item'));
        filterItem.lastElementChild.classList.toggle(cx('show'));
    };

    const handleFilterOptionClick = (e) => {
        e.stopPropagation();
        e.target.parentElement.classList.remove(cx('show'));
        setFloor(e.target.innerText);
    };

    const handleRoomTypeOptionClick = (e) => {
        e.stopPropagation();
        e.target.parentElement.classList.remove(cx('show'));
        setRoomType(e.target.innerText);
    };

    const handleBedDetailOptionClick = (e) => {
        e.stopPropagation();
        e.target.parentElement.classList.remove(cx('show'));
        setBedDetail(e.target.innerText);
    };

    const handleRoomStateOptionClick = (e) => {
        e.stopPropagation();
        e.target.parentElement.classList.remove(cx('show'));
        setRoomState(e.target.innerText);
    };

    const handleRemoveFilter = () => {
        setFloor('Chọn tầng');
        setRoomType('Chọn hạng phòng');
        setBedDetail('Chi tiết giường');
        setRoomState('Tình trạng');
        setFirstDate();
        setSecondDate();
    };

    return (
        <div className={cx('wrapper') + ' grid'}>
            <div className={cx('header')}>
                <div className={cx('search-wrapper')}>
                    <SearchIcon />
                    <input type="text" />
                </div>
                {console.log(
                    floor !== 'Chọn tầng' ||
                        roomType !== 'Chọn hạng phòng' ||
                        bedDetail !== 'Chi tiết giường' ||
                        roomState !== 'Tình trạng',
                )}
                <button
                    className={cx('remove-filter-btn')}
                    style={{
                        display:
                            floor !== 'Chọn tầng' ||
                            roomType !== 'Chọn hạng phòng' ||
                            bedDetail !== 'Chi tiết giường' ||
                            roomState !== 'Tình trạng'
                                ? 'flex'
                                : 'none',
                    }}
                    onClick={handleRemoveFilter}
                >
                    <RemoveFilterIcon />
                </button>
            </div>
            <div className={cx('filter-wrapper')}>
                <div
                    className={cx('filter-item', floor !== 'Chọn tầng' ? 'filtered' : '')}
                    onClick={handleFilterClick}
                    style={{ minWidth: '104px' }}
                >
                    {floor}
                    <CaretDownIcon className={cx('caret-down-icon')} />
                    <ul className={cx('floor-dropdown')}>
                        <li onClick={handleFilterOptionClick}>Tầng 1</li>
                        <li onClick={handleFilterOptionClick}>Tầng 2</li>
                        <li onClick={handleFilterOptionClick}>Tầng 3</li>
                        <li onClick={handleFilterOptionClick}>Tầng 4</li>
                    </ul>
                </div>
                <div
                    className={cx('filter-item', roomType !== 'Chọn hạng phòng' ? 'filtered' : '')}
                    onClick={handleFilterClick}
                    style={{ minWidth: '160px' }}
                >
                    {roomType}
                    <CaretDownIcon className={cx('caret-down-icon')} />
                    <ul className={cx('room-type-dropdown')}>
                        <li onClick={handleRoomTypeOptionClick}>Phòng Deluxe Twin</li>
                        <li onClick={handleRoomTypeOptionClick}>Phòng Deluxe Twin</li>
                        <li onClick={handleRoomTypeOptionClick}>Phòng Deluxe Twin</li>
                        <li onClick={handleRoomTypeOptionClick}>Phòng Deluxe TwinTwin Twin Twin </li>
                    </ul>
                </div>
                <div
                    className={cx('filter-item', bedDetail !== 'Chi tiết giường' ? 'filtered' : '')}
                    onClick={handleFilterClick}
                    style={{ minWidth: '160px' }}
                >
                    {bedDetail}
                    <CaretDownIcon className={cx('caret-down-icon')} />
                    <ul className={cx('bed-detail-dropdown')}>
                        <li onClick={handleBedDetailOptionClick}>1 giường sofa đơn, 1 giường king size</li>
                        <li onClick={handleBedDetailOptionClick}>Phòng Deluxe Twin</li>
                        <li onClick={handleBedDetailOptionClick}>Phòng Deluxe Twin</li>
                        <li onClick={handleBedDetailOptionClick}>Phòng Deluxe TwinTwin Twin Twin </li>
                    </ul>
                </div>
                <div
                    className={cx(
                        'filter-item',
                        'filter-item__room-state',
                        roomState !== 'Tình trạng' ? 'filtered' : '',
                    )}
                    onClick={handleFilterClick}
                    style={{ minWidth: '120px' }}
                >
                    {roomState}
                    <CaretDownIcon className={cx('caret-down-icon')} />
                    <ul className={cx('room-state-dropdown')}>
                        <li onClick={handleRoomStateOptionClick}>Còn trống</li>
                        <li onClick={handleRoomStateOptionClick}>Chờ check-in</li>
                        <li onClick={handleRoomStateOptionClick}>Chờ check-out</li>
                    </ul>
                </div>
                <input
                    type="date"
                    className={cx('date-input', firstDate ? 'filtered' : '')}
                    value={firstDate ? firstDate : ''}
                    onInput={(e) => setFirstDate(e.target.value)}
                    style={{
                        display: roomState !== 'Tình trạng' ? 'flex' : 'none',
                    }}
                />
                <span
                    className={cx('divider')}
                    style={{
                        display: roomState === 'Còn trống' ? 'flex' : 'none',
                    }}
                >
                    -
                </span>
                <input
                    type="date"
                    value={secondDate ? secondDate : ''}
                    className={cx('date-input', secondDate ? 'filtered' : '')}
                    onInput={(e) => setSecondDate(e.target.value)}
                    style={{
                        display: roomState === 'Còn trống' ? 'flex' : 'none',
                    }}
                />
            </div>
            <div className={'row ' + cx('list-header')}>
                <p className="col c-1 m-1 l-1">Số phòng</p>
                <p className="col c-2 m-2 l-2">Hạng phòng</p>
                <p className="col c-3 m-3 l-3">Chi tiết giường</p>
                <p className="col c-2 m-2 l-2">Diện tích</p>
                <p className="col c-2 m-2 l-2">Tình trạng</p>
                <p className="col c-2 m-2 l-2">Check-in/Check-out</p>
            </div>
            <RoomListItem />
            <RoomListItem />
            <RoomListItem />
            <RoomListItem />
            <RoomListItem />
        </div>
    );
}

export default RoomList;
