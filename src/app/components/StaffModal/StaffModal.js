import classNames from 'classnames/bind';
import styles from './StaffModal.module.scss';
import DetailInformation from '../DetailInformation';
import Image from '../Image';
import { CancelIcon, EditIcon } from '../Icons';
import { useEffect, useState } from 'react';
import Button from '../Button';
import { CheckIcon } from '../Icons';
import Swal from 'sweetalert2'
import { BE_ENDPOINT } from '../../../settings/localVar';

const cx = classNames.bind(styles);

function StaffModal({ className, data, editable }) {
    const [isEditing, setEditing] = useState(false);
    const [submitData, setSubmitData] = useState({});

    const handleUpdateConfirm = () => {
        Swal.fire({
            title: 'Xác nhận sửa thông tin!',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: `Thoát`,
            icon: 'info',
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) { 
                const requestData= {
                    citizenId:submitData.citizenId,
                    name:submitData.name,
                    phone:submitData.phone,
                    email:submitData.email,
                    dob:submitData.dob,
                    gender:submitData.gender,
                    address:submitData.address,
                    createdData:submitData.createdData,
                    staffTypeId:submitData.staffType.id
                }
                console.log(requestData)
                const response= await fetch(BE_ENDPOINT+"staffs/update/"+submitData.id,{
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(requestData)
                });
                if(response.ok) 
                    {
                        const currentStaffData = JSON.parse(localStorage.getItem('currentStaffData'))
                        localStorage.setItem('currentStaffData', JSON.stringify({...currentStaffData, staff: submitData}))
                        Swal.fire({
                            title: "Sửa thông tin thành công!",
                            confirmButtonText: 'Xác nhận',
                            icon: 'success',
                            allowOutsideClick: false
                        })
                        window.location.reload();
                    }
                    else {
                        Swal.fire({
                            title: "Sửa thông tin thất bại!",
                            confirmButtonText: 'Xác nhận',
                            icon: 'error'
                        }).then(response => {
                            if (response.isConfirmed) {
                                setEditing(false)
                            }
                        })
                    }
            }
        });
    };
    

    // const handleWindowClick = () => {
    //     alert()
    //     setEditing(false);
    // }
    // useEffect(() => {
    //     window.addEventListener('click', handleWindowClick)
    // }, [])

    return (
        <div className={cx('wrapper') + ' grid ' + className}> 
            <h2 className={cx('heading')}>THÔNG TIN NHÂN VIÊN</h2>
            {editable && !isEditing && (
                <button
                    className={cx('edit-btn')}
                    onClick={() => {
                        setEditing(true);
                        setSubmitData(data);
                    }}
                >
                    Sửa
                    <EditIcon className={cx('icon')} />
                </button>
            )}
            {editable && isEditing && (
                <button
                    className={cx('cancel-btn')}
                    onClick={() => {
                        setEditing(false);
                    }}
                >
                    Hủy
                    <CancelIcon className={cx('icon')} />
                </button>
            )}
            <div className={cx('avt-wrapper')}>
                <Image
                    className={cx('staff-avt')}
                    src="https://hotelair-react.pixelwibes.in/static/media/profile_av.387360c31abf06d6cc50.png"
                    alt="staff-avt"
                    fallback="https://fullstack.edu.vn/assets/f8-icon-lV2rGpF0.png"
                />
            </div>
            <DetailInformation
                data={data}
                isEditing={isEditing}
                submitData={submitData}
                setSubmitData={setSubmitData}
                nameProperty='name'
            />
            <div className="row">
                <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                    <span>Loại nhân viên: </span>
                    <input type="text" disabled defaultValue={data.staffTypeText || data.staffType.staffTypeText} />
                </div>
                <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                    <span>Ngày vào làm: </span>
                    <input
                        type="date"
                        disabled={editable && isEditing ? false : true}
                        defaultValue={data.createdDate}
                    />
                </div>
            </div>
            {editable && isEditing && (
                <div className={cx('btn-wrapper')}>
                    <Button
                        label="Hủy"
                        onClick={(e) => {
                            setEditing(false);
                        }}
                    />
                    <Button
                        label="Xác nhận"
                        type="confirm"
                        primary
                        icon={<CheckIcon />}
                        onClick={handleUpdateConfirm}
                    />
                </div>
            )}
        </div>
    );
}

export default StaffModal;
