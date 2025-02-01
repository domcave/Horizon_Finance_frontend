import React, { useState } from 'react';
import Dropdown from './components/Dropdown';
import Navbar from './components/Navbar';  // Import your Navbar component
import './WhatIfPage.css'; // Optional for custom styles

const WhatIfPage = () => {
  const [selectedEvent, setSelectedEvent] = useState('');

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
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
    </div>
  );
};

export default WhatIfPage;
