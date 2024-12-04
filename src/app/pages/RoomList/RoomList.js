import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { signify } from 'react-signify';
import { CaretDownIcon, RemoveFilterIcon, SearchIcon } from '../../components/Icons';
import RoomModal from '../../components/RoomModal';
import { sCurrentPage } from '../../layouts/DefaultLayout/Sidebar/sidebarStore';
import { get } from '../../modules/lib/httpHandle';
import { removeVietnameseTones } from '../../modules/lib/removeVietnameseTones';
import '../../styles/modal.scss';
import { TYPE_CHECKIN, TYPE_CHECKOUT, TYPE_ROOM_TYPE } from '../Home/partials/Room';
import RoomListItem from './partials/RoomListItem/RoomListItem';
import styles from './roomList.module.scss';
import { useLocation } from 'react-router-dom';

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

// var rooms = [];
var roomTypes = [];
var bedDetails = [];
// var bookings = [];

function RoomList() {
    const getFilteredRooms = (filterOptions) => {
        var res = [];
        var filterState;
        res = roomsWithEarliestDate.filter((item) => {
            if (filterOptions.floor) if (item.floor !== Number(filterOptions.floor)) return false;
            if (filterOptions.roomTypeId) if (item.roomTypeId !== Number(filterOptions.roomTypeId)) return false;
            if (filterOptions.bedDetailId) if (item.bedDetailId !== Number(filterOptions.bedDetailId)) return false;
            if (filterOptions.state) {
                filterState = Number(filterOptions.state);
                if (filterState === 0) {
                    if (filterOptions.firstDate || filterOptions.secondDate) {
                        const bookingsById = getBookingsByRoomId(item.roomId || item.id);
                        if (filterOptions.firstDate && filterOptions.secondDate) {
                            for (const booking of bookingsById) {
                                const checkinDate = new Date(booking.checkinDate.split('-'));
                                const checkoutDate = new Date(booking.checkoutDate.split('-'));
                                const firstDate = new Date(filterOptions.firstDate.split('-'));
                                const secondDate = new Date(filterOptions.secondDate.split('-'));
                                if (!(secondDate <= checkinDate || firstDate >= checkoutDate)) return false;
                            }
                        } else if (filterOptions.firstDate) {
                            for (const booking of bookingsById) {
                                if (
                                    new Date(booking.checkoutDate.split('-')) >
                                    new Date(filterOptions.firstDate.split('-'))
                                )
                                    return false;
                            }
                        } else if (filterOptions.secondDate) {
                            for (const booking of bookingsById) {
                                if (
                                    new Date(booking.checkinDate.split('-')) <
                                    new Date(filterOptions.secondDate.split('-'))
                                )
                                    return false;
                            }
                        }
                    } else {
                        if (item.state !== filterState) return false;
                    }
                } else if (filterState === 1) {
                    if (item.state !== filterState) return false;
                    if (filterOptions.firstDate) if (item.checkinDate !== filterOptions.firstDate) return false;
                } else if (filterState === 2) {
                    if (item.state !== filterState) return false;
                    if (filterOptions.firstDate) if (item.checkoutDate !== filterOptions.firstDate) return false;
                }
            }
            return true;
        });
        console.log(res);
        return res;
    };

    const [roomsWithEarliestDate, setRoomsWithEarliestDate] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [filterOptions, setFilterOptions] = useState({ state: -1 });
    var viewAllRoomState = useLocation().state;
    if (viewAllRoomState === null) viewAllRoomState = -1;
    const [rooms, setRooms] = useState([]);
    const [bookings, setBookings] = useState([]);
    const inputRef = useRef();

    const getBookingsByRoomId = (id) => {
        var res = [];
        bookings.forEach((item) => {
            if (item.roomId === id) res.push(item);
        });
        return res;
    };

    const getRoomsWithEarliestDate = () => {
        var res = [];
        rooms.forEach((room) => {
            if (room.state === 0) res.push(room);
            else {
                var theBooking = undefined;
                bookings.forEach((booking) => {
                    if (!booking.isPaid && Number(room.id) === booking.roomId) {
                        if (!theBooking) {
                            theBooking = booking;
                        } else {
                            if (new Date(booking.checkinDate.split('-')) < new Date(theBooking.checkinDate.split('-')))
                                theBooking = booking;
                        }
                    }
                });
                res.push(theBooking);
            }
        });
        return res;
    };

    const handleFilterClick = (e) => {
        e.stopPropagation();
        removeFocus();
        const filterItem = e.target.closest('.' + cx('filter-item'));
        filterItem.lastElementChild.classList.toggle(cx('show'));
    };

    const handleRemoveFilter = () => {
        setFilterOptions({ state: -1 });
        inputRef.current.value = '';
        inputRef.current.focus();
    };

    // FILTER OPTIONS:
    const handleFilterOptionClick = (e) => {
        e.stopPropagation();
        e.target.parentElement.classList.remove(cx('show'));
        setFilterOptions((prev) => ({ ...prev, [e.target.getAttribute('name')]: e.target.getAttribute('value') }));
    };

    // Validate date input
    let secondDateMinDate;
    if (filterOptions.firstDate) {
        const firstDateNextDay = new Date(new Date(filterOptions.firstDate).getTime() + 24 * 60 * 60 * 1000);
        secondDateMinDate = firstDateNextDay.toISOString().split('T')[0];
    }
    let firstDateMaxDate;
    if (filterOptions.secondDate && Number(filterOptions.state) === 0) {
        const secondDatePreviousDay = new Date(new Date(filterOptions.secondDate).getTime() - 24 * 60 * 60 * 1000);
        firstDateMaxDate = secondDatePreviousDay.toISOString().split('T')[0];
    }

    const handleSearchInput = (e) => {
        const value = e.target.value.toLowerCase();
        const searchingRooms = filteredRooms.filter((item) => {
            if (item.roomNumber.toLowerCase().includes(value)) return true;
            if (removeVietnameseTones(item.roomTypeText).toLowerCase().includes(value)) return true;
            if (String(item.price).includes(value)) return true;
            if (String(item.size).includes(value)) return true;
            if (removeVietnameseTones(item.bedDetailText).toLowerCase().includes(value)) return true;
            if (removeVietnameseTones(roomStateToString(item.state)).toLowerCase().includes(value)) return true;
            return false;
        });
        setFilteredRooms(searchingRooms);
    };

    // Get rooms
    useEffect(() => {
        sCurrentPage.set('/danh-sach-phong');

        get(
            'rooms/',
            (data) => {
                setRooms(data);
                if (viewAllRoomState === -1) setFilteredRooms(getRoomsWithEarliestDate());
                else setFilteredRooms(getFilteredRooms({ state: viewAllRoomState }));

                // if (viewAllRoomState !== -1) filterOptions.state = viewAllRoomState;
            },
            () => {
                alert('Rooms not found!');
            },
        );

        get(
            'room-types/',
            (data) => {
                roomTypes = data;
            },
            () => {
                alert('Room types not found!');
            },
        );

        get(
            'bed-details/',
            (data) => {
                bedDetails = data;
            },
            () => {
                alert('Bed details not found!');
            },
        );

        get(
            'bookings/',
            (data) => {
                setBookings(data);
            },
            () => {
                alert('Bookings not found!');
            },
        );

        setFilterOptions({ state: viewAllRoomState });
    }, []);

    useEffect(() => {
        const roomsWithEarliestDate = getRoomsWithEarliestDate();
        setRoomsWithEarliestDate(roomsWithEarliestDate);
        setFilteredRooms(roomsWithEarliestDate);
    }, [rooms, bookings]);

    useEffect(() => {
        setFilteredRooms(getFilteredRooms(filterOptions));
    }, [filterOptions]);

    return (
        <div className={cx('wrapper') + ' grid'}>
            <div className={cx('header')}>
                <div className={cx('search-wrapper')}>
                    <SearchIcon />
                    <input
                        ref={inputRef}
                        className="search-input"
                        type="text"
                        placeholder="Tìm kiếm..."
                        onInput={handleSearchInput}
                    />
                </div>
                <button
                    className={cx('remove-filter-btn')}
                    style={{
                        display:
                            filterOptions.floor ||
                            filterOptions.roomTypeId ||
                            filterOptions.bedDetailId ||
                            filterOptions.state !== -1 ||
                            inputRef?.current?.value !== ''
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
                    className={cx('filter-item', filterOptions.floor ? 'filtered' : '')}
                    onClick={handleFilterClick}
                    style={{ minWidth: '104px' }}
                >
                    {filterOptions.floor === undefined ? 'Chọn tầng' : 'Tầng ' + filterOptions.floor}
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
                    className={cx('filter-item', filterOptions.roomTypeId ? 'filtered' : '')}
                    onClick={handleFilterClick}
                    style={{ minWidth: '160px' }}
                >
                    {roomTypes.find((item) => item.id === filterOptions.roomTypeId)?.roomTypeText ?? 'Chọn hạng phòng'}
                    <CaretDownIcon className={cx('caret-down-icon')} />
                    <ul className={cx('room-type-dropdown')}>
                        {roomTypes.map((item, index) => (
                            <li key={index} name="roomTypeId" value={item.id} onClick={handleFilterOptionClick}>
                                {item.roomTypeText}
                            </li>
                        ))}
                    </ul>
                </div>
                <div
                    className={cx('filter-item', filterOptions.bedDetailId ? 'filtered' : '')}
                    onClick={handleFilterClick}
                    style={{ minWidth: '160px' }}
                >
                    {bedDetails.find((item) => item.id === Number(filterOptions.bedDetailId))?.bedDetailText ??
                        'Chi tiết giường'}
                    <CaretDownIcon className={cx('caret-down-icon')} />
                    <ul className={cx('bed-detail-dropdown')}>
                        {bedDetails.map((item, index) => (
                            <li key={index} name="bedDetailId" value={item.id} onClick={handleFilterOptionClick}>
                                {item.bedDetailText}
                            </li>
                        ))}
                    </ul>
                </div>
                <div
                    className={cx(
                        'filter-item',
                        'filter-item__room-state',
                        filterOptions.state !== -1 ? 'filtered' : '',
                    )}
                    onClick={handleFilterClick}
                    style={{ minWidth: '120px' }}
                >
                    {filterOptions.state === -1 ? 'Tình trạng' : roomStateToString(filterOptions.state)}
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

                {Number(filterOptions.state) !== -1 && (
                    <input
                        type="date"
                        max={firstDateMaxDate}
                        name="firstDate"
                        className={cx('date-input', filterOptions.firstDate ? 'filtered' : '')}
                        value={filterOptions.firstDate ? filterOptions.firstDate : ''}
                        onInput={(e) =>
                            setFilterOptions((prev) => ({ ...prev, [e.target.getAttribute('name')]: e.target.value }))
                        }
                        style={{
                            display: filterOptions.state ? 'flex' : 'none',
                        }}
                    />
                )}
                {Number(filterOptions.state) === 0 && (
                    <>
                        <span className={cx('divider')}>-</span>
                        <input
                            type="date"
                            min={secondDateMinDate}
                            name="secondDate"
                            value={filterOptions.secondDate ? filterOptions.secondDate : ''}
                            className={cx('date-input', filterOptions.secondDate ? 'filtered' : '')}
                            onInput={(e) =>
                                setFilterOptions((prev) => ({
                                    ...prev,
                                    [e.target.getAttribute('name')]: e.target.value,
                                }))
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
            {filteredRooms.map((item, index) => (
                <RoomListItem
                    key={index}
                    data={item}
                    onClick={(e) => {
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
