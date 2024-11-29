import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Button from '../Button';
import GuestInformation from '../GuestInformation';
import { CancelIcon, CheckIcon, EditIcon } from '../Icons';
import styles from './GuestModal.module.scss';

const cx = classNames.bind(styles);

function GuestModal({ className, data }) {
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        window.addEventListener('click', () => {
            setIsEditing(false);
        });
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
                    }}
                >
                    Sửa
                    <EditIcon className={cx('icon')} />
                </button>
            )}
            {isEditing && (
                <button
                    className={cx('cancel-btn')}
                    onClick={(e) => {
                        setIsEditing(false);
                    }}
                >
                    Hủy
                    <CancelIcon className={cx('icon')} />
                </button>
            )}
            <GuestInformation data={data} isEditing={isEditing} />
            {}
            {isEditing && (
                <div className={cx('btn-wrapper')}>
                    <Button
                        label="Hủy"
                        onClick={(e) => {
                            setIsEditing(false);
                        }}
                    />
                    <Button label="Xác nhận" type="confirm" primary icon={<CheckIcon />} />
                </div>
            )}
        </div>
    );
}

export default GuestModal;
