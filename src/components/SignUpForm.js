import React, { useOptimistic, useState } from "react";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/LoginSignup.css";

const SignUpForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event, setAuthenticated) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email").trim();
    const fullName = formData.get("name").trim();
    const username = formData.get("username").trim();
    const password = formData.get("password").trim();

    // Basic validation
    if (!email || !fullName || !username || !password) {
      alert("Please fill out all fields.");
      return;
    }

    const [firstName, lastName = ""] = fullName.split(" ");

    try {
      const registrationResponse = await axios.post(
        "http://127.0.0.1:5000/auth/register",
        {
          email,
          first_name: firstName,
          last_name: lastName,
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      );

      console.log("Registration Response:", registrationResponse);

      const loginResponse = await axios.post(
        "http://127.0.0.1:5000/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login Response:", loginResponse);
      console.log("Access Token:", loginResponse.data.access_token);

      if (loginResponse.data.access_token) {
        localStorage.setItem("userToken", loginResponse.data.access_token);
        localStorage.setItem("username", username);
        console.log("Token saved:", loginResponse.data.access_token);

        setAuthenticated(true); // Set authentication state
        navigate("/financials"); // Redirect to financials page
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      // Handle error during registration or login
      const errorMessage =
        err.response?.data?.message || "Registration failed, try again!";
      setError(errorMessage);
      console.error("Error:", errorMessage);
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Your Account</h2>
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
          id="name"
          type="text"
          name="name"
          placeholder="John Doe"
          label="Full Name"
        />
        <InputField
          id="username"
          type="text"
          name="username"
          placeholder="johndoe"
          label="Username"
        />
        <InputField
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          label="Password"
        />
        <button type="submit" className="submit-button">
          Sign Up
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <a href="/login" className="signup-link">
          Log In
        </a>
      </p>
    </div>
  );
};

export default SignUpForm;
