import classNames from 'classnames/bind';
import styles from './changePasswordModal.module.scss';
import { useEffect, useRef } from 'react';
import Button from '../Button';

const cx = classNames.bind(styles);

function ChangePasswordModal({ className }) {
    const refPasswordFormMessage = useRef();
    const refPasswordFormMessage2 = useRef();
    const refPasswordFormMessage3 = useRef();
    const refPasswordFormMessageRequired = refPasswordFormMessage.current.parentElement.querySelector(
        '.' + cx('form-message__required'),
    );
    const refPasswordFormMessageRequired2 = refPasswordFormMessage2.current.parentElement.querySelector(
        '.' + cx('form-message__required'),
    );
    const refPasswordFormMessageRequired3 = refPasswordFormMessage3.current.parentElement.querySelector(
        '.' + cx('form-message__required'),
    );
    const refPasswordFormMessageMin = refPasswordFormMessage.current.parentElement.querySelector(
        '.' + cx('form-message__min'),
    );
    const refPasswordFormMessageMin2 = refPasswordFormMessage2.current.parentElement.querySelector(
        '.' + cx('form-message__min'),
    );
    const refPasswordFormMessageMin3 = refPasswordFormMessage3.current.parentElement.querySelector(
        '.' + cx('form-message__min'),
    );
    const refPasswordFormMessageMatch2 = refPasswordFormMessage2.current.parentElement.querySelector(
        '.' + cx('form-message__match'),
    );
    const refPasswordFormMessageMatch3 = refPasswordFormMessage3.current.parentElement.querySelector(
        '.' + cx('form-message__match'),
    );

    const handlePasswordChange = (e) => {};

    const handleSubmit = () => {
        refPasswordFormMessageRequired.classList.remove(cx('active'));
        refPasswordFormMessageRequired2.classList.remove(cx('active'));
        refPasswordFormMessageRequired3.classList.remove(cx('active'));
        refPasswordFormMessageMin.classList.remove(cx('active'));
        refPasswordFormMessageMin2.classList.remove(cx('active'));
        refPasswordFormMessageMin3.classList.remove(cx('active'));
        refPasswordFormMessageMatch2.classList.remove(cx('active'));
        refPasswordFormMessageMatch3.classList.remove(cx('active'));
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
            alert('CHANGING PASSWORD!');
            console.log({
                oldPassword: refPasswordFormMessage.current.value,
                newPassword: refPasswordFormMessage2.current.value,
            });

            handleWindowClick();
        }
    };

    const handleWindowClick = () => {
        refPasswordFormMessage.current.value = '';
        refPasswordFormMessage2.current.value = '';
        refPasswordFormMessage3.current.value = '';
        refPasswordFormMessageRequired.classList.remove(cx('active'));
        refPasswordFormMessageRequired2.classList.remove(cx('active'));
        refPasswordFormMessageRequired3.classList.remove(cx('active'));
        refPasswordFormMessageMin.classList.remove(cx('active'));
        refPasswordFormMessageMin2.classList.remove(cx('active'));
        refPasswordFormMessageMin3.classList.remove(cx('active'));
        refPasswordFormMessageMatch2.classList.remove(cx('active'));
        refPasswordFormMessageMatch3.classList.remove(cx('active'));
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
                        <label for="password" className={cx('form-label')}>
                            Mật khẩu cũ
                        </label>
                    </div>
                    <input
                        id="password"
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
                        <label for="password" className={cx('form-label')}>
                            Mật khẩu mới
                        </label>
                    </div>
                    <input
                        id="password"
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
                        <label for="password" className={cx('form-label')}>
                            Nhập lại mật khẩu
                        </label>
                    </div>
                    <input
                        id="password"
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
