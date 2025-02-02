import React, { useState, useEffect, useRef } from "react";
import "../css/Popup.css";
import { getMarriageRecommendation } from "../services/recommendation_service";

const MarriagePopup = ({ isOpen, onClose, setRecommendation }) => {
  const [spouseIncome, setSpouseIncome] = useState("");
  const [expectingChildren, setExpectingChildren] = useState(false);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [sendChildrenToCollege, setSendChildrenToCollege] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state
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

    setLoading(true); // Set loading to true when submitting

    try {
      const username = localStorage.getItem("username");

      if (!username) {
        console.error("Username not found in local storage");
        setRecommendation("Username is required.");
        return;
      }

      const params = {
        username: username,
        num_kids: numberOfChildren || 0, // Default to 0 if empty
        arr: 0.05, // Example annual return rate, adjust as needed
        spouse_income: spouseIncome || 0, // Default to 0 if empty
        save: sendChildrenToCollege === true ? "Yes" : "No",
        years_to_college: 18, // Default to 18 if empty
      };

      if (isNaN(params.years_to_college) || params.years_to_college <= 0) {
        console.error("Invalid value for years_to_college");
        setRecommendation("Invalid value for years to college.");
        return;
      }

      const response = await getMarriageRecommendation(params);
      console.log(response.data.recommendation);
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
      setLoading(false); // Reset loading state after request is complete
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup" ref={popupRef}>
        <h2>Marriage Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="popup__section">
            <label htmlFor="spouseIncome">Spouse Income:</label>
            <input
              id="spouseIncome"
              type="number"
              value={spouseIncome}
              onChange={(e) => setSpouseIncome(e.target.value)}
              placeholder="Enter spouse income"
            />
          </div>

          <div className="popup__section">
            <p>Are you expecting children?</p>
            <label>
              <input
                type="radio"
                name="expectingChildren"
                value="yes"
                checked={expectingChildren === true}
                onChange={() => setExpectingChildren(true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="expectingChildren"
                value="no"
                checked={expectingChildren === false}
                onChange={() => setExpectingChildren(false)}
              />
              No
            </label>
          </div>

          {expectingChildren === true && (
            <>
              <div className="popup__section">
                <label htmlFor="numberOfChildren">How many children?</label>
                <input
                  id="numberOfChildren"
                  type="number"
                  value={numberOfChildren}
                  onChange={(e) => setNumberOfChildren(e.target.value)}
                  placeholder="Enter number of children"
                />
              </div>

              <div className="popup__section">
                <p>Do you want to save for college?</p>
                <label>
                  <input
                    type="radio"
                    name="sendChildrenToCollege"
                    value="yes"
                    checked={sendChildrenToCollege === true}
                    onChange={() => setSendChildrenToCollege(true)}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="sendChildrenToCollege"
                    value="no"
                    checked={sendChildrenToCollege === false}
                    onChange={() => setSendChildrenToCollege(false)}
                  />
                  No
                </label>
              </div>
            </>
          )}

          <div className="popup__actions">
            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Submit"}{" "}
            </button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarriagePopup;
