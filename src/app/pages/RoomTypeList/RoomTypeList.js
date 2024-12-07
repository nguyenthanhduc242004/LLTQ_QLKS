import classNames from 'classnames/bind';
import styles from './roomTypeList.module.scss';
import { useEffect, useRef, useState } from 'react';
import { get } from '../../modules/lib/httpHandle';
import { sCurrentPage } from '../../layouts/DefaultLayout/Sidebar/sidebarStore';
import Swal from 'sweetalert2';
import { signify } from 'react-signify';
import { BE_ENDPOINT } from '../../../settings/localVar';

const cx = classNames.bind(styles);

var bedDetails = [];

const sSubmitData = signify({});

function RoomTypeList() {
    const [roomTypes, setRoomTypes] = useState([]);
    const [isUpdating, setUpdating] = useState(false);
    const refCurrentRoomTypeId = useRef();

    // const handleWindowClick = () => {
    //     setUpdating(false);
    // };

    useEffect(() => {
        sCurrentPage.set('/loai-phong');

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
            'bed-details/',
            (data) => {
                bedDetails = data;
            },
            () => {
                alert('Bed details not found!');
            },
        );

        // window.addEventListener('click', handleWindowClick);
        // return () => {
        //     window.removeEventListener('click', handleWindowClick);
        // };
    }, []);

    const handleChange = (e) => {
        sSubmitData.set({ ...sSubmitData.value, [e.target.name]: e.target.value });
    };

    const handleUpdate = (e) => {
        setUpdating(true);
        const tableRow = e.target.closest('tr');
        refCurrentRoomTypeId.current = tableRow.getAttribute('data-id');
        sSubmitData.set({
            roomTypeText: tableRow.querySelector('td[name="roomTypeText"]').innerText,
            size: tableRow.querySelector('td[name="size"]').innerText,
            bedDetailId: tableRow.querySelector('td[name="bedDetailText"]').getAttribute('data-id'),
            price: tableRow.querySelector('td[name="price"]').innerText,
        });
    };

    const handleAdd = () => {
        if (
            sSubmitData.value.roomTypeText &&
            sSubmitData.value.size &&
            sSubmitData.value.bedDetailId &&
            sSubmitData.value.price
        ) {
            Swal.fire({
                title: 'Bạn có chắc muốn thêm không?',
                showDenyButton: true,
                confirmButtonText: 'Có',
                cancelButtonText: 'Không',
                icon: 'info',
            }).then(async function (result) {
                if (result.isConfirmed) {
                    const response = await fetch(BE_ENDPOINT + 'room-types/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'Application/json',
                        },
                        body: JSON.stringify(sSubmitData.value),
                    });
                    if (!response.ok) {
                        alert('Fail');
                        return;
                    }

                    alert('ADDING A ROOM TYPE!');
                    console.log(sSubmitData.value);
                    Swal.fire('Thêm hạng phòng thành công!', '', 'success');
                    setUpdating(false);
                    sSubmitData.set({});
                    get(
                        'room-types/',
                        (data) => {
                            setRoomTypes(data);
                        },
                        () => {
                            alert('Room types not found!');
                        },
                    );
                } else {
                }
            });
        } else {
            Swal.fire({
                title: 'Vui lòng nhập đầy đủ thông tin!',
                icon: 'warning',
            });
        }
    };
    const handleUpdateSubmit = () => {
        Swal.fire({
            title: 'Bạn có muốn lưu thay đổi không?',
            showDenyButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
            icon: 'info',
        }).then(async function (result) {
            const updateURL = BE_ENDPOINT + 'room-types/update/' + refCurrentRoomTypeId.current;

            const response = await fetch(updateURL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'Application/json',
                },
                body: JSON.stringify(sSubmitData.value),
            });
            if (!response.ok) {
                alert('Fail');
                return;
            }
            const responseData = await response.json();
            console.log(responseData);
            if (result.isConfirmed) {
                alert('UPDATING A ROOM TYPE!');
                console.log(refCurrentRoomTypeId.current, sSubmitData.value);
                Swal.fire('Sửa hạng phòng thành công!', '', 'success');
                get(
                    'room-types/',
                    (data) => {
                        setRoomTypes(data);
                    },
                    () => {
                        alert('Room types not found!');
                    },
                );
            } else {
                setUpdating(true);
            }
        });
    };

    const handleDelete = (e) => {
        Swal.fire({
            title: 'Bạn có chắc muốn xóa không?',
            showDenyButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
            icon: 'info',
        }).then(async function (result) {
            const deleteURL = BE_ENDPOINT + 'room-types/delete/' + e.target.closest('tr').getAttribute('data-id');
            const response = await fetch(deleteURL, {
                method: 'DELETE',
                header: {
                    'Content-Type': 'Plain/text',
                },
            });
            if (!response.ok) {
                alert('Fail');
                return;
            }
            const responseData = await response.text();
            console.log(responseData);
            if (result.isConfirmed) {
                alert('DELETING A ROOM TYPE!');
                Swal.fire('Xóa hạng phòng thành công!', '', 'success');
                console.log(e.target.closest('tr').getAttribute('data-id'));
                setUpdating(false);
                sSubmitData.set({});
                get(
                    'room-types/',
                    (data) => {
                        setRoomTypes(data);
                    },
                    () => {
                        alert('Room types not found!');
                    },
                );
            } else {
            }
        });
    };

    /*return (
        <div className={cx('wrapper') + ' grid'}>
            <h2 className={cx('heading')}>Quản Lý Hạng Phòng</h2>
            <sSubmitData.Wrap>
                {(value) => (
                    <div className={cx('input-wrapper')}>
                        <label>Tên hạng phòng: </label>
                        <input value={value.roomTypeText ?? ''} name="roomTypeText" onChange={handleChange} />
                        <br />
                        <label>Kích thước: </label>
                        <input value={value.size ?? ''} name="size" onChange={handleChange} />
                        <br />
                        <label>Chi tiết giường: </label>
                        <select value={value.bedDetailId ?? '-1'} name="bedDetailId" onChange={handleChange}>
                            <option value={-1}>Chọn chi tiết giường</option>
                            {bedDetails.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.bedDetailText}
                                </option>
                            ))}
                        </select>
                        <br />
                        <label>Giá phòng: </label>
                        <input value={value.price ?? ''} name="price" onChange={handleChange} />
                        <br />
                    </div>
                )}
            </sSubmitData.Wrap>
            <div className={cx('btn-wrapper')}>
                {!isUpdating && (
                    <button className={cx('btn')} onClick={handleAdd}>
                        Thêm
                    </button>
                )}
                {isUpdating && (
                    <>
                        <button className={cx('btn')} onClick={handleUpdateSubmit}>
                            Xác nhận
                        </button>
                        <button
                            className={cx('btn')}
                            onClick={() => {
                                setUpdating(false);
                                sSubmitData.set({});
                            }}
                        >
                            Hủy
                        </button>
                    </>
                )}
            </div>
            <table
                border={1}
                style={{
                    margin: 'auto',
                    marginTop: '12px',
                }}
            >
                <thead>
                    <tr>
                        <td></td>
                        <td></td>
                        <th>Tên hạng phòng</th>
                        <th>Kích thước</th>
                        <th>Chi tiết giường</th>
                        <th>Giá phòng</th>
                    </tr>
                </thead>
                <tbody>
                    {roomTypes.map((item) => {
                        return (
                            <tr key={item.id} data-id={item.id}>
                                <td>
                                    <button className={cx('btn')} onClick={handleDelete}>
                                        Xóa
                                    </button>
                                </td>
                                <td>
                                    <button className={cx('btn')} onClick={handleUpdate}>
                                        Sửa
                                    </button>
                                </td>
                                <td name="roomTypeText">{item.roomTypeText}</td>
                                <td name="size">{item.size}</td>
                                <td name="bedDetailText" data-id={item.bedDetailId}>
                                    {item.bedDetailText}
                                </td>
                                <td name="price">{item.price}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );*/
    return (
        <div
            className={cx('wrapper') + ' grid'}
            style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px' }}
        >
            <h2
                className={cx('heading')}
                style={{
                    color: 'rgb(255,99,107)',
                    textAlign: 'center',
                    fontSize: '24px',
                    marginBottom: '20px',
                }}
            >
                Quản Lý Hạng Phòng
            </h2>
            <sSubmitData.Wrap>
                {(value) => (
                    <div className={cx('input-wrapper')} style={{ marginBottom: '20px' }}>
                        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Tên hạng phòng: </label>
                        <input
                            value={value.roomTypeText ?? ''}
                            name="roomTypeText"
                            onChange={handleChange}
                            style={{
                                padding: '5px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                marginBottom: '10px',
                            }}
                        />
                        <br />
                        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Kích thước: </label>
                        <input
                            value={value.size ?? ''}
                            name="size"
                            onChange={handleChange}
                            style={{
                                padding: '5px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                marginBottom: '10px',
                            }}
                        />
                        <br />
                        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Chi tiết giường: </label>
                        <select
                            value={value.bedDetailId ?? '-1'}
                            name="bedDetailId"
                            onChange={handleChange}
                            style={{
                                padding: '5px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                marginBottom: '10px',
                            }}
                        >
                            <option value={-1}>Chọn chi tiết giường</option>
                            {bedDetails.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.bedDetailText}
                                </option>
                            ))}
                        </select>
                        <br />
                        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Giá phòng: </label>
                        <input
                            value={value.price ?? ''}
                            name="price"
                            onChange={handleChange}
                            style={{
    padding: '5px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                marginBottom: '10px',
                            }}
                        />
                        <br />
                    </div>
                )}
            </sSubmitData.Wrap>
            <div className={cx('btn-wrapper')} style={{ textAlign: 'center', marginTop: '20px' }}>
                {!isUpdating && (
                    <button
                        className={cx('btn')}
                        onClick={handleAdd}
                        style={{
                            backgroundColor: 'rgb(255,99,107)',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Thêm
                    </button>
                )}
                {isUpdating && (
                    <>
                        <button
                            className={cx('btn')}
                            onClick={handleUpdateSubmit}
                            style={{
                                backgroundColor: '#007BFF',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                marginRight: '10px',
                            }}
                        >
                            Xác nhận
                        </button>
                        <button
                            className={cx('btn')}
                            onClick={() => {
                                setUpdating(false);
                                sSubmitData.set({});
                            }}
                            style={{
                                backgroundColor: '#FF4136',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            Hủy
                        </button>
                    </>
                )}
            </div>
            <table
                border={1}
                style={{
                    margin: 'auto',
                    marginTop: '12px',
                    borderCollapse: 'collapse',
                    width: '80%',
                }}
            >
                <thead>
                    <tr style={{ backgroundColor: 'rgb(255,77,109)', textAlign: 'center', color: 'White' }}>
                        <td style={{ padding: '10px' }}> </td>
                        <td style={{ padding: '10px' }}> </td>
                        <th style={{ padding: '10px' }}>Tên hạng phòng</th>
                        <th style={{ padding: '10px' }}>Kích thước</th>
                        <th style={{ padding: '10px' }}>Chi tiết giường</th>
    <th style={{ padding: '10px' }}>Giá phòng</th>
                    </tr>
                </thead>
                <tbody>
                    {roomTypes.map((item) => {
                        return (
                            <tr key={item.id} data-id={item.id} style={{ textAlign: 'center' }}>
                                <td style={{ padding: '10px' }}>
                                    <button
                                        className={cx('btn')}
                                        onClick={handleDelete}
                                        style={{
                                            backgroundColor: '#FF4136',
                                            color: 'white',
                                            border: 'none',
                                            padding: '5px 10px',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Xóa
                                    </button>
                                </td>
                                <td style={{ padding: '10px' }}>
                                    <button
                                        className={cx('btn')}
                                        onClick={handleUpdate}
                                        style={{
                                            backgroundColor: '#007BFF',
                                            color: 'white',
                                            border: 'none',
                                            padding: '5px 10px',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Sửa
                                    </button>
                                </td>
                                <td name="roomTypeText" style={{ padding: '10px' }}>
                                    {item.roomTypeText}
                                </td>
                                <td name="size" style={{ padding: '10px' }}>
                                    {item.size}
                                </td>
                                <td
                                    name="bedDetailText"
                                    data-id={item.bedDetailId}
                                    style={{ padding: '10px' }}
                                >
                                    {item.bedDetailText}
                                </td>
                                <td name="price" style={{ padding: '10px' }}>
                                    {item.price}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default RoomTypeList;
