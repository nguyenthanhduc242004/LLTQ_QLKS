import classNames from 'classnames/bind';
import styles from './login.module.scss';
import images from '../../assets/imgs';
import { signify } from 'react-signify';
import { post } from '../../modules/lib/httpHandle';
import { sIsLoggedIn } from '../../../settings/globalStore';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

const sRememberMe = signify(false);

const handleCheckboxChange = () => {
    sRememberMe.set(!sRememberMe.value);
};

// SAVE FOR LATER:
// const [isLoggedIn, setLoggedIn] = useState(false);

// useEffect(() => {
//     const userToken = localStorage.getItem('userToken');
//     if (userToken) {
//         setLoggedIn(true);
//     }
// }, []);

function Login() {
    const [submitData, setSubmitData] = useState({});
    const refEmailFormMessage = useRef();
    const refPasswordFormMessage = useRef();
    const refEmailFormMessage2 = useRef();
    const refPasswordFormMessage2 = useRef();

    const handleEmailChange = (e) => {
        setSubmitData((prev) => ({ ...prev, email: e.target.value }));
        refEmailFormMessage.current.classList.remove(cx('active'));
        refEmailFormMessage2.current.classList.remove(cx('active'));
    };

    const handlePasswordChange = (e) => {
        setSubmitData((prev) => ({ ...prev, password: e.target.value }));
        refPasswordFormMessage.current.classList.remove(cx('active'));
        refPasswordFormMessage2.current.classList.remove(cx('active'));
    };

    const handleLogin = () => {
        // eslint-disable-next-line
        const emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var condition = true;
        if (!submitData.email) {
            refEmailFormMessage.current.classList.add(cx('active'));
            condition = false;
        } else if (!emailValidate.test(submitData.email)) {
            refEmailFormMessage2.current.classList.add(cx('active'));
            condition = false;
        }
        if (!submitData.password) {
            refPasswordFormMessage.current.classList.add(cx('active'));
            condition = false;
        } else if (submitData.password.length < 8) {
            refPasswordFormMessage2.current.classList.add(cx('active'));
            condition = false;
        }

        if (condition) {
            post(
                'accounts/',
                submitData,
                (data) => {
                    // Success
                    sIsLoggedIn.set(true);
                    if (sRememberMe.value) {
                        localStorage.setItem('user-token', JSON.stringify(data));
                    }
                },
                () => {
                    // Fail
                    alert('Accounts not found!');
                },
            );
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo-section')}>
                    <img src={images.logo} alt="logo" />
                    <span className={cx('brand-name')}>HotelAir</span>
                </div>
                <form action="" method="" className={cx('form')}>
                    <div className={cx('form-group')}>
                        <label for="email" className={cx('form-label')}>
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="admin@hotelair.com"
                            className={cx('form-control', 'form-input')}
                            onChange={handleEmailChange}
                        />
                        <span ref={refEmailFormMessage} className={cx('form-message')}>
                            Vui lòng nhập trường này!
                        </span>
                        <span ref={refEmailFormMessage2} className={cx('form-message')}>
                            Vui lòng nhập một email!
                        </span>
                    </div>

                    <div className={cx('form-group', 'form-group__password')}>
                        <div>
                            <label for="password" className={cx('form-label')}>
                                Mật khẩu
                            </label>
                            {/* <a href="/" className="forgotPassword">
                                Quên mật khẩu?
                            </a> */}
                        </div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••••••••••"
                            className={cx('form-control', 'form-input')}
                            onChange={handlePasswordChange}
                        />
                        <span ref={refPasswordFormMessage} className={cx('form-message')}>
                            Vui lòng nhập trường này!
                        </span>
                        <span ref={refPasswordFormMessage2} className={cx('form-message')}>
                            Vui lòng tối thiểu 8 ký tự!
                        </span>
                    </div>

                    <div className={cx('form-group')}>
                        <sRememberMe.Wrap>
                            {(value) => (
                                <input
                                    name="checkbox"
                                    checked={value}
                                    type="checkbox"
                                    className={cx('form-control', 'form-checkbox')}
                                    onChange={handleCheckboxChange}
                                />
                            )}
                        </sRememberMe.Wrap>

                        <label for="checkbox" className={cx('form-label')}>
                            Ghi nhớ đăng nhập
                        </label>
                        <span className={cx('form-message')}></span>
                    </div>
                </form>
                <button className={cx('main-button')} onClick={handleLogin}>
                    ĐĂNG NHẬP
                </button>
                {/* <div className={cx('above-footer')}>
                    <span>Bạn chưa có tài khoản?</span>
                    <a href="/signup">Đăng ký</a>
                </div> */}
            </div>
        </div>
    );
}

export default Login;
