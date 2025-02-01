import React from "react";
import Navbar from "../src/components/Navbar";
import Chart from "../src/components/Chart";
import ConnectBank from "./services/plaid_service";

function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="content">
        <h1>Dashboard</h1>
        <Chart />
      </div>
      <div>
        <ConnectBank user_id="user1"/>
      </div>
    </div>
  );
}

export default Dashboard;
