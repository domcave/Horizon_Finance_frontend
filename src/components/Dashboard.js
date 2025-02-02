import React from "react";
import Navbar from "./Navbar";
import Chart from "./Chart";
import "../css/Dashboard.css";
import { useState } from 'react';

import * as PlaidService from "../../src/services/plaid_service";
import * as RecommendationService from "../../src/services/recommendation_service";
import CardLineChart from "./CardLineChart";

function Dashboard() {

  const [transactions30, setTransactions30] = useState({})
  const [transactionsMonth, setTransactionsMonth] = useState({})
  const [investments, setInvestments] = useState({})
  const [accountBalances, setAccountBalances] = useState({})

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="cards">
        <div className="card">
          {/* {<CardLineChart transactions={transactions30} /> } */}
          <Chart />
        </div>
        <div className="card">
          <Chart />
        </div>
        <div className="card">
          <Chart />
        </div>
        <div className="card">
          <Chart />
        </div>

      </div>
        <PlaidService.ConnectBank user_id="user1" />
        <button
          onClick={() => {
            setTransactions30(PlaidService.getTransactions30Days("user1").json());
          }}
        >
          Click to get transaction data of last 30 days
        </button>
        <button
          onClick={() => {
            setTransactionsMonth(PlaidService.getTransactionsThisMonth("user1").json());
          }}
        >
          Click to get transaction data of this month
        </button>
        <button
          onClick={() => {
            setInvestments(PlaidService.getInvestmentHoldings("user1").json());
          }}
        >
          Click to get investment data
        </button>
        <button
          onClick={() => {
            setAccountBalances(PlaidService.getAccountBalances("user1").json());
          }}
        >
          Click to get account balance data
        </button>
        <button onClick={() => {RecommendationService.getHouseRecommendation({
          username: "user1",
          owned_house_price: 250000
        })}}>Click to get new house recommendation</button>
        <button onClick={() => {RecommendationService.getMarriageRecommendation({
            username: "user1",
            num_kids: 2,
            arr: 0.08,
            spouse_income: 65000,
            save: true,
            years_to_college: 18
        })}}>Click to get marraige recommendation</button>
        <button onClick={() => {RecommendationService.getRetirementRecommendation({
            username: "user1",
            savings: 300000,
            arr: 0.07,
            wd_rate: 0.04
        })}}>Click to get retirement recommendation</button>
      
    </div>
  );
}

export default Dashboard;
