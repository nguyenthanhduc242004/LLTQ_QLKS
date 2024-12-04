import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomModal from '../../components/RoomModal';
import { sCurrentPage } from '../../layouts/DefaultLayout/Sidebar/sidebarStore';
import { get } from '../../modules/lib/httpHandle';
import '../../styles/modal.scss';
import styles from './home.module.scss';
import { sShowModal } from './homeStore';
import Heading from './partials/Heading';
import Room, { TYPE_CHECKIN, TYPE_CHECKOUT, TYPE_ROOM_TYPE } from './partials/Room';

const cx = classNames.bind(styles);

function Home() {
    const [roomTypes, setRoomTypes] = useState([]);
    const [bookings, setBookings] = useState([]);

    const navigate = useNavigate();
    const handleViewAllClick = (e) => {
        const state = e.target.closest('.' + cx('heading')).getAttribute('state');
        // localStorage.setItem('showAllRoomState', state);
        navigate('/danh-sach-phong', { state });
    };

    useEffect(() => {
        sCurrentPage.set('/');

        get(
            'room-types/',
            (data) => {
                setRoomTypes(data);
            },
            () => {
                alert('Room types not found!');
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
    }, []);

    var checkinRooms = [];
    var checkoutRooms = [];

    bookings.forEach((item) => {
        if (item.state === 1) checkinRooms.push(item);
        else if (item.state === 2) checkoutRooms.push(item);
    });

    return (
        <div className={cx('wrapper') + ' grid'}>
            {console.log('re-rendered!')}
            <h2 className={cx('heading')}>Các hạng phòng</h2>
            <div className="row">
                {roomTypes.map((item, index) => (
                    <div key={index} className="col c-4 l-4 m-4">
                        <Room
                            type={TYPE_ROOM_TYPE}
                            classNames={cx('room')}
                            data={item}
                            onClick={() => {
                                sShowModal.set({
                                    type: TYPE_ROOM_TYPE,
                                    data: item,
                                });
                            }}
                        />
                    </div>
                ))}
            </div>

            <Heading label="Phòng chờ check-in" state="1" className={cx('heading')} onClick={handleViewAllClick} />
            <div className="row">
                {checkinRooms.map((item, index) => (
                    <div key={index} className="col c-4 l-4 m-4">
                        <Room
                            type={TYPE_CHECKIN}
                            classNames={cx('room')}
                            data={item}
                            onClick={(e) => {
                                sShowModal.set({
                                    type: TYPE_CHECKIN,
                                    data: item,
                                });
                            }}
                        />
                    </div>
                ))}
            </div>

            <Heading label="Phòng Tới Hạn" state="2" className={cx('heading')} onClick={handleViewAllClick} />
            <div className="row">
                {checkoutRooms.map((item, index) => (
                    <div key={index} className="col c-4 l-4 m-4">
                        <Room
                            type={TYPE_CHECKOUT}
                            classNames={cx('room')}
                            data={item}
                            onClick={(e) => { 
                                
                                sShowModal.set({
                                    type: TYPE_CHECKOUT,
                                    data: item 
                                    
                                });
                            }}
                        />
                    </div>
                ))}
            </div>

            <sShowModal.HardWrap>
                {(value) => {
                    console.log('sShowModal re-rendered!');
                    if (value.type === TYPE_ROOM_TYPE) {
                        return (
                            <div id={value.type} className="modal">
                                <a href="/#" className="modal-overlay">
                                    {' '}
                                </a>
                                <RoomModal type={value.type} className="modal-body" data={value.data} />
                            </div>
                        );
                    } else if (value.type === TYPE_CHECKIN) {
                        return (
                            <div id={value.type} className="modal">
                                <a href="/#" className="modal-overlay">
                                    {' '}
                                </a>
                                <RoomModal type={value.type} className="modal-body" data={value.data} />
                            </div>
                        );
                    } else if (value.type === TYPE_CHECKOUT) {
                        return (
                            <div id={value.type} className="modal">
                                <a href="/#" className="modal-overlay">
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

export default Home;
