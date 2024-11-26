import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import RoomModal from '../../components/RoomModal';
import { sCurrentPage } from '../../layouts/DefaultLayout/Sidebar/sidebarStore';
import { get } from '../../modules/lib/httpHandle';
import styles from './home.module.scss';
import Heading from './partials/Heading';
import Room, { TYPE_ROOM_TYPE, TYPE_CHECKIN, TYPE_CHECKOUT } from './partials/Room';
import { sShowModalType } from './homeStore';

const cx = classNames.bind(styles);

var unreservedRooms = [];
var checkinRooms = [];
var checkoutRooms = [];

function Home() {
    const [roomTypes, setRoomTypes] = useState([]);
    const [rooms, setRooms] = useState([]);

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
            'rooms/',
            (data) => {
                setRooms(data);
            },
            () => {
                alert('Rooms not found!');
            },
        );
    }, []);

    rooms.forEach((item) => {
        if (item.state === 0) unreservedRooms.push(item);
        else if (item.state === 1) checkinRooms.push(item);
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
                                sShowModalType.set({
                                    type: TYPE_ROOM_TYPE,
                                    data: item,
                                });
                            }}
                        />
                    </div>
                ))}
            </div>

            <Heading label="Phòng chờ check-in" className={cx('heading')} />
            <div className="row">
                {checkinRooms.map((item, index) => (
                    <div key={index} className="col c-4 l-4 m-4">
                        <Room
                            type={TYPE_CHECKIN}
                            classNames={cx('room')}
                            data={item}
                            onClick={() => {
                                sShowModalType.set({
                                    type: TYPE_CHECKIN,
                                    data: item,
                                });
                            }}
                        />
                    </div>
                ))}
            </div>

            <Heading label="Phòng Tới Hạn" className={cx('heading')} />
            <div className="row">
                {checkoutRooms.map((item, index) => (
                    <div key={index} className="col c-4 l-4 m-4">
                        <Room
                            type={TYPE_CHECKOUT}
                            classNames={cx('room')}
                            data={item}
                            onClick={() => {
                                sShowModalType.set({
                                    type: TYPE_CHECKOUT,
                                    data: item,
                                });
                            }}
                        />
                    </div>
                ))}
            </div>

            <sShowModalType.HardWrap>
                {(value) => {
                    console.log('sShowModalType re-rendered!');
                    if (value.type === TYPE_ROOM_TYPE) {
                        return (
                            <div id={value.type} className={cx('modal')}>
                                <a href="/#" className={cx('modal-overlay')}>
                                    {' '}
                                </a>
                                <RoomModal type={value.type} className={cx('modal-body')} data={value.data} />
                            </div>
                        );
                    } else if (value.type === TYPE_CHECKIN) {
                        return (
                            <div id={value.type} className={cx('modal')}>
                                <a href="/#" className={cx('modal-overlay')}>
                                    {' '}
                                </a>
                                <RoomModal type={value.type} className={cx('modal-body')} data={value.data} />
                            </div>
                        );
                    } else if (value.type === TYPE_CHECKOUT) {
                        return (
                            <div id={value.type} className={cx('modal')}>
                                <a href="/#" className={cx('modal-overlay')}>
                                    {' '}
                                </a>
                                <RoomModal type={value.type} className={cx('modal-body')} data={value.data} />
                            </div>
                        );
                    }
                }}
            </sShowModalType.HardWrap>
        </div>
    );
}

export default Home;

// <div id={TYPE_ROOM_TYPE} className={cx('modal')}>
//     <a href="/#" className={cx('modal-overlay')}>
//         {' '}
//     </a>
//     <RoomModal type={TYPE_ROOM_TYPE} className={cx('modal-body')} />
// </div>

// <div id={TYPE_CHECKIN} className={cx('modal')}>
//     <a href="/#" className={cx('modal-overlay')}>
//         {' '}
//     </a>
//     <RoomModal type={TYPE_CHECKIN} className={cx('modal-body')} />
// </div>

// <div id={TYPE_CHECKOUT} className={cx('modal')}>
//     <a href="/#" className={cx('modal-overlay')}>
//         {' '}
//     </a>
//     <RoomModal type={TYPE_CHECKOUT} className={cx('modal-body')} />
// </div>
