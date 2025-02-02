import React from "react";
import Navbar from "./Navbar";
import Chart from "./Chart";
import "../css/Dashboard.css";
import { useState, useEffect } from 'react';

import * as PlaidService from "../../src/services/plaid_service";
import * as RecommendationService from "../../src/services/recommendation_service";
import CardLineChart from "./CardLineChart";
import CardPieChart from "./CardPieChart";
import CardBarChart from './CardBarChart';

function Dashboard({ props }) {

  const [transactions30, setTransactions30] = useState(null)
  const [transactionsMonth, setTransactionsMonth] = useState(null)
  const [investments, setInvestments] = useState(null)
  const [accountBalances, setAccountBalances] = useState(null)

  // Fetch data only on initial mount
  useEffect(() => {
    async function fetchInitialData() {
      try {
        let response = await PlaidService.getTransactions30Days("user1");
        response = response.data;
        setTransactions30(response);
        response = (await PlaidService.getTransactionsThisMonth("user1"));
        response = response.data;
        setTransactionsMonth(response);
        response = (await PlaidService.getInvestmentHoldings("user1"));
        response = response.data;
        setInvestments(response);
        response = (await PlaidService.getAccountBalances("user1"));
        response = response.data;
        setAccountBalances(response);
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    }

    fetchInitialData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="cards">
        <div className="card">
          {transactions30 ? <CardLineChart transactions={transactions30}/> : <div>Loading user data...</div>}
        </div>
        <div className="card">
          {transactions30 ? <CardPieChart transactions={transactions30}/> : <div>Loading user data...</div>}
        </div>
        <div className="card">
          {investments ? <CardBarChart holdings={investments}/> : <div>Loading user data...</div>}
        </div>

      </div>
      
    </div>
  );
}

export default Dashboard;
