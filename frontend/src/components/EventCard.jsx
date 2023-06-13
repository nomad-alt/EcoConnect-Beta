import React from 'react';
import PropTypes from 'prop-types';

const EventCard = ({ event, onInterest, onUninterest, interested }) => {
  return (
    <div className="organization-card">
      <div className='image-container'>
        <img className='organization-image' src={event.imageUrl} alt={event.title} />
        <h2 className='event-name'>{event.organization}</h2>
        <p className='event-details'>{event.location}</p>
        <p className='event-details'>{event.startDate}</p>
        <p className='event-description'>{event.title}</p>
        <div className='event-buttons'>
          <button className='event-interest' onClick={interested ? () => onUninterest(event._id) : () => onInterest(event._id)}>
            {interested ? "Not Interested" : "Interested"}
          </button>
        </div>
      </div>
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

