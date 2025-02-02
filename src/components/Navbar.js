import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css"; // Import the CSS

function Navbar() {
  return (
    <div
      className="navbar"
      style={{
        background: "linear-gradient(0deg, #6a11cb 0%, #2575fc 100%)",
      }}
    >
      <ul>
        <li>
          <Link to="/">🏠 Home</Link>
        </li>
        <li>
          <Link to="/what-if">💡 What If</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
