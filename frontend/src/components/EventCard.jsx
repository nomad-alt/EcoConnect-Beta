import React from 'react';

const EventCard = ({ event, onClick }) => {
  const { title, description, location, link, startDate, endDate, category, imageUrl } = event;

  const handleInterested = () => {
    // Implement the interested functionality here
  };

  const handleShare = () => {
    // Implement the share functionality here
  };

  return (
    <div className="event-card" onClick={onClick}>
      <img src={imageUrl} alt={title} className="event-image" />
      <h3 className="event-title">{title}</h3>
      <p className="event-description">{description}</p>
      <p className="event-location">{location}</p>
      <p className="event-dates">{`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`}</p>
      <p className="event-category">{category}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className="event-link">
        More Info
      </a>
      <div className="event-buttons">
        <button onClick={handleInterested} className="event-interested">Interested</button>
        <button onClick={handleShare} className="event-share">Share</button>
      </div>
    </div>
  );
};

export default EventCard;
