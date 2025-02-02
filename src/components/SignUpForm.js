import React, { useState } from "react";
import InputField from "./InputField";
import axios from "axios";
import "../css/LoginSignup.css";

const SignUpForm = ({ setAuthenticated }) => {
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email").trim();
    const fullName = formData.get("name").trim();
    const username = formData.get("username").trim();
    const password = formData.get("password").trim();
    

    if (!email || !fullName || !username || !password) {
      alert("Please fill out all fields.");
      return;
    }

    const [firstName, lastName = ""] = fullName.split(" ");

    try {
      const registrationResponse = await axios.post(
        "http://127.0.0.1:5000/auth/register",
        {
          email: email,
          first_name: firstName,
          last_name: lastName,
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const loginResponse = await axios.post(
        "http://127.0.0.1:5000/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (loginResponse.data.access_token) {
        localStorage.setItem("userToken", loginResponse.data.access_token);
        localStorage.setItem("username", username);
        localStorage.setItem("first_name", firstName);
        console.log("User registered and logged in successfully");
        console.log("Username:", username);
        setAuthenticated(true);
        window.location.href = "/financials";
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Registration failed, try again.");
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
