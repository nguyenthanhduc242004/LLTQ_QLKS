import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Button from '../Button';
import { CancelIcon, CheckIcon, EditIcon } from '../Icons';
import styles from './GuestModal.module.scss';
import DetailInformation from '../DetailInformation';

const cx = classNames.bind(styles);

function GuestModal({ className, data }) {
    const [isEditing, setIsEditing] = useState(false);
    const [submitData, setSubmitData] = useState({});

    const handleWindowClick = () => {
        setIsEditing(false);
    };

    const handleUpdateConfirm = () => {
        if (
            submitData.citizenId !== data.citizenId ||
            submitData.guestName !== data.guestName ||
            submitData.phone !== data.phone ||
            submitData.email !== data.email ||
            submitData.dob !== data.dob ||
            submitData.gender !== data.gender ||
            submitData.address !== data.address
        ) {
            alert('UPDATING A GUEST');
            setIsEditing(false);
        } else {
            alert('Bạn chưa thay đổi thông tin khách hàng!');
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleWindowClick);
        return () => {
            window.removeEventListener('click', handleWindowClick);
        };
    }, []);

    return (
        <div
            className={cx('wrapper') + ' grid ' + className}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <h2 className={cx('heading')}>THÔNG TIN KHÁCH HÀNG</h2>
            {!isEditing && (
                <button
                    className={cx('edit-btn')}
                    onClick={() => {
                        setIsEditing(true);
                        setSubmitData(data);
                    }}
                >
                    Sửa
                    <EditIcon className={cx('icon')} />
                </button>
            )}
            {isEditing && (
                <button
                    className={cx('cancel-btn')}
                    onClick={() => {
                        setIsEditing(false);
                    }}
                >
                    Hủy
                    <CancelIcon className={cx('icon')} />
                </button>
            )}
            <DetailInformation data={data} isEditing={isEditing} setSubmitData={setSubmitData} />
            {isEditing && (
                <div className={cx('btn-wrapper')}>
                    <Button
                        label="Hủy"
                        onClick={(e) => {
                            setIsEditing(false);
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

export default GuestModal;
