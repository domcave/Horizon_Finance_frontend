import React, { useState } from 'react';
import Dropdown from './components/Dropdown';
import Navbar from './components/Navbar';  // Import your Navbar component
import './WhatIfPage.css'; // Optional for custom styles

const HousePopup = ({ isOpen, onClose }) => {
    const [hasHouse, setHasHouse] = useState(null); // Will be true or false
    const [houseCost, setHouseCost] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Process the house info as needed.
      console.log('Has House:', hasHouse, 'House Cost:', houseCost);
      onClose(); // Close the popup after submission
    };
  
    if (!isOpen) return null; // Do not render if not open
  
    return (
      <div className="house-popup-overlay">
        <div className="house-popup">
          <h2>House Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="house-popup__question">
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
              <div className="house-popup__cost">
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
            <div className="house-popup__actions">
              <button type="submit">Submit</button>
              <button type="button" onClick={onClose}>Close</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

const WhatIfPage = () => {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [showHousePopup, setShowHousePopup] = useState(false);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    if (event === 'House') {
        setShowHousePopup(true);
      }
  };

  return (
    <div className="what-if-page">
      <Navbar /> {/* Include Navbar here */}


      <h1>What If</h1>
      <Dropdown onSelect={handleEventSelect} />

      {selectedEvent && (
        <div className="event-info">
          <h2>You selected: {selectedEvent}</h2>
          <p>Here is more information about the event: {selectedEvent}.</p>
        </div>
      )}
            <HousePopup isOpen={showHousePopup} onClose={() => setShowHousePopup(false)} />

    </div>
  );
};

export default WhatIfPage;
