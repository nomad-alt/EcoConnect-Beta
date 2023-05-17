import React from 'react';
import EventCard from './EventCard';
import EventPopup from './EventPopUp';

const EventList = ({ events, category }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  const filteredEvents = events.filter(event => event.category === category);

  return (
    <div className="event-list">
      <h2 className="event-category">{category}</h2>
      <div className="event-cards">
        {filteredEvents.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
      {selectedEvent && <EventPopup event={selectedEvent} onClose={handleClosePopup} />}
    </div>
  );
};

export default EventList;
