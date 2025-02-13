import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginSignup.css";
import axios from "axios";
import InputField from "./InputField";
import { BACKEND_BASE_URL } from "../environment";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const password = formData.get("password");
    const email = formData.get("email");

    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/auth/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("userToken", response.data.access_token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("first_name", response.data.first_name);

      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.response?.data?.message || "Invalid login credentials");
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="welcome-title">Welcome to Horizon Finance!</h1>
        <div className="signup-container">
          <h2>Log In</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <InputField
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              label="Email"
            />
            <InputField
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              label="Password"
            />
            <button type="submit" className="submit-button">
              Log In
            </button>
          </form>
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="signup-link">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
