import React from "react";
import Navbar from "../src/components/Navbar";
import Chart from "../src/components/Chart";
import { useLocation } from 'react-router-dom';


function Dashboard() {
    const location = useLocation();
    const { email, password } = location.state || {}; // stored email and passwd


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
