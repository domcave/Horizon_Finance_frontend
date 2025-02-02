import React, { useState } from "react";
import Dropdown from "./Dropdown";
import Navbar from "./Navbar";
import HousePopup from "./HousePopup";
import MarriagePopup from "./MarriagePopup";
import RetirementPopup from "./RetirementPopup";
import "../css/WhatIfPage.css";

const WhatIfPage = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [activePopup, setActivePopup] = useState(null);
  const [houseRecommendation, setHouseRecommendation] = useState("");
  const [marriageRecommendation, setMarriageRecommendation] = useState("");
  const [retirementRecommendation, setRetirementRecommendation] = useState("");

  const handleEventSelect = (event) => {
    setSelectedEvent(event);

    if (event === "House") {
      setActivePopup("House");
    } else if (event === "Marriage") {
      setActivePopup("Marriage");
    } else if (event === "Retirement") {
      setActivePopup("Retirement");
    } else {
      setActivePopup(null);
    }
  };

  return (
    <div className="what-if-page">
      <div className="navbar-container">
        <Navbar />
      </div>

      <div className="content-container">
        <div className="header-container">
          <h1 className="page-title">What If</h1>
          <p className="page-subtitle">
            Explore life events and their financial implications.
          </p>
          <Dropdown onSelect={handleEventSelect} />
        </div>

        {selectedEvent && (
          <div className="event-info-card">
            <h2 className="event-title">You selected: {selectedEvent}</h2>
            <p className="event-description">
              Here is more information about the event.
            </p>
          </div>
        )}

        <HousePopup
          isOpen={activePopup === "House"}
          onClose={() => setActivePopup(null)}
          setRecommendation={setHouseRecommendation}
        />

        <MarriagePopup
          isOpen={activePopup === "Marriage"}
          onClose={() => setActivePopup(null)}
          setRecommendation={setMarriageRecommendation}
        />

        <RetirementPopup
          isOpen={activePopup === "Retirement"}
          onClose={() => setActivePopup(null)}
          setRecommendation={setRetirementRecommendation}
        />

        {selectedEvent === "House" && houseRecommendation && (
          <div className="recommendation-card">
            <h3 className="recommendation-title">🏡 House Recommendation:</h3>
            <p>{houseRecommendation}</p>
          </div>
        )}

        {selectedEvent === "Marriage" && marriageRecommendation && (
          <div className="recommendation-card">
            <h3 className="recommendation-title">
              💍 Marriage Recommendation:
            </h3>
            <p>{marriageRecommendation}</p>
          </div>
        )}

        {selectedEvent === "Retirement" && retirementRecommendation && (
          <div className="recommendation-card">
            <h3 className="recommendation-title">
              🌴 Retirement Recommendation:
            </h3>
            <p>{retirementRecommendation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatIfPage;
