import classNames from 'classnames/bind';
import styles from './paymentItem.module.scss';

const cx = classNames.bind(styles);

function PaymentItem({ className, data, onClick }) {
    var stateText;
    if (data?.isPaid === true) stateText = 'Đã thanh toán';
    else if (Number(data.state) === 1) stateText = 'Chờ check-in';
    else if (Number(data.state) === 2) stateText = 'Chờ check-out';

    return (
        <a href="#chi-tiet-dat-phong" className={className + ' ' + cx('wrapper') + ' row'} onClick={onClick}>
            <p className="col c-2 m-2 l-2">{data?.guestName}</p>
            <p className="col c-2 m-2 l-2">{new Date(data?.checkinDate.split('-')).toLocaleDateString()}</p>
            <p className="col c-2 m-2 l-2">{new Date(data?.checkoutDate.split('-')).toLocaleDateString()}</p>
            <p className="col c-2 m-2 l-2">{data?.staffName}</p>
            <p className="col c-2 m-2 l-2">{data?.totalPrice.toLocaleString('de-DE') + 'đ'}</p>
            <p className="col c-2 m-2 l-2">{stateText}</p>
        </a>
    );
}

export default PaymentItem;
