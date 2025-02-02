import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { spendingPerCategory } from "../services/transactions_service";


export default function CardLineChart({ transactions }) {
    const pieData = spendingPerCategory(transactions);

    const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"];

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "30px" }}>
            {/* Pie Chart */}
            <div>
                <h3 style={{marginBottom: "10px"}}>Spending By Category: Last 30 Days</h3>
                <PieChart width={500} height={300}>
                    <Pie
                    data={pieData}
                    dataKey="totalAmount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                    >
                    {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                </PieChart>
            </div>
        </div>
    );


}