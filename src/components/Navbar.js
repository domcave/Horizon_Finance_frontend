import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css"; // Import the CSS
import logo from "../assets/HorizonFinance.png";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
        <img src={logo} alt="Horizon Finance Logo" className="logo"/>
        </li>
        <li>
          <Link to="/">🏠 Home</Link>
        </li>
        <li>
          <Link to="/what-if" className="nav-link">
            💡 What If
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
