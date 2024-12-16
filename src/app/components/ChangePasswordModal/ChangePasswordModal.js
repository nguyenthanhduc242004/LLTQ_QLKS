import classNames from 'classnames/bind';
import styles from './changePasswordModal.module.scss';
import { useEffect, useRef } from 'react';
import Button from '../Button';
import { BE_ENDPOINT } from '../../../settings/localVar';
import Swal from 'sweetalert2';

const cx = classNames.bind(styles);

function ChangePasswordModal({ className }) {
    const refPasswordFormMessage = useRef();
    const refPasswordFormMessage2 = useRef();
    const refPasswordFormMessage3 = useRef();
    const refPasswordFormMessageRequired = refPasswordFormMessage.current?.parentElement.querySelector(
        '.' + cx('form-message__required'),
    );
    const refPasswordFormMessageRequired2 = refPasswordFormMessage2.current?.parentElement.querySelector(
        '.' + cx('form-message__required'),
    );
    const refPasswordFormMessageRequired3 = refPasswordFormMessage3.current?.parentElement.querySelector(
        '.' + cx('form-message__required'),
    );
    const refPasswordFormMessageMin = refPasswordFormMessage.current?.parentElement.querySelector(
        '.' + cx('form-message__min'),
    );
    const refPasswordFormMessageMin2 = refPasswordFormMessage2.current?.parentElement.querySelector(
        '.' + cx('form-message__min'),
    );
    const refPasswordFormMessageMin3 = refPasswordFormMessage3.current?.parentElement.querySelector(
        '.' + cx('form-message__min'),
    );
    const refPasswordFormMessageMatch2 = refPasswordFormMessage2.current?.parentElement.querySelector(
        '.' + cx('form-message__match'),
    );
    const refPasswordFormMessageMatch3 = refPasswordFormMessage3.current?.parentElement.querySelector(
        '.' + cx('form-message__match'),
    );

    const handlePasswordChange = (e) => {};

    const handleSubmit =async function ()  {
        refPasswordFormMessageRequired?.classList.remove(cx('active'));
        refPasswordFormMessageRequired2?.classList.remove(cx('active'));
        refPasswordFormMessageRequired3?.classList.remove(cx('active'));
        refPasswordFormMessageMin?.classList.remove(cx('active'));
        refPasswordFormMessageMin2?.classList.remove(cx('active'));
        refPasswordFormMessageMin3?.classList.remove(cx('active'));
        refPasswordFormMessageMatch2?.classList.remove(cx('active'));
        refPasswordFormMessageMatch3?.classList.remove(cx('active'));
        var condition = true;
        if (!refPasswordFormMessage.current.value) {
            refPasswordFormMessageRequired.classList.add(cx('active'));
            condition = false;
        } else if (refPasswordFormMessage.current.value.length < 8) {
            refPasswordFormMessageMin.classList.add(cx('active'));
            condition = false;
        }

        if (!refPasswordFormMessage2.current.value) {
            refPasswordFormMessageRequired2.classList.add(cx('active'));
            condition = false;
        } else if (refPasswordFormMessage2.current.value.length < 8) {
            refPasswordFormMessageMin2.classList.add(cx('active'));
            condition = false;
        }

        if (!refPasswordFormMessage3.current.value) {
            refPasswordFormMessageRequired3.classList.add(cx('active'));
            condition = false;
        } else if (refPasswordFormMessage3.current.value.length < 8) {
            refPasswordFormMessageMin3.classList.add(cx('active'));
            condition = false;
        }

        if (refPasswordFormMessage2.current.value !== refPasswordFormMessage3.current.value) {
            refPasswordFormMessageMatch3.classList.add(cx('active'));
            condition = false;
        }

        if (refPasswordFormMessage.current.value === refPasswordFormMessage2.current.value) {
            refPasswordFormMessageMatch2.classList.add(cx('active'));
            condition = false;
        }

        if (condition) { 

            const data={
                oldPassword: refPasswordFormMessage.current.value,
                newPassword: refPasswordFormMessage2.current.value,
            }
            console.log(data);
            Swal.fire({
                title: "Bạn có chắc muốn thay đổi mật khẩu?",
                showCancelButton: true,
                confirmButtonText: "Chắc chắn",
                cancelButtonText: `Thoát`,
                icon: "info"
              }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const accountInfo=JSON.parse(localStorage.getItem('currentStaffData'));
                    const changePasswordURL=BE_ENDPOINT+"account/changePassword/"+accountInfo.id;
                    const response = await fetch(changePasswordURL,{
                        method:"POST",
                        headers:{
                            "Content-Type":"Application/json"
                        },
                        body:JSON.stringify(data)
                    });
                    if(response.ok) 
                    {
                        Swal.fire({
                            title: "Thay đổi mật khẩu thành công!",
                            confirmButtonText: 'Xác nhận',
                            icon: 'success',
                            allowOutsideClick: false
                        }).then(response => {
                            if (response.isConfirmed) {
                                handleWindowClick();
                            }
                        })
                    }
                    else {
                        Swal.fire({
                            title: "Thay đổi mật khẩu thất bại!",
                            confirmButtonText: 'Xác nhận',
                            icon: 'error'
                        })
                    }
                }
              });
        }
    };

    const handleWindowClick = () => {
        refPasswordFormMessage.current.value = '';
        refPasswordFormMessage2.current.value = '';
        refPasswordFormMessage3.current.value = '';
        refPasswordFormMessageRequired?.classList.remove(cx('active'));
        refPasswordFormMessageRequired2?.classList.remove(cx('active'));
        refPasswordFormMessageRequired3?.classList.remove(cx('active'));
        refPasswordFormMessageMin?.classList.remove(cx('active'));
        refPasswordFormMessageMin2?.classList.remove(cx('active'));
        refPasswordFormMessageMin3?.classList.remove(cx('active'));
        refPasswordFormMessageMatch2?.classList.remove(cx('active'));
        refPasswordFormMessageMatch3?.classList.remove(cx('active'));
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
            <h2 className={cx('heading')}>ĐỔI MẬT KHẨU</h2>
            <form action="" method="" className={cx('form')}>
                <div className={cx('form-group')}>
                    <div>
                        <label htmlFor="old-password" className={cx('form-label')}>
                            Mật khẩu cũ
                        </label>
                    </div>
                    <input
                        id="old-password"
                        name="password"
                        type="password"
                        placeholder="••••••••••••"
                        className={cx('form-control', 'form-input')}
                        onChange={handlePasswordChange}
                        ref={refPasswordFormMessage}
                    />
                    <span className={cx('form-message', 'form-message__required')}>Vui lòng nhập trường này!</span>
                    <span className={cx('form-message', 'form-message__min')}>Vui lòng tối thiểu 8 ký tự!</span>
                </div>
                <div className={cx('form-group')}>
                    <div>
                        <label htmlFor="new-password" className={cx('form-label')}>
                            Mật khẩu mới
                        </label>
                    </div>
                    <input
                        id="new-password"
                        name="password"
                        type="password"
                        placeholder="••••••••••••"
                        className={cx('form-control', 'form-input')}
                        onChange={handlePasswordChange}
                        ref={refPasswordFormMessage2}
                    />
                    <span className={cx('form-message', 'form-message__required')}>Vui lòng nhập trường này!</span>
                    <span className={cx('form-message', 'form-message__min')}>Vui lòng tối thiểu 8 ký tự!</span>
                    <span className={cx('form-message', 'form-message__match')}>
                        Vui lòng nhập mật khẩu mới khác mật khẩu cũ!
                    </span>
                </div>
                <div className={cx('form-group')}>
                    <div>
                        <label htmlFor="confirm-password" className={cx('form-label')}>
                            Nhập lại mật khẩu
                        </label>
                    </div>
                    <input
                        id="confirm-password"
                        name="password"
                        type="password"
                        placeholder="••••••••••••"
                        className={cx('form-control', 'form-input')}
                        onChange={handlePasswordChange}
                        ref={refPasswordFormMessage3}
                    />
                    <span className={cx('form-message', 'form-message__required')}>Vui lòng nhập trường này!</span>
                    <span className={cx('form-message', 'form-message__min')}>Vui lòng tối thiểu 8 ký tự!</span>
                    <span className={cx('form-message', 'form-message__match')}>Mật khẩu nhập lại không khớp!</span>
                </div>
            </form>
            <Button label="Đổi mật khẩu" onClick={handleSubmit} primary className={cx('btn')} />
        </div>
    );
}

export default ChangePasswordModal;
