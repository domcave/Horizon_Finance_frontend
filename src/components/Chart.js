import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";

const lineData = [
  { name: "Week 1", spent: 400, budget: 500 },
  { name: "Week 2", spent: 450, budget: 500 },
  { name: "Week 3", spent: 500, budget: 500 },
  { name: "Week 4", spent: 480, budget: 500 },
];

const pieData = [
  { name: "Rent", value: 30 },
  { name: "Groceries", value: 20 },
  { name: "Transportation", value: 15 },
  { name: "Savings", value: 25 },
  { name: "Entertainment", value: 10 },
];

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"];

function Chart() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "30px" }}>
      {/* Line Chart */}
      <div>
        <h3>Monthly Budget Progress</h3>
        <LineChart width={400} height={200} data={lineData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="spent" stroke="#8884d8" />
          <Line type="monotone" dataKey="budget" stroke="#82ca9d" />
        </LineChart>
      </div>

      {/* Pie Chart */}
      <div>
        <h3>Expenditure Breakdown</h3>
        <PieChart width={400} height={200}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
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

export default Chart;
