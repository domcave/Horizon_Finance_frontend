import React, { useState, useEffect, useRef } from "react";
import "../css/Popup.css";
import { getRetirementRecommendation } from "../services/recommendation_service";

const RetirementPopup = ({ isOpen, onClose, setRecommendation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetAmount, setTargetAmount] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [hasRetirementAccount, setHasRetirementAccount] = useState("");
  const [accountAPY, setAccountAPY] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const popupRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading to true when submitting

    const username = localStorage.getItem("username");
    if (!username) {
      console.error("Username not found in local storage");
      setRecommendation("Username is required.");
      setLoading(false); // Reset loading
      return;
    }

    const params = {
      username,
      savings: accountBalance || 0,
      retirement_age: retirementAge,
      arr: 0.07,
      wd_rate: 0.04,
      target_amount: targetAmount,
    };

    if (isNaN(targetAmount) || targetAmount <= 0) {
      console.error("Invalid target amount");
      setRecommendation("Invalid target amount.");
      setLoading(false); // Reset loading
      return;
    }

    try {
      const response = await getRetirementRecommendation(params);

      if (response && response.data && response.data.recommendation) {
        setRecommendation(response.data.recommendation);
      } else {
        console.error("Unexpected response structure:", response);
        setRecommendation("No recommendation available.");
      }
    } catch (error) {
      console.error("Error getting recommendation:", error);
      setRecommendation("Error occurred while fetching recommendation.");
    } finally {
      setLoading(false); // Reset loading after the request completes
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup" ref={popupRef}>
        <h2>Retirement Planning</h2>

        {/* Step 1: Target Amount */}
        {currentStep === 0 && (
          <div>
            <label>What is your target retirement amount?</label>
            <input
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
            />
            <button onClick={nextStep}>Next</button>
          </div>
        )}

        {/* Step 2: Retirement Age */}
        {currentStep === 1 && (
          <div>
            <label>At what age do you plan to retire?</label>
            <input
              type="number"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
            />
            <button onClick={nextStep}>Next</button>
            <button onClick={prevStep}>Back</button>
          </div>
        )}

        {/* Step 3: Retirement Account */}
        {currentStep === 2 && (
          <div>
            <p>Do you have a retirement account?</p>
            <label>
              <input
                type="radio"
                name="hasRetirementAccount"
                value="Yes"
                checked={hasRetirementAccount === "Yes"}
                onChange={() => setHasRetirementAccount("Yes")}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="hasRetirementAccount"
                value="No"
                checked={hasRetirementAccount === "No"}
                onChange={() => setHasRetirementAccount("No")}
              />
              No
            </label>
            <button onClick={nextStep}>Next</button>
            <button onClick={prevStep}>Back</button>
          </div>
        )}

        {currentStep === 3 ? (
          hasRetirementAccount === "Yes" ? (
            <div>
              <label>APY (Annual Percentage Yield):</label>
              <input
                type="number"
                value={accountAPY}
                onChange={(e) => setAccountAPY(e.target.value)}
              />
              <label>Current Balance:</label>
              <input
                type="number"
                value={accountBalance}
                onChange={(e) => setAccountBalance(e.target.value)}
              />
              <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Loading..." : "Submit"}{" "}
              </button>
              <button onClick={prevStep}>Back</button>
            </div>
          ) : (
            <div>
              <p>No retirement account information provided.</p>
              <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Loading..." : "Submit"}{" "}
              </button>
              <button onClick={prevStep}>Back</button>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default RetirementPopup;
