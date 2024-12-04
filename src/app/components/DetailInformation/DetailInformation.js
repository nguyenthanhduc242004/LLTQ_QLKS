import classNames from 'classnames/bind';
import styles from './GuestInformation.module.scss';

const cx = classNames.bind(styles);

function GuestInformation({ className, data = undefined, isGuestInformationEditing = false, setSubmitData }) {
    const handleChange = (e) => {
        setSubmitData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    return (
        <div className={cx('wrapper') + ' ' + className}>
            {data === undefined && (
                <>
                    <div className="row">
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>CCCD: </span>
                            <input
                                name="citizenId"
                                placeholder="Vui lòng nhập trường này"
                                type="text"
                                onChange={handleChange}
                            />
                        </div>
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Họ tên: </span>
                            <input
                                name="guestName"
                                placeholder="Vui lòng nhập trường này"
                                type="text"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Điện thoại: </span>
                            <input
                                name="phone"
                                placeholder="Vui lòng nhập trường này"
                                type="tel"
                                onChange={handleChange}
                            />
                        </div>
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Email: </span>
                            <input name="email" type="email" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Ngày sinh: </span>
                            <input name="dob" type="date" onChange={handleChange} />
                        </div>
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Giới tính: </span>
                            <select name="gender" required="" onChange={handleChange}>
                                <option value="" disabled="" defaultValue="">
                                    Chọn giới tính
                                </option>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className={cx('input-with-label') + ' col c-12 m-12 l-12'}>
                            <span>Địa chỉ: </span>
                            <input name="address" type="text" onChange={handleChange} />
                        </div>
                    </div>
                </>
            )}
            {data !== undefined && !isGuestInformationEditing && (
                <>
                    <div className="row">
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>CCCD: </span>
                            <input
                                name="citizenId"
                                onChange={handleChange}
                                type="text"
                                value={data.citizenId}
                                disabled={true}
                            />
                        </div>
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Họ tên: </span>
                            <input
                                name="guestName"
                                onChange={handleChange}
                                type="text"
                                value={data.name}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Điện thoại: </span>
                            <input name="phone" onChange={handleChange} type="tel" value={data.phone} disabled={true} />
                        </div>
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Email: </span>
                            <input
                                name="email"
                                onChange={handleChange}
                                type="email"
                                value={data.email}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Ngày sinh: </span>
                            <input name="dob" onChange={handleChange} type="date" value={data.dob} disabled={true} />
                        </div>
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Giới tính: </span>
                            <select
                                name="gender"
                                onChange={handleChange}
                                required=""
                                defaultValue={data.guestGender}
                                disabled={true}
                            >
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className={cx('input-with-label') + ' col c-12 m-12 l-12'}>
                            <span>Địa chỉ: </span>
                            <input
                                name="address"
                                onChange={handleChange}
                                type="text"
                                value={data.guestAddress}
                                disabled={true}
                            />
                        </div>
                    </div>
                </>
            )}
            {data !== undefined && isGuestInformationEditing && (
                <>
                    <div className="row">
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>CCCD: </span>
                            <input
                                placeholder="Vui lòng nhập trường này!"
                                name="citizenId"
                                onChange={handleChange}
                                type="text"
                                defaultValue={data.citizenId}
                            />
                        </div>
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Họ tên: </span>
                            <input
                                placeholder="Vui lòng nhập trường này!"
                                name="guestName"
                                onChange={handleChange}
                                type="text"
                                defaultValue={data.name}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Điện thoại: </span>
                            <input
                                placeholder="Vui lòng nhập trường này!"
                                name="phone"
                                onChange={handleChange}
                                type="tel"
                                defaultValue={data.phone}
                            />
                        </div>
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Email: </span>
                            <input name="email" onChange={handleChange} type="email" defaultValue={data.email} />
                        </div>
                    </div>
                    <div className="row">
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Ngày sinh: </span>
                            <input name="dob" onChange={handleChange} type="date" defaultValue={data.dob} />
                        </div>
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Giới tính: </span>
                            <select name="gender" onChange={handleChange} required="" defaultValue={data.guestGender}>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className={cx('input-with-label') + ' col c-12 m-12 l-12'}>
                            <span>Địa chỉ: </span>
                            <input
                                name="address"
                                onChange={handleChange}
                                type="text"
                                defaultValue={data.guestAddress}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default GuestInformation;