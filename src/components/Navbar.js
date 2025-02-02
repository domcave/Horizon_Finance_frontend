import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css"; // Import the updated CSS

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/" className="nav-link">
            🏠 Home
          </Link>
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
