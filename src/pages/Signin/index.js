import classNames from 'classnames/bind';
import styles from './Signin.module.scss';

const cx = classNames.bind(styles);

function Signin() {
    return (
        <div className={cx('wrapper')}>
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
                    />
                    <span className={cx('form-message')}></span>
                </div>

                <div className={cx('form-group', 'form-group__password')}>
                    <div>
                        <label for="password" className={cx('form-label')}>
                            Mật khẩu
                        </label>
                    </div>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••••••••••"
                        className={cx('form-control', 'form-input')}
                    />
                    <span className={cx('form-message')}></span>
                </div>

                <div className={cx('form-group')}>
                    <input name="checkbox" type="checkbox" className={cx('form-control', 'form-checkbox')} />
                    <label for="checkbox" className={cx('form-label')}>
                        Ghi nhớ đăng nhập
                    </label>
                    <span className={cx('form-message')}></span>
                </div>
                <div>
                    <a href="/" className="forgotPassword">
                            Quên mật khẩu?
                    </a>
                </div>
            </form>
            <div className={cx('center')}>
                <button className={cx('main-button')}>ĐĂNG NHẬP</button>
            </div>            
            <div className={cx('above-footer')}>
                <span>Bạn chưa có tài khoản?</span>
                <a href="/signup">Đăng ký</a>
            </div>
        </div>
    );
}

export default Signin;
