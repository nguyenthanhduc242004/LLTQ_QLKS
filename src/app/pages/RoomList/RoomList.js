import classNames from 'classnames/bind';
import styles from './roomList.module.scss';
import RoomListItem from './partials/RoomListItem/RoomListItem';
import { CaretDownIcon, RemoveFilterIcon, SearchIcon } from '../../components/Icons';
import { useEffect, useState } from 'react';
import { sCurrentPage } from '../../layouts/DefaultLayout/Sidebar/sidebarStore';
import { get } from '../../modules/lib/httpHandle';
import { signify } from 'react-signify';
import { TYPE_CHECKIN, TYPE_CHECKOUT, TYPE_ROOM_TYPE } from '../Home/partials/Room';
import RoomModal from '../../components/RoomModal';
import '../../styles/modal.scss';

const cx = classNames.bind(styles);

const removeFocus = () => {
    const focusingNode = document.querySelector('.' + cx('show'));

    if (focusingNode) {
        focusingNode.classList.remove(cx('show'));
    }
};

const roomStateToString = (state) => {
    state = Number(state);
    if (state === 0) return 'Còn trống';
    else if (state === 1) return 'Chờ check-in';
    else if (state === 2) return 'Chờ check-out';
};

// Có nguy cơ gây ra lỗi!!!
document.addEventListener('click', removeFocus);

const sShowModal = signify({});

