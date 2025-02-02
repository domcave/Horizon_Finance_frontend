import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./components/SignUpForm.js";
import Dashboard from "./components/Dashboard.js";
import WhatIf from "./components/WhatIf.js";
import LoginPage from "./components/LoginPage.js";
import FinancialForm from "./components/FinancialForm.js";

function App() {
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("userToken")
  );

  // Listen for changes in authentication (localStorage)
  useEffect(() => {
    setAuthenticated(!!localStorage.getItem("userToken"));
  }, []);

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={
            authenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <LoginPage setAuthenticated={setAuthenticated} />
            )
          }
        />

        {/* Sign Up Route */}
        <Route
          path="/signup"
          element={
            authenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <SignUp setAuthenticated={setAuthenticated} />
            )
          }
        />

        {/* Dashboard Route (Protected) */}
        <Route
          path="/dashboard"
          element={authenticated ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* What If Route (Protected) */}
        <Route
          path="/what-if"
          element={authenticated ? <WhatIf /> : <Navigate to="/login" />}
        />

        {/* Financials Route (Protected) */}
        <Route
          path="/financials"
          element={authenticated ? <FinancialForm /> : <Navigate to="/login" />}
        />

        {/* Catch-All Route (redirects to dashboard or login based on auth) */}
        <Route
          path="*"
          element={<Navigate to={authenticated ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
