import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
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

  useEffect(() => {
    setAuthenticated(!!localStorage.getItem("userToken"));
  }, []);

  return (
    <Router baseline="/">
      <Routes>
        <Route
          path="/login"
          element={
            authenticated ? (
              <Link to="/dashboard" />
            ) : (
              <LoginPage setAuthenticated={setAuthenticated} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            authenticated ? (
              <Link to="/dashboard" />
            ) : (
              <SignUp setAuthenticated={setAuthenticated} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={authenticated ? <Dashboard /> : <Link to="/login" />}
        />
        <Route
          path="/what-if"
          element={authenticated ? <WhatIf /> : <Link to="/login" />}
        />
        <Route
          path="/financials"
          element={authenticated ? <FinancialForm /> : <Link to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={authenticated ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
