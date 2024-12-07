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
                    alert('ADDING A ROOM!');
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
                alert('UPDATING A ROOM!');
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
                alert('DELETING A ROOM!');
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
        <div className={cx('wrapper') + ' grid'}>
            <h2 className={cx('heading')}>Quản Lý Hạng Phòng</h2>
            <sSubmitData.Wrap>
                {(value) => (
                    <div className={cx('input-wrapper')}>
                        <label>Số phòng: </label>
                        <input value={value.roomNumber ?? ''} name="roomNumber" onChange={handleChange} />
                        <br />
                        <label>Tầng: </label>
                        <input value={value.floor ?? ''} name="floor" onChange={handleChange} />
                        <br />
                        <label>Hạng phòng: </label>
                        <select value={value.roomTypeId ?? '-1'} name="roomTypeId" onChange={handleChange}>
                            <option value={-1}>Chọn hạng phòng</option>
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
                        <th>Số phòng</th>
                        <th>Tầng</th>
                        <th>Hạng phòng</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((item) => {
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
                                <td name="roomNumber">{item.roomNumber}</td>
                                <td name="floor">{item.floor}</td>
                                <td name="roomTypeText" data-id={item.roomTypeId}>
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
