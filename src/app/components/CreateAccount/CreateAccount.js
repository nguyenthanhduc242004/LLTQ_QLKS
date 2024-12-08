import classNames from 'classnames/bind';
import styles from './createAccount.module.scss';
import { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import { BE_ENDPOINT } from '../../../settings/localVar';
import { get, post } from '../../modules/lib/httpHandle';
import Swal from 'sweetalert2';

const cx = classNames.bind(styles);

function CreateAccount({ className }) {
    const [staffs, setStaffs] = useState([])

    

    var refStaffId = useRef();
    var refEmailFormMessage = useRef();
    var refPasswordFormMessage2 = useRef();
    var refPasswordFormMessage3 = useRef();
    var refPasswordFormMessageRequired2 = refPasswordFormMessage2.current?.parentElement.querySelector(
        '.' + cx('form-message__required'),
    );
    const refPasswordFormMessageRequired3 = refPasswordFormMessage3.current?.parentElement.querySelector(
        '.' + cx('form-message__required'),
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
        refPasswordFormMessageRequired2?.classList.remove(cx('active'));
        refPasswordFormMessageRequired3?.classList.remove(cx('active'));
        refPasswordFormMessageMin2?.classList.remove(cx('active'));
        refPasswordFormMessageMin3?.classList.remove(cx('active'));
        refPasswordFormMessageMatch2?.classList.remove(cx('active'));
        refPasswordFormMessageMatch3?.classList.remove(cx('active'));
        var condition = true;
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

        if (condition) { 

            const data={
                password: refPasswordFormMessage2.current.value,
                email: refEmailFormMessage.current.value,
                staffId: refStaffId.current.value
            }
            Swal.fire({
                title: "Xác nhận tạo tài khoản?",
                showCancelButton: true,
                confirmButtonText: "Xác nhận",
                cancelButtonText: `Thoát`,
                icon: "info"
              }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const response= await fetch(BE_ENDPOINT+"account/create",{
                        method:"POST",
                        headers:{
                            "Content-Type":"Application/json"
                        },
                        body:JSON.stringify(data)
                    });

                    if(response.ok) 
                    {
                        Swal.fire({
                            title: "Tạo tài khoản thành công!",
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
                            title: "Tạo tài khoản thất bại!",
                            text: 'Nhân viên đã có tài khoản.',
                            confirmButtonText: 'Xác nhận',
                            icon: 'error'
                        })
                    }
                }
              });
            console.log(data); 
        }
    };

    const handleWindowClick = () => {
        refStaffId.current.value = -1;
        refEmailFormMessage.current.value = '';
        refPasswordFormMessage2.current.value = '';
        refPasswordFormMessage3.current.value = '';
        refPasswordFormMessageRequired2?.classList.remove(cx('active'));
        refPasswordFormMessageRequired3?.classList.remove(cx('active'));
        refPasswordFormMessageMin2?.classList.remove(cx('active'));
        refPasswordFormMessageMin3?.classList.remove(cx('active'));
        refPasswordFormMessageMatch2?.classList.remove(cx('active'));
        refPasswordFormMessageMatch3?.classList.remove(cx('active'));
    };

    useEffect(() => {
        get(
            'staffs/',
            (data) => {
                setStaffs(data);
            },
            () => {
                alert('Staffs not found!');
            })
            handleWindowClick()
            window.addEventListener('click', handleWindowClick);
            return () => {
                window.removeEventListener('click', handleWindowClick);
            };
    }, [])

    return (
        <div
            className={cx('wrapper') + ' grid ' + className}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <h2 className={cx('heading')}>TẠO TÀI KHOẢN</h2>
            <form action="" method="" className={cx('form')}>
                <label>Chọn nhân viên</label>
                <select ref={refStaffId} defaultValue={-1} >
                    <option disabled value={-1}>Chọn nhân viên</option>
                    {staffs.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
                <div className={cx('form-group')}>
                    <div>
                        <label htmlFor="email" className={cx('form-label')}>
                            Email
                        </label>
                    </div>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email@gmail.com"
                        className={cx('form-control', 'form-input')}
                        onChange={handlePasswordChange}
                        ref={refEmailFormMessage}
                    />
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
            <Button label="Tạo tài khoản" onClick={handleSubmit} primary className={cx('btn')} />
        </div>
    );
}

export default CreateAccount;
