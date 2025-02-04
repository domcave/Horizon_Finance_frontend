import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginSignup.css";
import InputField from "./InputField";
import { ConnectBank } from "../services/plaid_service";
import axios from "axios";

const FinancialForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const username = localStorage.getItem("username");
  const [isBankConnected, setIsBankConnected] = useState(false); // New state to track bank connection
  const [income, setIncome] = useState("");
  const [age, setAge] = useState("");
  const isButtonDisabled = !income || !age || !isBankConnected;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!income || !age) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/user/add_income_and_age",
        {
          income: income,
          age: age,
          username: username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("userToken", response.data.access_token);

      // navigate("#/dashboard");
      window.location.href = "#/dashboard";
    } catch (err) {
      setError(err.response?.data?.message || "Error updating profile");
    }
  };

  const handleBankConnectSuccess = () => {
    setIsBankConnected(true);
  };

  return (
    <div className="signup-container">
      <h2>Enter Your Details</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <InputField
            id="income"
            type="number"
            name="income"
            placeholder="Enter your income"
            label="Income"
            onChange={(e) => setIncome(e.target.value)}
          />
          <InputField
            id="age"
            type="number"
            name="age"
            placeholder="Enter your age"
            label="Age"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="button-container">
          <ConnectBank
            user_id={username}
            onSuccess={handleBankConnectSuccess}
          ></ConnectBank>
          <button
            type="submit"
            className="cancel-button"
            onClick={handleSubmit}
            style={{ backgroundColor: isButtonDisabled ? "#ccc" : "#5f11cb" }} // Grey out button if disabled
            disabled={isButtonDisabled} // Disable button if any condition is not met
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinancialForm;
