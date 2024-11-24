import classNames from 'classnames/bind';
import styles from './guestItem.module.scss';

const cx = classNames.bind(styles);

function GuestItem({ className }) {
    return (
        <div className={className + ' ' + cx('wrapper') + ' row'}>
            <p className="col c-2 m-2 l-2">054204004505</p>
            <p className="col c-3 m-3 l-3">Nguyễn Thành Văn Nguyễn Đức</p>
            <p className="col c-1 m-1 l-1">Nam</p>
            <p className="col c-1 m-1 l-1">12/12/2024</p>
            <p className="col c-3 m-3 l-3">nguyenthanhduc242004@gmail.com</p>
            <p className="col c-2 m-2 l-2">0345967735</p>
        </div>
    );
}

export default GuestItem;
