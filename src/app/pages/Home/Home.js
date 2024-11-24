import classNames from 'classnames/bind';
import RoomModal from '../../components/RoomModal';
import styles from './home.module.scss';
import Heading from './partials/Heading';
import Room, { TYPE_CHECKIN, TYPE_CHECKOUT, TYPE_ROOM_TYPE } from './partials/Room';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper') + ' grid'}>
            <h2 className={cx('heading')}>Các hạng phòng</h2>
            <div className="row">
                <div className="col c-4 l-4 m-4">
                    <Room type={TYPE_ROOM_TYPE} classNames={cx('room')} />
                </div>
                <div className="col c-4 l-4 m-4">
                    <Room type={TYPE_ROOM_TYPE} classNames={cx('room')} />
                </div>
                <div className="col c-4 l-4 m-4">
                    <Room type={TYPE_ROOM_TYPE} classNames={cx('room')} />
                </div>
                <div className="col c-4 l-4 m-4">
                    <Room type={TYPE_ROOM_TYPE} classNames={cx('room')} />
                </div>
                <div className="col c-4 l-4 m-4">
                    <Room type={TYPE_ROOM_TYPE} classNames={cx('room')} />
                </div>
            </div>
            <div id={TYPE_ROOM_TYPE} className={cx('modal')}>
                <a href="/#" className={cx('modal-overlay')}>
                    {' '}
                </a>
                <RoomModal type={TYPE_ROOM_TYPE} className={cx('modal-body')} />
            </div>

            <Heading label="Phòng chờ check-in" className={cx('heading')} />
            <div className="row">
                <div className="col c-4 l-4 m-4">
                    <Room type={TYPE_CHECKIN} classNames={cx('room')} />
                </div>
                <div className="col c-4 l-4 m-4">
                    <Room type={TYPE_CHECKIN} classNames={cx('room')} />
                </div>
                <div className="col c-4 l-4 m-4">
                    <Room type={TYPE_CHECKIN} classNames={cx('room')} />
                </div>
                <div className="col c-4 l-4 m-4">
                    <Room type={TYPE_CHECKIN} classNames={cx('room')} />
                </div>
                <div className="col c-4 l-4 m-4">
                    <Room type={TYPE_CHECKIN} classNames={cx('room')} />
                </div>
            </div>
            <div id={TYPE_CHECKIN} className={cx('modal')}>
                <a href="/#" className={cx('modal-overlay')}>
                    {' '}
                </a>
                <RoomModal type={TYPE_CHECKIN} className={cx('modal-body')} />
            </div>

            <Heading label="Phòng Tới Hạn" className={cx('heading')} />
            <div className="row">
                <div className="col c-4 l-4 m-4">
                    <Room type={TYPE_CHECKOUT} classNames={cx('room')} />
                </div>
                <div className="col c-4 l-4 m-4">
                    <Room type={TYPE_CHECKOUT} classNames={cx('room')} />
                </div>
                <div className="col c-4 l-4 m-4">
                    <Room type={TYPE_CHECKOUT} classNames={cx('room')} />
                </div>
                <div className="col c-4 l-4 m-4">
                    <Room type={TYPE_CHECKOUT} classNames={cx('room')} />
                </div>
                <div className="col c-4 l-4 m-4">
                    <Room type={TYPE_CHECKOUT} classNames={cx('room')} />
                </div>
            </div>
            <div id={TYPE_CHECKOUT} className={cx('modal')}>
                <a href="/#" className={cx('modal-overlay')}>
                    {' '}
                </a>
                <RoomModal type={TYPE_CHECKOUT} className={cx('modal-body')} />
            </div>
        </div>
    );
}

export default Home;
