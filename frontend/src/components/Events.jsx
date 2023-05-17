import React from 'react';
import EventList from './EventList';

const Events = () => {
  return (
    <div className="events">
      <h1>Events</h1>
      <p>Discover climate action events and initiatives.</p>
      
      <EventList />
    </div>
  );
};

export default Events;
