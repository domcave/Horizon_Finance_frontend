import React from "react";
import Navbar from "./components/Navbar";
import Chart from "./components/Chart";
import { useLocation } from 'react-router-dom';
import './DashBoard.css';



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
        </div>
    );
}

export default Dashboard;
