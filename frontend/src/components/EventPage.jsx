import React, { useState, useEffect } from 'react';
import EventList from './EventList';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');

  // Fetch events from the server when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch events from your server
  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events'); // Replace with your API endpoint
      const data = await response.json();
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      console.error('An error occurred while fetching events', error);
    }
  };

  // Filter events by category
  const filterEventsByCategory = (category) => {
    setCategoryFilter(category);

    if (category) {
      setFilteredEvents(events.filter((event) => event.category === category));
    } else {
      setFilteredEvents(events);
    }
  };

  return (
    <div className="event-page">
      <h1>Events</h1>

      {/* Category filter buttons */}
      <div className="category-filter">
        <button onClick={() => filterEventsByCategory('')}>All</button>
        <button onClick={() => filterEventsByCategory('ocean')}>Ocean</button>
        <button onClick={() => filterEventsByCategory('forest')}>Forest</button>
        <button onClick={() => filterEventsByCategory('desert')}>Desert</button>
        <button onClick={() => filterEventsByCategory('jungle')}>Jungle</button>
      </div>

      {/* Event list */}
      <EventList events={filteredEvents} />
    </div>
  );
};

export default EventPage;
