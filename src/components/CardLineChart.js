import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { spendingPerDay } from "../services/transactions_service";


export default function CardLineChart({ transactions }) {
    const lineData = spendingPerDay(transactions).reverse();


    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "30px" }}>
            {/* Line Chart */}
            <div>
                <h3 style={{paddingBottom: "10px"}}>Spending Per Day: Last 30 Days</h3>
                <LineChart width={600} height={400} data={lineData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis
                    dataKey="date"
                    // angle={45}  // Rotate the X-axis labels by 45 degrees
                    // textAnchor="start"  // Adjust the anchor for proper label positioning
                    // tickMargin={10}  // Add some margin for readability
                />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" />
                </LineChart>
            </div>
        </div>
    );
}



