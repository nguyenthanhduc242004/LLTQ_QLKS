import classNames from 'classnames/bind';
import styles from './home.module.scss';
import Heading from './partials/Heading';
import Room, { CHECKOUT_ROOM, ROOM_TYPE } from './partials/Room';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('heading')}>CÁC HẠNG PHÒNG</h2>
            <div className="grid">
                <div className="row">
                    <div className="col c-4 l-4 m-4">
                        <Room type={ROOM_TYPE} classNames={cx('room')} />
                    </div>
                    <div className="col c-4 l-4 m-4">
                        <Room type={ROOM_TYPE} classNames={cx('room')} />
                    </div>
                    <div className="col c-4 l-4 m-4">
                        <Room type={ROOM_TYPE} classNames={cx('room')} />
                    </div>
                    <div className="col c-4 l-4 m-4">
                        <Room type={ROOM_TYPE} classNames={cx('room')} />
                    </div>
                    <div className="col c-4 l-4 m-4">
                        <Room type={ROOM_TYPE} classNames={cx('room')} />
                    </div>
                </div>
            </div>

            <Heading label="Phòng Tới Hạn" className={cx('heading')} />

            <div className="grid">
                <div className="row">
                    <div className="col c-4 l-4 m-4">
                        <Room type={CHECKOUT_ROOM} classNames={cx('room')} />
                    </div>
                    <div className="col c-4 l-4 m-4">
                        <Room type={CHECKOUT_ROOM} classNames={cx('room')} />
                    </div>
                    <div className="col c-4 l-4 m-4">
                        <Room type={CHECKOUT_ROOM} classNames={cx('room')} />
                    </div>
                    <div className="col c-4 l-4 m-4">
                        <Room type={CHECKOUT_ROOM} classNames={cx('room')} />
                    </div>
                    <div className="col c-4 l-4 m-4">
                        <Room type={CHECKOUT_ROOM} classNames={cx('room')} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
