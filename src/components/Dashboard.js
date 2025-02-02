import React from "react";
import Navbar from "./Navbar";
import Chart from "./Chart";
import { useLocation } from "react-router-dom";
import "../css/DashBoard.css";

import * as PlaidService from "../../src/services/plaid_service";

function Dashboard() {
  const location = useLocation();
  const { email, password } = location.state || {}; // stored email and passwd

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
        <PlaidService.ConnectBank user_id="user1" />
        <button
          onClick={() => {
            PlaidService.getTransactions30Days("user1");
          }}
        >
          Click to get transaction data of last 30 days
        </button>
        <button
          onClick={() => {
            PlaidService.getTransactionsThisMonth("user1");
          }}
        >
          Click to get transaction data of this month
        </button>
        <button
          onClick={() => {
            PlaidService.getInvestmentHoldings("user1");
          }}
        >
          Click to get investment data
        </button>
        <button
          onClick={() => {
            PlaidService.getAccountBalances("user1");
          }}
        >
          Click to get account balance data
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
