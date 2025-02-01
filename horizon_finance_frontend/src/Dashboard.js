import React from "react";
import Navbar from "../src/components/Navbar";
import Chart from "../src/components/Chart";

function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="content">
        <h1>Dashboard</h1>
        <Chart />
      </div>
    </div>
  );
}

export default Dashboard;
