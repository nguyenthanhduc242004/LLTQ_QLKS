import classNames from 'classnames/bind';
import styles from './bedDetailList.module.scss';
import { useEffect, useRef, useState } from 'react';
import { get } from '../../modules/lib/httpHandle';
import { sCurrentPage } from '../../layouts/DefaultLayout/Sidebar/sidebarStore';
import Swal from 'sweetalert2';
import { isEditable } from '@testing-library/user-event/dist/utils';

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

    const handleChange = () => {};
    const handleAdd = () => {
        if (!!refInput.current.value) {
            Swal.fire({
                title: 'Bạn có chắc muốn thêm không?',
                showDenyButton: true,
                confirmButtonText: 'Có',
                cancelButtonText: 'Không',
                icon: 'info',
            }).then((result) => {
                if (result.isConfirmed) {
                    alert('ADDING A BED DETAIL!');
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
            });
        }
    };
    var currentBedDetailId;
    const handleUpdate = (e) => {
        setUpdating(true);
        refInput.current.value = e.target.closest('tr').querySelector('td[name="bedDetailText"]').innerText;
        currentBedDetailId = e.target.closest('tr').getAttribute('data-id');
    };
    const handleUpdateSubmit = () => {
        Swal.fire({
            title: 'Bạn có muốn lưu thay đổi không?',
            showDenyButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
            icon: 'info',
        }).then((result) => {
            if (result.isConfirmed) {
                alert('UPDATING A BED DETAIL!');
                Swal.fire('Sửa chi tiết giường thành công!', '', 'success');
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
    const handleDelete = () => {
        Swal.fire({
            title: 'Bạn có chắc muốn xóa không?',
            showDenyButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
            icon: 'info',
        }).then((result) => {
            if (result.isConfirmed) {
                alert('DELETING A BED DETAIL!');
                Swal.fire('Xóa chi tiết giường thành công!', '', 'success');
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
                <input ref={refInput} name="id" onChange={handleChange} />
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
