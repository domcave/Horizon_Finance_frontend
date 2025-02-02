import React from "react";
import Navbar from "./Navbar";
import Chart from "./Chart";
import "../css/DashBoard.css";

import ConnectBank from "../services/plaid_service";

function Dashboard() {
  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dashboard-stats">
        <div className="dashboard-content">
          <h1>Dashboard</h1>
          <Chart />
        </div>
      </div>
      <div>
        <ConnectBank user_id="user1" />
      </div>
    </div>
  );
}

export default Dashboard;
