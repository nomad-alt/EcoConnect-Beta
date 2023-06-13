import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import EventCard from './EventCard';
import { useAuthContext } from '../hooks/useAuthContext';

const EventList = ({ events }) => {
  const { user } = useAuthContext();
  const [interestedEvents, setInterestedEvents] = useState([]);
  const [activeBiotope, setActiveBiotope] = useState('all');

  useEffect(() => {
    setInterestedEvents([]);
  }, [activeBiotope]);

  useEffect(() => {
    const interestedEventIds = events.filter((event) => interestedEvents.includes(event.id)).map((event) => event.id);
    setInterestedEvents(interestedEventIds);
  }, [events]);

  const handleInterest = async (eventId) => {
    console.log(`Interested in event with id: ${eventId}`);
    try {
      const response = await fetch(`/api/users/${user.id}/interestedEvents/${eventId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        setInterestedEvents(prev => [...prev, eventId]);
      } else {
        console.error('Failed to express interest in event');
      }
    } catch (error) {
      console.error('Failed to express interest in event', error);
    }
  };

  const handleUninterest = async (eventId) => {
    console.log(`Not interested in event with id: ${eventId}`);
    try {
      const response = await fetch(`/api/users/${user.id}/interestedEvents/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        setInterestedEvents(prev => prev.filter(id => id !== eventId));
      } else {
        console.error('Failed to express uninterest in event');
      }
    } catch (error) {
      console.error('Failed to express uninterest in event', error);
    }
  };

  const tabs = ['all', 'ocean', 'forest', 'desert', 'jungle'];

  const filteredEvents = activeBiotope === 'all' ? events : events.filter(event => event.biotope === activeBiotope);

  return (
    <div className="organization-list">
      <h1 className='organization-biotope'>Events</h1>
      <div className="event-tabs">
        {tabs.map((tab) => (
          <button id='biotope-tab' key={tab} className={activeBiotope === tab ? "active" : ""} onClick={() => setActiveBiotope(tab)}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className='organization-category'>
        {filteredEvents.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            onInterest={() => handleInterest(event._id)}
            onUninterest={() => handleUninterest(event._id)}
            interested={interestedEvents.includes(event._id)}
          />
        ))}
      </div>
    </div>
  );
};

EventList.propTypes = {
  events: PropTypes.array.isRequired,
};

export default EventList;
