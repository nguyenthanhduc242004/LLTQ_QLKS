import React, { useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import "./RevenueChart.css";

const pinkShades = ["#4CAF50", "#FF9800", "#2196F3", "#e62490", "#bf1d74"];

function RevenueChart({data, year}) {
    
    const [selectedMonth, setselectedMonth] = useState();
    const [selectedMonthLabel, setselectedMonthLabel] = useState("");


    const handleBarClick = (data) => {
        setselectedMonth(data.details); // 'details' vẫn là mảng
        setselectedMonthLabel(data.month); // Hiển thị tháng
    };
    
    

    const pieData = selectedMonth
    ? selectedMonth.map((item) => ({
          name: item.roomType,
          value: item.revenue,
      }))
    : [];


    return (
        <div className="chart-container">
            <h2>Doanh thu theo tháng năm {year}</h2>

            <ResponsiveContainer width="100%" height={170}>
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    onClick={(e) => {
                        if (e && e.activePayload) {
                            handleBarClick(e.activePayload[0].payload);
                        }
                    }}
                >
                    <XAxis dataKey="month" interval={0} />

                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#f582c2" name="Doanh thu" />
                </BarChart>
            </ResponsiveContainer>

            {selectedMonth && (
                <div className="details-container">
                    <div className="details-table">
                    <h3>Doanh thu chi tiết {selectedMonthLabel}</h3>

                        <table>
                            <thead>
                                <tr>
                                    <th>Loại phòng</th>
                                    <th>Doanh thu (VNĐ)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedMonth.map((item) => (
                                    <tr key={item.roomType}>
                                        <td>{item.roomType}</td>
<td>{item.revenue.toLocaleString("vi-VN")} VNĐ</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                    <div className="pie-chart">
                        <h3>Phần trăm doanh thu các loại phòng</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="55%"
                                    outerRadius={50}
                                    fill="#f254aa"
                                    label={({ name, percent }) =>
                                        `${name}: ${(percent * 100).toFixed(0)}%`
                                    }
                                >
                                    {pieData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={pinkShades[index % pinkShades.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RevenueChart;