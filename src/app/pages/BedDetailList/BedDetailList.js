import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { sCurrentPage } from '../../layouts/DefaultLayout/Sidebar/sidebarStore';
import { get } from '../../modules/lib/httpHandle';
import styles from './bedDetailList.module.scss';
import { BE_ENDPOINT } from '../../../settings/localVar';

const cx = classNames.bind(styles);

function BedDetailList() {
    const [bedDetails, setBedDetails] = useState([]);
    const refInput = useRef();
    const [isUpdating, setUpdating] = useState(false);

    // const handleWindowClick = () => {
    //     setUpdating(false);
    // };

    useEffect(() => {
        sCurrentPage.set('/chi-tiet-giuong');

        get(
            'bed-details/',
            (data) => {
                setBedDetails(data);
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

    const refCurrentBedDetailId = useRef();
    const handleUpdate = (e) => {
        setUpdating(true);
        refInput.current.value = e.target.closest('tr').querySelector('td[name="bedDetailText"]').innerText;
        refCurrentBedDetailId.current = e.target.closest('tr').getAttribute('data-id');
    };

    const handleAdd = () => {
        if (!!refInput.current.value) {
            Swal.fire({
                title: 'Bạn có chắc muốn thêm không?',
                showDenyButton: true,
                confirmButtonText: 'Có',
                cancelButtonText: 'Không',
                icon: 'info',
            }).then(async function(result)  {
                
                
                if (result.isConfirmed) { 
                    const data= {
                        bedDetailText:refInput.current.value
                    }
                    const response = await fetch(BE_ENDPOINT+"add/bed-detail/",
                        {
                            method:'POST',
                            headers:{
                                "Content-Type":"Application/json"
                            },
                            body: JSON.stringify(data)
                        }
                    );
                    if(!response.ok)
                    {
                        alert("Fail");
                        return;
                    } 
                    const responseData= await response.json();
                    console.log(responseData);
                    alert('ADDING A BED DETAIL!');
                    console.log(refInput.current.value);
                    Swal.fire('Thêm chi tiết giường thành công!', '', 'success');
                    setUpdating(false);
                    refInput.current.value = '';
                    get(
                        'bed-details/',
                        (data) => {
                            setBedDetails(data);
                        },
                        () => {
                            alert('Bed details not found!');
                        },
                    );
                } else {
                }
            }
        
        );
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
            const data = {
                bedDetailText:refInput.current.value
            };
            const updateURL= BE_ENDPOINT+"update/bed-detail/"+refCurrentBedDetailId.current;
           
            const response = await fetch(updateURL,
                {
                    method:'PUT',
                    headers:{
                        "Content-Type":"Application/json"
                    },
                    body: JSON.stringify(data)
                }
            );
            if(!response.ok)
            {
                alert("Fail");
                return;
            } 
            const responseData= await response.json();
            console.log(responseData);
            if (result.isConfirmed) {
                alert('UPDATING A BED DETAIL!');
                Swal.fire('Sửa chi tiết giường thành công!', '', 'success');
                console.log(refCurrentBedDetailId.current, refInput.current.value);
                get(
                    'bed-details/',
                    (data) => {
                        setBedDetails(data);
                    },
                    () => {
                        alert('Bed details not found!');
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
        }).then(async function (result)  {
            if (result.isConfirmed) {
                const deleteURL= BE_ENDPOINT+"delete/bed-detail/"+e.target.closest('tr').getAttribute('data-id');
                console.log(deleteURL)
                const response = await fetch(deleteURL, {
                    method:'DELETE',
                    headers:{
                        "Content-type":"Text/plain"
                    }
                });
                if(!response.ok)
                {
                    alert("Fail");
                    return;
                }
                const responseData= await response.text();
                console.log(responseData);
                alert('DELETING A BED DETAIL!');
                Swal.fire('Xóa chi tiết giường thành công!', '', 'success');
                console.log(e.target.closest('tr').getAttribute('data-id'));
                setUpdating(false);
                refInput.current.value = '';
                get(
                    'bed-details/',
                    (data) => {
                        setBedDetails(data);
                    },
                    () => {
                        alert('Bed details not found!');
                    },
                );
            } else {
            }
        });
    };

    return (
        <div className={cx('wrapper') + ' grid'}>
            <h2 className={cx('heading')}>Quản Lý Chi Tiết Giường</h2>
            <div className={cx('input-wrapper')}>
                <label>Chi tiết giường: </label>
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
                        <th>Chi tiết giường</th>
                    </tr>
                </thead>
                <tbody>
                    {bedDetails.map((item) => {
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
                                <td name="bedDetailText">{item.bedDetailText}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default BedDetailList;
