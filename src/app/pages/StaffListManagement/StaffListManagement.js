import classNames from 'classnames/bind';
import styles from './staffListManagement.module.scss';
import { useEffect, useRef, useState } from 'react';
import { get } from '../../modules/lib/httpHandle';
import { sCurrentPage } from '../../layouts/DefaultLayout/Sidebar/sidebarStore';
import Swal from 'sweetalert2';
import { signify } from 'react-signify';
import { BE_ENDPOINT } from '../../../settings/localVar';

const cx = classNames.bind(styles);

var staffTypes = [];

const sSubmitData = signify({});

function StaffListManagement() {
    const [staffs, setStaffs] = useState([]);
    const [isUpdating, setUpdating] = useState(false);
    const refCurrentStaffId = useRef();

    useEffect(() => {
        sCurrentPage.set('/quan-ly-nhan-vien');

        get(
            'staffs/',
            (data) => {
                setStaffs(data);
            },
            () => {
                alert('Staffs not found!');
            },
        );

        get(
            'staff-types/',
            (data) => {
                staffTypes = data;
            },
            () => {
                alert('Staff types not found!');
            },
        );
    }, []);

    const handleChange = (e) => {
        sSubmitData.set({ ...sSubmitData.value, [e.target.name]: e.target.value });
    };

    const handleUpdate = (e) => {
    };

    const handleAdd = () => {
        if (sSubmitData.value.citizenId && sSubmitData.value.name && sSubmitData.value.phone && sSubmitData.value.email && sSubmitData.value.dob && sSubmitData.value.gender && sSubmitData.value.address && sSubmitData.value.staffTypeId) {
            Swal.fire({
                title: 'Bạn có chắc muốn thêm không?',
                showDenyButton: true,
                confirmButtonText: 'Có',
                cancelButtonText: 'Không',
                icon: 'info',
            }).then(async function (result)  {
                const response= await fetch(BE_ENDPOINT+"staffs/create",{
                    method:"POST",
                    headers:{
                        "Content-Type":"Application/json"
                    },
                    body:JSON.stringify({...sSubmitData.value, createdDate: new Date()})
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
                    Swal.fire('Thêm nhân viên thành công!', '', 'success');
                    setUpdating(false);
                    sSubmitData.set({});
                    get(
                        'staffs/',
                        (data) => {
                            setStaffs(data);
                        },
                        () => {
                            alert('Staffs not found!');
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
            const updateURL= BE_ENDPOINT+"staffs/update/"+refCurrentStaffId.current;
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
                console.log(refCurrentStaffId.current, sSubmitData.value);
                Swal.fire('Sửa nhân viên thành công!', '', 'success');
                get(
                    'staffs/',
                    (data) => {
                        setStaffs(data);
                    },
                    () => {
                        alert('Staffs not found!');
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
            const deleteURL= BE_ENDPOINT+"staffs/delete/"+e.target.closest('tr').getAttribute('data-id');
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
                Swal.fire('Xóa nhân viên thành công!', '', 'success');
                console.log(e.target.closest('tr').getAttribute('data-id'));
                setUpdating(false);
                sSubmitData.set({});
                get(
                    'staffs/',
                    (data) => {
                        setStaffs(data);
                    },
                    () => {
                        alert('Staffs not found!');
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
                Quản Lý Nhân Viên
            </h2>
            <sSubmitData.Wrap>
                {(value) => (
                    <div className={cx('input-wrapper')} style={{ marginBottom: '20px' }}>
                        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>CCCD: </label>
                        <input
                            value={value.citizenId ?? ''}
                            name="citizenId"
                            onChange={handleChange}
                            style={{
                                padding: '5px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                marginBottom: '10px',
                            }}
                        />
                        <br />
                        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Họ tên: </label>
                        <input
                            value={value.name ?? ''}
                            name="name"
                            onChange={handleChange}
                            style={{
                                padding: '5px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                marginBottom: '10px',
                            }}
                        />
                        <br />
                        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Điện thoại: </label>
                        <input
                            value={value.phone ?? ''}
                            name="phone"
                            onChange={handleChange}
                            style={{
                                padding: '5px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                marginBottom: '10px',
                            }}
                        />
                        <br />
                        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Email: </label>
                        <input
                            value={value.email ?? ''}
                            name="email"
                            onChange={handleChange}
                            style={{
                                padding: '5px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                marginBottom: '10px',
                            }}
                        />
                        <br />
                        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Ngày sinh: </label>
                        <input
                            value={value.dob ?? ''}
                            name="dob"
                            type="date"
                            onChange={handleChange}
                            style={{
                                padding: '5px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                marginBottom: '10px',
                            }}
                        />
                        <br />
                        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Giới tính: </label>
                        <select
                            value={value.gender ?? '-1'}
                            name="gender"
                            onChange={handleChange}
                            style={{
                                padding: '5px',
                                marginBottom: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                            }}
                        >
                            <option disabled value={-1}>Chọn giới tính</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                        </select>
                        <br />
                        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Địa chỉ: </label>
                        <input
                            value={value.address ?? ''}
                            name="address"
                            onChange={handleChange}
                            style={{
                                padding: '5px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                marginBottom: '10px',
                            }}
                        />
                        <br />
                        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Loại nhân viên: </label>
                        <select
                            value={value.staffTypeId ?? '-1'}
                            name="staffTypeId"
                            onChange={handleChange}
                            style={{
                                padding: '5px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                            }}
                        >
                            <option disabled value={-1}>Chọn loại nhân viên</option>
                            {staffTypes.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.staffTypeText}
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
                        <th style={{ padding: '10px' }}>Họ tên</th>
                        <th style={{ padding: '10px' }}>Giới tính</th>
                        <th style={{ padding: '10px' }}>Điện thoại</th>
                        <th style={{ padding: '10px' }}>Email</th>
                        <th style={{ padding: '10px' }}>Loại nhân viên</th>
                    </tr>
                </thead>
                <tbody>
                    {staffs.map((item) => {
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
                                        onClick={(e) => {
                                            
                                            setUpdating(true);
                                            sSubmitData.set(item)
                                            console.log(item)
                                            refCurrentStaffId.current = item.id;
                                        }}
                                        data={item}
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
                                <td name="name" style={{ padding: '10px' }}>
                                    {item.name}
                                </td>
                                <td name="gender" value={item.gender} style={{ padding: '10px' }}>
                                    {item.gender === "male" ? "Nam" : "Nữ"}
                                </td>
                                <td name="phone" style={{ padding: '10px' }}>
                                    {item.phone}
                                </td>
                                <td name="email" style={{ padding: '10px' }}>
                                    {item.email}
                                </td>
                                <td name="staffTypeId" value={item.staffTypeId} style={{ padding: '10px' }}>
                                    {item.staffTypeText}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
    
    
}

export default StaffListManagement;
