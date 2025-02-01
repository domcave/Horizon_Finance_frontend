import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
  { name: "Week 1", spent: 400, budget: 500 },
  { name: "Week 2", spent: 450, budget: 500 },
  { name: "Week 3", spent: 500, budget: 500 },
  { name: "Week 4", spent: 480, budget: 500 },
];

function Chart() {
  return (
    <div>
      <h3>Monthly Budget Progress</h3>
      <LineChart width={400} height={200} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="spent" stroke="#8884d8" />
        <Line type="monotone" dataKey="budget" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}

export default Chart;
