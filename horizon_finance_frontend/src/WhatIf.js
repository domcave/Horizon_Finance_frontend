import React, { useState } from 'react';
import Dropdown from './components/Dropdown';

const WhatIfPage = () => {
  const [selectedEvent, setSelectedEvent] = useState('');

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="what-if-page">
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
