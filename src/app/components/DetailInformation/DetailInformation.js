import classNames from 'classnames/bind';
import styles from './DetailInformation.module.scss';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function DetailInformation({
    className,
    data = undefined,
    isEditing = false,
    submitData,
    setSubmitData,
    nameProperty = 'guestName',
}) {
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
                                value={submitData.citizenId ?? ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Họ tên: </span>
                            <input
                                name={nameProperty}
                                placeholder="Vui lòng nhập trường này"
                                type="text"
                                value={submitData[nameProperty] ?? ''}
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
                                value={submitData.phone ?? ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Email: </span>

                            <input name="email" type="email" value={submitData.email ?? ''} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Ngày sinh: </span>
                            <input name="dob" type="date" value={submitData.dob ?? ''} onChange={handleChange} />
                        </div>
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Giới tính: </span>
                            <select name="gender" required="" value={submitData.gender ?? -1} onChange={handleChange}>
                                <option value="-1" disabled="" defaultValue="">
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
                            <input
                                name="address"
                                type="text"
                                value={submitData.address ?? ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </>
            )}
            {data !== undefined && isEditing && (
                <>
                    <div className="row">
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>CCCD: </span>
                            <input
                                placeholder="Vui lòng nhập trường này"
                                name="citizenId"
                                onChange={handleChange}
                                type="text"
                                value={submitData.citizenId}
                            />
                        </div>
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Họ tên: </span>
                            <input
                                placeholder="Vui lòng nhập trường này"
                                name={nameProperty}
                                onChange={handleChange}
                                type="text"
                                value={submitData[nameProperty]}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Điện thoại: </span>
                            <input
                                placeholder="Vui lòng nhập trường này"
                                name="phone"
                                onChange={handleChange}
                                type="tel"
                                value={submitData.phone}
                            />
                        </div>
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Email: </span>
                            <input name="email" onChange={handleChange} type="email" value={submitData.email} />
                        </div>
                    </div>
                    <div className="row">
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Ngày sinh: </span>
                            <input name="dob" onChange={handleChange} type="date" value={submitData.dob} />
                        </div>
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Giới tính: </span>
                            <select name="gender" onChange={handleChange} required="" value={submitData.guestGender}>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className={cx('input-with-label') + ' col c-12 m-12 l-12'}>
                            <span>Địa chỉ: </span>
                            <input name="address" onChange={handleChange} type="text" value={submitData.guestAddress} />
                        </div>
                    </div>
                </>
            )}
            {data !== undefined && !isEditing && (
                <>
                    <div className="row">
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>CCCD: </span>
                            <input
                                name="citizenId"
                                onChange={handleChange}
                                type="text"
                                value={submitData.citizenId}
                                disabled={true}
                            />
                        </div>
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Họ tên: </span>
                            <input
                                placeholder="Vui lòng nhập trường này"
                                name={nameProperty}
                                onChange={handleChange}
                                type="text"
                                /*value={data.guestName}
                                disabled={true}*/
                                value={submitData[nameProperty]}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Điện thoại: </span>
                           
                            <input
                                placeholder="Vui lòng nhập trường này"
                                name="phone"
                                onChange={handleChange}
                                type="tel"
                                value={submitData.phone}
                                
                            />
                        </div>
                    </div>
                    <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Email: </span>
                            <input name="email" onChange={handleChange} type="email" value={submitData.email} />
                        </div>
                    <div className="row">
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Ngày sinh: </span>
                            <input name="dob" onChange={handleChange} type="date" value={data.dob}  />
                        </div>
                        <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                            <span>Giới tính: </span>
                            <select name="gender" onChange={handleChange} required="" value={submitData.guestGender}>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className={cx('input-with-label') + ' col c-12 m-12 l-12'}>
                            <span>Địa chỉ: </span>
                            <input name="address" onChange={handleChange} type="text" value={submitData.guestAddress} />
                        </div>
                    </div>
                </>
            )}
            {data !== undefined && !isEditing && (
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
                                name={nameProperty}
                                onChange={handleChange}
                                type="text"
                                value={data[nameProperty]}
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
                                value={data.guestGender}
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
        </div>
    );
}

export default DetailInformation;
