import classNames from 'classnames/bind';
import styles from './StaffModal.module.scss';
import DetailInformation from '../DetailInformation';
import Image from '../Image';

const cx = classNames.bind(styles);

function StaffModal({ className, data }) {
    const createdDate = new Date(data.createdDate.split('-')).toLocaleDateString();
    return (
        <div className={cx('wrapper') + ' grid ' + className}>
            <h2 className={cx('heading')}>THÔNG TIN NHÂN VIÊN</h2>
            <Image
                className={cx('staff-avt')}
                src="https://hotelair-react.pixelwibes.in/static/media/profile_av.387360c31abf06d6cc50.png"
                alt="staff-avt"
                fallback="https://fullstack.edu.vn/assets/f8-icon-lV2rGpF0.png"
            />
            {console.log({ ...data, guestName: data.staffName })}
            <DetailInformation data={{ ...data, guestName: data.name }} />
            <div className="row">
                <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                    <span>Loại nhân viên: </span>
                    <input type="text" disabled defaultValue={data.staffTypeText} />
                </div>
                <div className={cx('input-with-label') + ' col c-6 m-6 l-6'}>
                    <span>Ngày vào làm: </span>
                    <input type="text" disabled defaultValue={createdDate} />
                </div>
            </div>
        </div>
    );
}

export default StaffModal;
