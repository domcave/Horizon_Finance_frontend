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
              <button type="submit">Submit</button>
              <button type="button" onClick={onClose}>Close</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const RetirementPopup = ({ isOpen, onClose }) => {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [targetAmount, setTargetAmount] = React.useState("");
    const [retirementAge, setRetirementAge] = React.useState("");
    const [hasRetirementAccount, setHasRetirementAccount] = React.useState("");
    const [accountAPY, setAccountAPY] = React.useState("");
    const [accountBalance, setAccountBalance] = React.useState("");
  
    const nextStep = () => setCurrentStep(currentStep + 1);
    const prevStep = () => setCurrentStep(currentStep - 1);
  
    if (!isOpen) return null;
  
    return (
      <div className="retirement-popup-overlay">
        <div className="retirement-popup">
          <h2>Retirement Planning</h2>
  
          {/* Step 1: Target Retirement Amount */}
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
  
          {/* Step 2: Desired Retirement Age */}
          {currentStep === 1 && (
            <div>
              <label>At what age do you want to retire?</label>
              <input
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value)}
              />
              <button onClick={prevStep}>Back</button>
              <button onClick={nextStep}>Next</button>
            </div>
          )}
  
          {/* Step 3: Do they have a retirement account? */}
          {currentStep === 2 && (
            <div>
              <label>Do you have a retirement account?</label>
              <input
                type="radio"
                id="retirementYes"
                name="retirementAccount"
                value="Yes"
                onChange={(e) => setHasRetirementAccount(e.target.value)}
              />
              <label htmlFor="retirementYes">Yes</label>
              <input
                type="radio"
                id="retirementNo"
                name="retirementAccount"
                value="No"
                onChange={(e) => setHasRetirementAccount(e.target.value)}
              />
              <label htmlFor="retirementNo">No</label>
              <button onClick={prevStep}>Back</button>
              <button onClick={nextStep}>Next</button>
            </div>
          )}
  
          {/* Step 4: If they have a retirement account */}
          {currentStep === 3 && hasRetirementAccount === "Yes" && (
            <div>
              <label>What is your account's APY (Annual Percentage Yield)?</label>
              <input
                type="number"
                value={accountAPY}
                onChange={(e) => setAccountAPY(e.target.value)}
              />
              <label>What is your current account balance?</label>
              <input
                type="number"
                value={accountBalance}
                onChange={(e) => setAccountBalance(e.target.value)}
              />
              <button onClick={prevStep}>Back</button>
              <button onClick={onClose}>Submit</button>
            </div>
          )}
  
          {/* Step 4: If they don't have a retirement account */}
          {currentStep === 3 && hasRetirementAccount === "No" && (
            <div>
              <p>Thank you for the information!</p>
              <button onClick={prevStep}>Back</button>
              <button onClick={onClose}>Submit</button>
            </div>
          )}
        </div>
      </div>
    );
  };

const WhatIfPage = () => {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [showHousePopup, setShowHousePopup] = useState(false);
  const [showMarriagePopup, setShowMarriagePopup] = useState(false);
  const [showRetirementPopup, setShowRetirementPopup] = useState(false);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);

    if (event === 'House') {
        setShowHousePopup(true);
      }
      else if (event === 'Marriage') {
        setShowMarriagePopup(true);
      }
      else if (event === 'Retirement') {
        setShowRetirementPopup(true);
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
            <RetirementPopup isOpen={showRetirementPopup} onClose={() => setShowRetirementPopup(false)} />
    </div>
  );
};

export default WhatIfPage;
