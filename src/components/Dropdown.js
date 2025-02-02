import React, { useState } from 'react';
import '../css/Dropdown.css';  // Optional for custom styles

const Dropdown = ({ onSelect }) => {
  const [selectedEvent, setSelectedEvent] = useState('');

  const handleChange = (event) => {
    setSelectedEvent(event.target.value);
    onSelect(event.target.value); // Pass the selected value to the parent
  };

  return (
    <div className="dropdown-container">
      <label htmlFor="event-dropdown" className="dropdown-label">Select an Event:</label>
      <select
        id="event-dropdown"
        value={selectedEvent}
        onChange={handleChange}
        className="dropdown"
      >
        <option value="">Select...</option>
        <option value="Marriage">Marriage</option>
        <option value="House">New House</option>
        <option value="Retirement">Retirement</option>
      </select>
    </div>
  );
};

export default Dropdown;
