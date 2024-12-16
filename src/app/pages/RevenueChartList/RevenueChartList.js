import classNames from 'classnames/bind';
import styles from './revenueChartList.module.scss';
import RevenueChart from '../RevenueChart/RevenueChart';
import { useEffect, useState } from 'react';
import { sCurrentPage } from '../../layouts/DefaultLayout/Sidebar/sidebarStore';
import { BE_ENDPOINT } from '../../../settings/localVar';

const cx = classNames.bind(styles);

function RevenueChartList() {
    const [year, setYear] = useState(2024)
    const [data, setData] = useState([])
    useEffect(() => {
        sCurrentPage.set('/thong-ke');
    }, []);
    useEffect(() => {
        // fetch data
        var responseData;
        async function fetchData() {
            const response= await fetch(BE_ENDPOINT+"revenue/"+year);
            responseData= await response.json();
            await setData(responseData?.revenueData);
        }
        fetchData();
        
        
    }, [year])
    return (
        <div className={cx('wrapper') + ' grid'}>
            <div className={cx('year-wrapper')}>
                <label>Chọn năm: </label>
                <select className={cx('year-select')} value={year} onChange={(e) => {
                    setYear(e.target.value)
                }}>
                    <option value={-1} disabled>Chọn năm</option>
                    <option value={2023}>Năm 2023</option>
                    <option value={2024}>Năm 2024</option>
                    <option value={2025}>Năm 2025</option>
                </select>
            </div>
            {console.log(data)}
            <RevenueChart data={data} year={year}/>
        </div>
    );
}

export default RevenueChartList;
