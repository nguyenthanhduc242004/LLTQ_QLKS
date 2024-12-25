import classNames from 'classnames/bind';
import styles from './roomListManagement.module.scss';
import { useEffect, useRef, useState } from 'react';
import { get } from '../../modules/lib/httpHandle';
import { sCurrentPage } from '../../layouts/DefaultLayout/Sidebar/sidebarStore';
import Swal from 'sweetalert2';
import { signify } from 'react-signify';
import { BE_ENDPOINT } from '../../../settings/localVar';

const cx = classNames.bind(styles);

var roomTypes = [];

const sSubmitData = signify({});

function RoomTypeList() {
    const [rooms, setRooms] = useState([]);
    const [isUpdating, setUpdating] = useState(false);
    const refCurrentRoomId = useRef();

    useEffect(() => {
        sCurrentPage.set('/quan-ly-phong');

        get(
            'rooms/',
            (data) => {
                setRooms(data);
            },
            () => {
                alert('Room not found!');
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
    }, []);

    const handleChange = (e) => {
        sSubmitData.set({ ...sSubmitData.value, [e.target.name]: e.target.value });
    };

    const handleUpdate = (e) => {
        setUpdating(true);
        const tableRow = e.target.closest('tr');
        refCurrentRoomId.current = tableRow.getAttribute('data-id');
        sSubmitData.set({
            roomNumber: tableRow.querySelector('td[name="roomNumber"]').innerText,
            floor: tableRow.querySelector('td[name="floor"]').innerText,
            roomTypeId: tableRow.querySelector('td[name="roomTypeText"]').getAttribute('data-id'),
        });
    };

    const handleAdd = () => {
        if (sSubmitData.value.roomNumber && sSubmitData.value.floor && sSubmitData.value.roomTypeId) {
            Swal.fire({
                title: 'Bạn có chắc muốn thêm không?',
                showDenyButton: true,
                confirmButtonText: 'Có',
                cancelButtonText: 'Không',
                icon: 'info',
            }).then(async function (result)  {
                const response= await fetch(BE_ENDPOINT+"rooms/create",{
                    method:"POST",
                    headers:{
                        "Content-Type":"Application/json"
                    },
                    body:JSON.stringify(sSubmitData.value)
                });
                if(!response.ok)
                {
                    alert("Fail");
                    return;
                } 
                const responseData= await response.json();
                console.log(responseData);
                if (result.isConfirmed) {
                    console.log(sSubmitData.value);
                    Swal.fire('Thêm phòng thành công!', '', 'success');
                    setUpdating(false);
                    sSubmitData.set({});
                    get(
                        'rooms/',
                        (data) => {
                            setRooms(data);
                        },
                        () => {
                            alert('Room not found!');
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
        }).then(async function(result)  {
            const updateURL= BE_ENDPOINT+"rooms/update/"+refCurrentRoomId.current;
            const response= await fetch(updateURL, {
                method:"PUT",
                headers:{
                    "Content-Type":"Application/json"
                },
                body:JSON.stringify(sSubmitData.value)
            });
            if(!response.ok)
            {
                alert("Fail");
                return;
            }
            const responseData= await response.json();
            console.log(responseData);
            if (result.isConfirmed) {
                console.log(refCurrentRoomId.current, sSubmitData.value);
                Swal.fire('Sửa phòng thành công!', '', 'success');
                get(
                    'rooms/',
                    (data) => {
                        setRooms(data);
                    },
                    () => {
                        alert('Room not found!');
                    },
                );
                setUpdating(false)
                sSubmitData.set({})
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
        }).then(async function(result)  {
            const deleteURL= BE_ENDPOINT+"rooms/delete/"+e.target.closest('tr').getAttribute('data-id');
            const response = await fetch(deleteURL, {
                method:"DELETE",
                header:{
                    "Content-Type":"Plain/text"
                }
            });
            if(!response.ok)
            {
                alert("Fail");
                return;
            } 
            const responseData= await response.text();
            console.log(responseData);
            if (result.isConfirmed) {
                Swal.fire('Xóa phòng thành công!', '', 'success');
                console.log(e.target.closest('tr').getAttribute('data-id'));
                setUpdating(false);
                sSubmitData.set({});
                get(
                    'rooms/',
                    (data) => {
                        setRooms(data);
                    },
                    () => {
                        alert('Room not found!');
                    },
                );
            } else {
            }
        });
    };

    return (
        <div
            className={cx('wrapper') + ' grid'}
            style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px' }}
        >
            <h2
                className={cx('heading')}
                style={{ color: "rgb(255,77,109)", textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}
            >
                Quản Lý Phòng
            </h2>
            <sSubmitData.Wrap>
                {(value) => (
                    <div className={cx('input-wrapper')} style={{ marginBottom: '20px' }}>
                        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Số phòng: </label>
                        <input
                            value={value.roomNumber ?? ''}
                            name="roomNumber"
                            onChange={handleChange}
                            style={{
                                padding: '5px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                marginBottom: '10px',
                            }}
                        />
                        <br />
                        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Tầng: </label>
                        <input
                            value={value.floor ?? ''}
                            name="floor"
                            onChange={handleChange}
                            style={{
                                padding: '5px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                marginBottom: '10px',
                            }}
                        />
                        <br />
                        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Hạng phòng: </label>
                        <select
                            value={value.roomTypeId ?? '-1'}
                            name="roomTypeId"
                            onChange={handleChange}
                            style={{
                                padding: '5px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                            }}
                        >
                            <option value={-1} disabled>Chọn hạng phòng</option>
                            {roomTypes.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.roomTypeText}
                                </option>
                            ))}
                        </select>
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
                            backgroundColor: 'rgb(255,77,109)',
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
                                backgroundColor: 'rgb(255,77,109)',
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
                    <tr style={{ backgroundColor: 'rgb(255,77,109)', textAlign: 'center' }}>
                        <td style={{ padding: '10px' }}> </td>
                        <td style={{ padding: '10px' }}> </td>
                        <th style={{ padding: '10px' }}>Số phòng</th>
                        <th style={{ padding: '10px' }}>Tầng</th>
                        <th style={{ padding: '10px' }}>Hạng phòng</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((item) => {
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
                                <td name="roomNumber" style={{ padding: '10px' }}>
                                    {item.roomNumber}
                                </td>
                                <td name="floor" style={{ padding: '10px' }}>
                                    {item.floor}
                                </td>
                                <td
                                    name="roomTypeText"
                                    data-id={item.roomTypeId}
                                    style={{ padding: '10px' }}
                                >
                                    {item.roomTypeText}
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
