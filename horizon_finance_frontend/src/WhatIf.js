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

// New Popup component for Marriage scenario
const MarriagePopup = ({ isOpen, onClose }) => {
    console.log(isOpen);
    const [spouseIncome, setSpouseIncome] = useState('');
    const [expectingChildren, setExpectingChildren] = useState(null); // true or false
    const [numberOfChildren, setNumberOfChildren] = useState('');
    const [sendChildrenToCollege, setSendChildrenToCollege] = useState(null); // true or false
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Marriage Info:', {
        spouseIncome,
        expectingChildren,
        numberOfChildren,
        sendChildrenToCollege,
      });
      onClose();
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="marriage-popup-overlay">
        <div className="marriage-popup">
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
                  <p>Are you sending them to college?</p>
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
  const [showMarriagePopup, setShowMarriagePopup] = useState(false);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);

    if (event === 'House') {
        setShowHousePopup(true);
      }
      else if (event === 'Marriage') {
        setShowMarriagePopup(true);
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
            <MarriagePopup isOpen={showMarriagePopup} onClose={() => setShowMarriagePopup(false)} />

    </div>
  );
};

export default WhatIfPage;