function RoomList() {
    console.log('RoomList re-rendered!');

    const [room, setRoom] = useState({});
    const handleFilterClick = (e) => {
        e.stopPropagation();
        removeFocus();
        const filterItem = e.target.closest('.' + cx('filter-item'));
        filterItem.lastElementChild.classList.toggle(cx('show'));
    };
    const handleFilterOptionClick = (e) => {
        e.stopPropagation();
        e.target.parentElement.classList.remove(cx('show'));
        setRoom((prev) => ({ ...prev, [e.target.getAttribute('name')]: e.target.getAttribute('value') }));
        console.log(room);
    };
    const handleRemoveFilter = () => {
        setRoom({});
    };

    // Validate date input
    let secondDateMinDate;
    if (room.firstDate) {
        const firstDateNextDay = new Date(new Date(room.firstDate).getTime() + 24 * 60 * 60 * 1000);
        secondDateMinDate = firstDateNextDay.toISOString().split('T')[0];
    }
    let firstDateMaxDate;
    if (room.secondDate && Number(room.state) === 0) {
        const secondDatePreviousDay = new Date(new Date(room.secondDate).getTime() - 24 * 60 * 60 * 1000);
        firstDateMaxDate = secondDatePreviousDay.toISOString().split('T')[0];
    }

    // Get rooms
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        sCurrentPage.set('/danh-sach-phong');

        get(
            'rooms/',
            (data) => {
                setRooms(data);
            },
            () => {
                alert('Rooms not found!');
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
                <button
                    className={cx('remove-filter-btn')}
                    style={{
                        display: room.floor || room.roomTypeId || room.bedDetailId || room.state ? 'flex' : 'none',
                    }}
                    onClick={handleRemoveFilter}
                >
                    <RemoveFilterIcon />
                </button>
            </div>
            <div className={cx('filter-wrapper')}>
                <div
                    className={cx('filter-item', room.floor ? 'filtered' : '')}
                    onClick={handleFilterClick}
                    style={{ minWidth: '104px' }}
                >
                    {room.floor === undefined ? 'Chọn tầng' : 'Tầng ' + room.floor}
                    <CaretDownIcon className={cx('caret-down-icon')} />
                    <ul className={cx('floor-dropdown')}>
                        <li name="floor" value="1" onClick={handleFilterOptionClick}>
                            Tầng 1
                        </li>
                        <li name="floor" value="2" onClick={handleFilterOptionClick}>
                            Tầng 2
                        </li>
                        <li name="floor" value="3" onClick={handleFilterOptionClick}>
                            Tầng 3
                        </li>
                        <li name="floor" value="4" onClick={handleFilterOptionClick}>
                            Tầng 4
                        </li>
                    </ul>
                </div>
                <div
                    className={cx('filter-item', room.roomTypeId ? 'filtered' : '')}
                    onClick={handleFilterClick}
                    style={{ minWidth: '160px' }}
                >
                    {room.roomTypeId === undefined ? 'Chọn hạng phòng' : room.roomTypeId}
                    <CaretDownIcon className={cx('caret-down-icon')} />
                    <ul className={cx('room-type-dropdown')}>
                        {/* Đoạn này value nên là RoomTypeId */}
                        <li name="roomTypeId" value="RoomType1" onClick={handleFilterOptionClick}>
                            Phòng Deluxe Twin
                        </li>
                        <li name="roomTypeId" value="RoomType2" onClick={handleFilterOptionClick}>
                            Phòng Deluxe Twin
                        </li>
                        <li name="roomTypeId" value="RoomType3" onClick={handleFilterOptionClick}>
                            Phòng Deluxe Twin
                        </li>
                        <li name="roomTypeId" value="RoomType4" onClick={handleFilterOptionClick}>
                            Phòng Deluxe TwinTwin Twin Twin{' '}
                        </li>
                    </ul>
                </div>
                <div
                    className={cx('filter-item', room.bedDetailId ? 'filtered' : '')}
                    onClick={handleFilterClick}
                    style={{ minWidth: '160px' }}
                >
                    {room.bedDetailId === undefined ? 'Chi tiết giường' : room.bedDetailId}
                    <CaretDownIcon className={cx('caret-down-icon')} />
                    <ul className={cx('bed-detail-dropdown')}>
                        {/* Đoạn này value nên là BedDetailId */}
                        <li name="bedDetailId" value="BedDetail1" onClick={handleFilterOptionClick}>
                            1 giường sofa đơn, 1 giường king size
                        </li>
                        <li name="bedDetailId" value="BedDetail2" onClick={handleFilterOptionClick}>
                            Phòng Deluxe Twin
                        </li>
                        <li name="bedDetailId" value="BedDetail3" onClick={handleFilterOptionClick}>
                            Phòng Deluxe Twin
                        </li>
                        <li name="bedDetailId" value="BedDetail4" onClick={handleFilterOptionClick}>
                            Phòng Deluxe TwinTwin Twin Twin{' '}
                        </li>
                    </ul>
                </div>
                <div
                    className={cx('filter-item', 'filter-item__room-state', room.state ? 'filtered' : '')}
                    onClick={handleFilterClick}
                    style={{ minWidth: '120px' }}
                >
                    {room.state === undefined ? 'Tình trạng' : roomStateToString(room.state)}
                    <CaretDownIcon className={cx('caret-down-icon')} />
                    <ul className={cx('room-state-dropdown')}>
                        <li name="state" value="0" onClick={handleFilterOptionClick}>
                            Còn trống
                        </li>
                        <li name="state" value="1" onClick={handleFilterOptionClick}>
                            Chờ check-in
                        </li>
                        <li name="state" value="2" onClick={handleFilterOptionClick}>
                            Chờ check-out
                        </li>
                    </ul>
                </div>
                <input
                    type="date"
                    max={firstDateMaxDate}
                    name="firstDate"
                    className={cx('date-input', room.firstDate ? 'filtered' : '')}
                    value={room.firstDate ? room.firstDate : ''}
                    onInput={(e) => setRoom((prev) => ({ ...prev, [e.target.getAttribute('name')]: e.target.value }))}
                    style={{
                        display: room.state ? 'flex' : 'none',
                    }}
                />
                {Number(room.state) === 0 && (
                    <>
                        <span className={cx('divider')}>-</span>
                        <input
                            type="date"
                            min={secondDateMinDate}
                            name="secondDate"
                            value={room.secondDate ? room.secondDate : ''}
                            className={cx('date-input', room.secondDate ? 'filtered' : '')}
                            onInput={(e) =>
                                setRoom((prev) => ({ ...prev, [e.target.getAttribute('name')]: e.target.value }))
                            }
                        />
                    </>
                )}
            </div>
            <div className={'row ' + cx('list-header')}>
                <p className="col c-1 m-1 l-1">Số phòng</p>
                <p className="col c-2 m-2 l-2">Hạng phòng</p>
                <p className="col c-3 m-3 l-3">Chi tiết giường</p>
                <p className="col c-2 m-2 l-2">Diện tích</p>
                <p className="col c-2 m-2 l-2">Tình trạng</p>
                <p className="col c-2 m-2 l-2">Check-in/Check-out</p>
            </div>
            {rooms.map((item, index) => (
                <RoomListItem
                    key={index}
                    data={item}
                    onClick={() => {
                        var type;
                        if (item.state === 0) type = TYPE_ROOM_TYPE;
                        else if (item.state === 1) type = TYPE_CHECKIN;
                        else if (item.state === 2) type = TYPE_CHECKOUT;
                        sShowModal.set({
                            type,
                            data: item,
                        });
                    }}
                />
            ))}
            <sShowModal.HardWrap>
                {(value) => {
                    console.log('sShowModal re-rendered!');
                    if (value.type === TYPE_ROOM_TYPE) {
                        return (
                            <div id={value.type} className="modal">
                                <a href="/danh-sach-phong#" className="modal-overlay">
                                    {' '}
                                </a>
                                <RoomModal type={value.type} className="modal-body" data={value.data} />
                            </div>
                        );
                    } else if (value.type === TYPE_CHECKIN) {
                        return (
                            <div id={value.type} className="modal">
                                <a href="/danh-sach-phong#" className="modal-overlay">
                                    {' '}
                                </a>
                                <RoomModal type={value.type} className="modal-body" data={value.data} />
                            </div>
                        );
                    } else if (value.type === TYPE_CHECKOUT) {
                        return (
                            <div id={value.type} className="modal">
                                <a href="/danh-sach-phong#" className="modal-overlay">
                                    {' '}
                                </a>
                                <RoomModal type={value.type} className="modal-body" data={value.data} />
                            </div>
                        );
                    }
                }}
            </sShowModal.HardWrap>
        </div>
    );
}

export default RoomList;
