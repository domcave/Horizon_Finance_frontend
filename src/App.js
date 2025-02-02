import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import SignUp from "./components/SignUpForm.js";
import Dashboard from "./components/Dashboard.js";
import WhatIf from "./components/WhatIf.js";
import LoginPage from "./components/LoginPage.js";

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("userToken"); // Check authentication

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? element : null;
};

const App = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("userToken"); // Example: Token stored in localStorage

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={<ProtectedRoute element={<Dashboard />} />}
      />
      <Route
        path="/what-if"
        element={<ProtectedRoute element={<WhatIf />} />}
      />
    </Routes>
  );
};

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
