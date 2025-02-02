import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginSignup.css";
import InputField from "./InputField";
import { ConnectBank } from "../services/plaid_service";

const FinancialForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const income = formData.get("income");
    const age = formData.get("age");

    if (!income || !age) {
      setError("Both fields are required.");
      return;
    }

    console.log("Income:", income);
    console.log("Age:", age);

    navigate("/dashboard");
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
          />
          <InputField
            id="age"
            type="number"
            name="age"
            placeholder="Enter your age"
            label="Age"
          />
        </div>
        <div className="button-container">
          <ConnectBank></ConnectBank>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinancialForm;
