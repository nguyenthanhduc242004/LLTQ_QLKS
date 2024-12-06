import classNames from 'classnames/bind';
import styles from './revenueChartList.module.scss';
import RevenueChart from '../RevenueChart/RevenueChart';
import { useEffect } from 'react';
import { sCurrentPage } from '../../layouts/DefaultLayout/Sidebar/sidebarStore';

const cx = classNames.bind(styles);

function RevenueChartList() {
    useEffect(() => {
        sCurrentPage.set('/thong-ke');
    }, []);
    return (
        <div className={cx('wrapper') + ' grid'}>
            <RevenueChart />
        </div>
    );
}

export default RevenueChartList;
