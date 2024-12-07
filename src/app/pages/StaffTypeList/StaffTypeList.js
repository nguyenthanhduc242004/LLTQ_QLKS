import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { sCurrentPage } from '../../layouts/DefaultLayout/Sidebar/sidebarStore';
import { get } from '../../modules/lib/httpHandle';
import styles from './staffTypeList.module.scss';
import { BE_ENDPOINT } from '../../../settings/localVar';

const cx = classNames.bind(styles);

function StaffTypeList() {
    const [staffTypes, setStaffTypes] = useState([]);
    const refInput = useRef();
    const [isUpdating, setUpdating] = useState(false);

    useEffect(() => {
        sCurrentPage.set('/loai-nhan-vien');

        get(
            'staff-types/',
            (data) => {
                setStaffTypes(data);
            },
            () => {
                alert('Staff types not found!');
            },
        );
    }, []);

    const refCurrentStaffTypeId = useRef();
    const handleUpdate = (e) => {
        setUpdating(true);
        refInput.current.value = e.target.closest('tr').querySelector('td[name="staffTypeText"]').innerText;
        refCurrentStaffTypeId.current = e.target.closest('tr').getAttribute('data-id');
    };

    const handleAdd = () => {
        if (!!refInput.current.value) {
            Swal.fire({
                title: 'Bạn có chắc muốn thêm không?',
                showDenyButton: true,
                confirmButtonText: 'Có',
                cancelButtonText: 'Không',
                icon: 'info',
            }).then(async function (result)  { 
                const data = {
                    staffTypeText:refInput.current.value
                } 
                const response= await fetch(BE_ENDPOINT+"staff-types/create",{
                    method:"POST",
                    headers:{
                        "Content-Type":"Application/json",
                    },
                    body:JSON.stringify(data)
                });
                if(!response.ok)
                {
                    alert("Fail");
                    return;
                } 
                const responseData= await response.json();
                console.log(responseData);
                if (result.isConfirmed) {
                    alert('ADDING A STAFF TYPE!');
                    console.log(refInput.current.value);
                    Swal.fire('Thêm loại nhân viên thành công!', '', 'success');
                    setUpdating(false);
                    refInput.current.value = '';
                    get(
                        'staff-types/',
                        (data) => {
                            setStaffTypes(data);
                        },
                        () => {
                            alert('Staff types not found!');
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
        }).then(async function (result)  { 
            const data={
                staffTypeText:refInput.current.value
            };
            const updateURL=BE_ENDPOINT+"staff-types/update/"+refCurrentStaffTypeId.current;
            const response = await fetch(updateURL, {
                method:"PUT",
                headers:{
                    "Content-Type":"Application/json"
                },
                body:JSON.stringify(data)
            })
            if(!response.ok) 
            {
                alert("Fail");
                return;
            } 
            const responseData= await response.json();
            console.log(responseData);
            if (result.isConfirmed) {
                alert('UPDATING A STAFF TYPE!');
                Swal.fire('Sửa loại nhân viên thành công!', '', 'success');
                console.log(refCurrentStaffTypeId.current, refInput.current.value);
                get(
                    'staff-types/',
                    (data) => {
                        setStaffTypes(data);
                    },
                    () => {
                        alert('Staff types not found!');
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
            const deleteURL= BE_ENDPOINT+"staff-types/delete/"+e.target.closest('tr').getAttribute('data-id');
            const response= await fetch(deleteURL, {
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
                alert('DELETING A STAFF TYPE!');
                Swal.fire('Xóa loại nhân viên thành công!', '', 'success');
                console.log(e.target.closest('tr').getAttribute('data-id'));
                setUpdating(false);
                refInput.current.value = '';
                get(
                    'staff-types/',
                    (data) => {
                        setStaffTypes(data);
                    },
                    () => {
                        alert('Staff types not found!');
                    },
                );
            } else {
            }
        });
    };

    /*return (
        <div className={cx('wrapper') + ' grid'}>
            <h2 className={cx('heading')}>Quản Lý Loại Nhân Viên</h2>
            <div className={cx('input-wrapper')}>
                <label>Loại nhân viên: </label>
                <input ref={refInput} name="id" />
            </div>
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
                            refInput.current.value = '';
                        }}
                    >
                        Hủy
                    </button>
                </>
            )}
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
                        <th>Loại nhân viên</th>
                    </tr>
                </thead>
                <tbody>
                    {staffTypes.map((item) => {
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
                                <td name="staffTypeText">{item.staffTypeText}</td>
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
                Quản Lý Loại Nhân Viên
            </h2>
            <div className={cx('input-wrapper')} style={{ marginBottom: '20px', textAlign: 'center' }}>
                <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Loại nhân viên: </label>
                <input
                    ref={refInput}
                    name="id"
                    style={{
                        padding: '5px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                    }}
                />
            </div>
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
                            refInput.current.value = '';
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
                    <tr style={{ backgroundColor: 'rgb(255,99,107)', textAlign: 'center', color: 'white' }}>
    <td style={{ padding: '10px' }}> </td>
                        <td style={{ padding: '10px' }}> </td>
                        <th style={{ padding: '10px' }}>Loại nhân viên</th>
                    </tr>
                </thead>
                <tbody>
                    {staffTypes.map((item) => {
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
                                <td name="staffTypeText" style={{ padding: '10px' }}>
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

export default StaffTypeList;
