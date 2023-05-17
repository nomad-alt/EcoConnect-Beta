import React from 'react';

const EventPopUp = ({ event, onClose }) => {
  return (
    <div className="event-popup">
      <button onClick={onClose}>Close</button>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      {/* Add more event details here */}
    </div>
  );
};

export default EventPopUp;
