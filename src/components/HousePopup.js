import React, { useState, useEffect, useRef } from "react";
import "../css/Popup.css";
import { getHouseRecommendation } from "../services/recommendation_service"; // Import your API service

const HousePopup = ({ isOpen, onClose, setRecommendation }) => {
  const [hasHouse, setHasHouse] = useState(null);
  const [houseCost, setHouseCost] = useState(0);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get the username from localStorage
      const username = localStorage.getItem("username");

      if (!username) {
        console.error("Username not found in local storage");
        setRecommendation("Username is required.");
        return;
      }

      // Prepare parameters for the API call
      console.log("House cost:", houseCost);

      const params = {
        username: username,
        owned_house_price: houseCost || 0, // Default to 0 if empty
      };

      if (isNaN(params.owned_house_price) || params.owned_house_price < 0) {
        console.error("Invalid value for house cost");
        setRecommendation("Invalid value for house cost.");
        return;
      }

      const response = await getHouseRecommendation(params);

      if (response && response.data && response.data.recommendation) {
        setRecommendation(response.data.recommendation);
      } else {
        console.error("Unexpected response structure:", response);
        setRecommendation("No recommendation available.");
      }
    } catch (error) {
      console.error("Error getting recommendation:", error);
      setRecommendation("Error occurred while fetching recommendation.");
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup" ref={popupRef}>
        <h2>House Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="popup__section">
            <p>Do you currently have a house?</p>
            <label>
              <input
                type="radio"
                name="hasHouse"
                value="yes"
                checked={hasHouse === true}
                onChange={() => setHasHouse(true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="hasHouse"
                value="no"
                checked={hasHouse === false}
                onChange={() => setHasHouse(false)}
              />
              No
            </label>
          </div>

          {hasHouse === true && (
            <div className="popup__section">
              <label htmlFor="houseCost">How much does your house cost?</label>
              <input
                id="houseCost"
                type="number"
                value={houseCost}
                onChange={(e) => setHouseCost(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
          )}

          <div className="popup__actions">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HousePopup;
