import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import '../../components/grid.scss';

const cx = classNames.bind(styles);

function Signup() {
    return (
        <div className={cx('wrapper')}>
            <form action="" method="" className={cx('form')}>
                <div className={cx('form-group')}>
                    <label for="fullname" className={cx('form-label')}>
                        Họ và tên
                    </label>
                    <input
                        id="fullname"
                        name="fullname"
                        type="text"
                        placeholder="Nguyễn Văn A"
                        className={cx('form-control', 'form-input')}
                    />
                    <span className={cx('form-message')}></span>
                </div>

                <div className={cx('form-group', 'form-group__password')}>
                    <label for="email" className={cx('form-label')}>
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        className={cx('form-control', 'form-input')}
                    />
                    <span className={cx('form-message')}></span>
                </div>

                <div className="grid">
                    <div className="row">
                        <div className="col l-6 m-6 c-6">
                            <div className={cx('form-group')}>
                                <label for="password" className={cx('form-label')}>
                                    Mật khẩu
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Mật khẩu có 8 ký tự trở lên"
                                    className={cx('form-control', 'form-input')}
                                />
                                <span className={cx('form-message')}></span>
                            </div>
                        </div>
                        <div className="col l-6 m-6 c-6">
                            <div className={cx('form-group')}>
                                <label for="confirmPassword" className={cx('form-label')}>
                                    Nhập lại mật khẩu
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Mật khẩu có 8 ký tự trở lên"
                                    className={cx('form-control', 'form-input')}
                                />
                                <span className={cx('form-message')}></span>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
            <div className={cx('center')}>
                <button className={cx('main-button')}>ĐĂNG KÝ</button>
            </div>
            <div className={cx('above-footer')}>
                <span>Đã có tài khoản?</span>
                <a href="/signin">Đăng nhập</a>
            </div>
        </div>
    );
}

export default Signup;
