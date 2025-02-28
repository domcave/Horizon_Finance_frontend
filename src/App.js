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

  useEffect(() => {
    setAuthenticated(!!localStorage.getItem("userToken"));
  }, []);

  return (
    <Router>
      <Routes>
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
        <Route
          path="/dashboard"
          element={authenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/what-if"
          element={authenticated ? <WhatIf /> : <Navigate to="/login" />}
        />
        <Route
          path="/financials"
          element={authenticated ? <FinancialForm /> : <Navigate to="/login" />}
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
