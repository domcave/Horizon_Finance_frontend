import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import { spendingPerDay } from "../services/transactions_service";


export default function CardLineChart({ transactions }) {
    const lineData = spendingPerDay(transactions);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "30px" }}>
            {/* Line Chart */}
            <div>
                <h3>Spending Per Day: Last 30 Days</h3>
                <LineChart width={400} height={200} data={lineData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="spent" stroke="#8884d8" />
                <Line type="monotone" dataKey="budget" stroke="#82ca9d" />
                </LineChart>
            </div>
        </div>
    );
}



