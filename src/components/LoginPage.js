import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/auth/login",
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

      localStorage.setItem("userToken", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid login credentials");
    }
  };

  return (
    <div className="homepage">
      <div className="homepage__actions">
        <h1 class="homepage_header">Welcome</h1>

        <div style={{ marginBottom: "20px" }}>
          <button onClick={() => navigate("/signup")}>Signup</button>
        </div>

        <div className="homepage__login-form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="homepage__input-group">
              <label htmlFor="email">Email: </label>
              <input
                id="email"
                type="email"
                value={email}
                className="homepage__label"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="homepage__input-group">
              <label htmlFor="password">Password: </label>
              <input
                id="password"
                type="password"
                value={password}
                className="homepage__label"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" className="homepage__login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
