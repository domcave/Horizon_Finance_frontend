import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { accountBalances } from "../services/transactions_service";

export default function CardBarChart({ holdings }) {
    const barData = accountBalances(holdings.account_balances);
    console.log(barData)

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "30px" }}>
            {/* Bar Chart */}
            <div>
                <h3 style={{marginBottom: "10px"}}>Balances by Account</h3>
                <BarChart width={600} height={500} data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    dataKey="name" 
                    // angle={45}  // Rotate the X-axis labels by 45 degrees
                    // textAnchor="start"  // Adjust the anchor for proper label positioning
                    // tickMargin={10}  // Add some margin for readability
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalbalance" fill="#8884d8" />
                </BarChart>
            </div>
        </div>
    );
}

