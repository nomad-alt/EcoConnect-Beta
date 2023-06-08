import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import DashboardCard from './DashboardCard';
import EventCard from './EventCard'; 
import Navbar from './Navbar';

const UserDashboard = () => {
  const { user } = useAuthContext();
  const [likedOrganizations, setLikedOrganizations] = useState([]);
  const [interestedEvents, setInterestedEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('organizations');

  const handleUnlike = (orgId) => {
    setLikedOrganizations(likedOrganizations.filter(org => org._id !== orgId));
  };

  const handleUninterest = (eventId) => {
    setInterestedEvents(interestedEvents.filter(event => event._id !== eventId));
  };

  useEffect(() => {
    // Fetch liked organizations and interested events from the API
    const fetchUserInterests = async () => {
      if (!user) return;
      
      try {
        const orgResponse = await fetch(`/api/users/${user.id}/likedOrganizations`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });

        const eventResponse = await fetch(`/api/users/${user.id}/interestedEvents`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });

        if (orgResponse.ok) {
          const orgData = await orgResponse.json();
          setLikedOrganizations(orgData.likedOrganizations || []);
        } else {
          console.error('Failed to fetch liked organizations');
          setLikedOrganizations([]);
        }

        if (eventResponse.ok) {
          const eventData = await eventResponse.json();
          setInterestedEvents(eventData.interestedEvents || []);
        } else {
          console.error('Failed to fetch interested events');
          setInterestedEvents([]);
        }
      } catch (error) {
        console.error('Failed to fetch user interests', error);
      }
    };

    fetchUserInterests();
  }, [user]);

  return (
    <div className="user-dashboard">
      <Navbar />
      <h1>Profile</h1>
      <div className="user-info">
        <p>Email: {user?.email}</p>
      </div>
      <div className="tabs">
        <button onClick={() => setActiveTab('organizations')}>Liked Organizations</button>
        <button onClick={() => setActiveTab('events')}>My Events</button>
      </div>
      {activeTab === 'organizations' && (
        <div className="user-organizations">
          {likedOrganizations.map((org) => (
            <DashboardCard
              key={org._id}
              organization={org}
              onUnlike={() => handleUnlike(org._id)}
              user={user}
              liked={likedOrganizations.some(o => o._id === org._id)}
              imageUrl={org.imageUrl}
            />
          ))}
        </div>
      )}
      {activeTab === 'events' && (
        <div className="user-events">
          {interestedEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onInterest={() => handleInterest(event._id)}
              onUninterest={() => handleUninterest(event._id)}
              user={user}
              interested={interestedEvents.some(e => e._id === event._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
