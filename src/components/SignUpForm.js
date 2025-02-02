import React, { useState } from "react";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/SignUpForm.css";

const SignUpForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const fullName = formData.get("name");
    const username = formData.get("username");
    const password = formData.get("password");

    if (!email || !fullName || !username || !password) {
      alert("Please fill out all fields.");
      return;
    }

    const [firstName, lastName = ""] = fullName.trim().split(" ");

    try {
      const response = await axios.post(
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

      console.log("Registration successful:", response.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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
    </div>
  );
};

export default SignUpForm;
