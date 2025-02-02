import React from "react";
import Navbar from "./Navbar";
import Chart from "./Chart";
import "../css/DashBoard.css";
import { useState, useEffect } from "react";

import * as PlaidService from "../../src/services/plaid_service";
import * as RecommendationService from "../../src/services/recommendation_service";
import CardLineChart from "./CardLineChart";
import CardPieChart from "./CardPieChart";
import CardBarChart from "./CardBarChart";

function Dashboard({ props }) {
  const [transactions30, setTransactions30] = useState(null);
  const [transactionsMonth, setTransactionsMonth] = useState(null);
  const [investments, setInvestments] = useState(null);
  const [accountBalances, setAccountBalances] = useState(null);

  const username = localStorage.getItem("username");

  useEffect(() => {
    async function fetchInitialData() {
      try {
        let response = await PlaidService.getTransactions30Days(username);
        response = response.data;
        setTransactions30(response);
        response = await PlaidService.getTransactionsThisMonth(username);
        response = response.data;
        setTransactionsMonth(response);
        response = await PlaidService.getInvestmentHoldings(username);
        response = response.data;
        setInvestments(response);
        response = await PlaidService.getAccountBalances(username);
        response = response.data;
        setAccountBalances(response);
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    }

    fetchInitialData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Welcome back, {username}!</h1>
        </header>
        <div className="chart-row">
          <div className="chart-card">
            {transactions30 ? (
              <CardLineChart transactions={transactions30} />
            ) : (
              <div>Loading user data...</div>
            )}
          </div>
          <div className="chart-card">
            {transactions30 ? (
              <CardPieChart transactions={transactions30} />
            ) : (
              <div>Loading user data...</div>
            )}
          </div>
        </div>
        <div className="chart-row-full">
          <div className="chart-card">
            {investments ? (
              <CardBarChart holdings={investments} />
            ) : (
              <div>Loading user data...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
