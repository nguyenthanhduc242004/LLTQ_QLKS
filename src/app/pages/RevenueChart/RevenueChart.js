import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './RevenueChart.css';

const data = [
    {
        week: 'Tuần 1',
        revenue: 1500,
        details: { 'Phòng Tiêu Chuẩn': 500, 'Phòng Cao Cấp': 700, 'Phòng Hạng Sang': 300 },
    },
    {
        week: 'Tuần 2',
        revenue: 2000,
        details: { 'Phòng Tiêu Chuẩn': 800, 'Phòng Cao Cấp': 900, 'Phòng Hạng Sang': 300 },
    },
    {
        week: 'Tuần 3',
        revenue: 1800,
        details: { 'Phòng Tiêu Chuẩn': 600, 'Phòng Cao Cấp': 900, 'Phòng Hạng Sang': 300 },
    },
    {
        week: 'Tuần 4',
        revenue: 2200,
        details: { 'Phòng Tiêu Chuẩn': 1000, 'Phòng Cao Cấp': 900, 'Phòng Hạng Sang': 300 },
    },
    {
        week: 'Tuần 5',
        revenue: 1700,
        details: { 'Phòng Tiêu Chuẩn': 700, 'Phòng Cao Cấp': 700, 'Phòng Hạng Sang': 300 },
    },
    {
        week: 'Tuần 6',
        revenue: 2100,
        details: { 'Phòng Tiêu Chuẩn': 900, 'Phòng Cao Cấp': 900, 'Phòng Hạng Sang': 300 },
    },
    {
        week: 'Tuần 7',
        revenue: 1900,
        details: { 'Phòng Tiêu Chuẩn': 700, 'Phòng Cao Cấp': 900, 'Phòng Hạng Sang': 300 },
    },
    {
        week: 'Tuần 8',
        revenue: 2300,
        details: { 'Phòng Tiêu Chuẩn': 1100, 'Phòng Cao Cấp': 900, 'Phòng Hạng Sang': 300 },
    },
    {
        week: 'Tuần 9',
        revenue: 1600,
        details: { 'Phòng Tiêu Chuẩn': 600, 'Phòng Cao Cấp': 700, 'Phòng Hạng Sang': 300 },
    },
    {
        week: 'Tuần 10',
        revenue: 2500,
        details: { 'Phòng Tiêu Chuẩn': 1200, 'Phòng Cao Cấp': 1000, 'Phòng Hạng Sang': 300 },
    },
    {
        week: 'Tuần 11',
        revenue: 1800,
        details: { 'Phòng Tiêu Chuẩn': 700, 'Phòng Cao Cấp': 800, 'Phòng Hạng Sang': 300 },
    },
    {
        week: 'Tuần 12',
        revenue: 2000,
        details: { 'Phòng Tiêu Chuẩn': 900, 'Phòng Cao Cấp': 800, 'Phòng Hạng Sang': 300 },
    },
    {
        week: 'Tuần 13',
        revenue: 2200,
        details: { 'Phòng Tiêu Chuẩn': 1000, 'Phòng Cao Cấp': 900, 'Phòng Hạng Sang': 300 },
    },
];

function RevenueChart() {
    const [selectedWeek, setSelectedWeek] = useState();
    const [selectedWeekLabel, setSelectedWeekLabel] = useState('');

    const handleBarClick = (data) => {
        setSelectedWeek(data.details);
        setSelectedWeekLabel(data.week); // Ghi nhận tuần được chọn
    };

    return (
        <div className="chart-wrapper">
            <div className="chart-container">
                <h2>Doanh thu Quý 1 2024</h2>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        onClick={(e) => {
                            if (e && e.activePayload) {
                                handleBarClick(e.activePayload[0].payload);
                            }
                        }}
                    >
                        <XAxis dataKey="week" interval={0} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>

                {selectedWeek && (
                    <div className="details-table">
                        <h3>Doanh thu chi tiết {selectedWeekLabel}</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Loại phòng</th>
                                    <th>Doanh thu (VNĐ)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(selectedWeek).map(([roomType, revenue]) => (
                                    <tr key={roomType}>
                                        <td>{roomType}</td>
                                        <td>{revenue.toLocaleString('vi-VN')} VNĐ</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RevenueChart;
