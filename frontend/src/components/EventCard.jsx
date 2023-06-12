import React from 'react';
import PropTypes from 'prop-types';

const EventCard = ({ event, onInterest, onUninterest, interested }) => {
  return (
  <div className="event-card">
    <img src={event.imageUrl} alt={event.title} />
    <h2>{event.organization}</h2>
    <h2>{event.title}</h2>
    <p>{event.location}</p>
    <p>{event.startDate}</p>
    <button onClick={interested ? () => onUninterest(event._id) : () => onInterest(event._id)}>
      {interested ? "Not Interested" : "Interested"}
    </button>
  </div>
);
};

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
  onInterest: PropTypes.func.isRequired,
  onUninterest: PropTypes.func.isRequired,
  interested: PropTypes.bool.isRequired,
};

export default EventCard;

