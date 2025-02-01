import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
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
