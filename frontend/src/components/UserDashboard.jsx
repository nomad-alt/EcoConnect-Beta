import React, { useState, useEffect } from 'react';
import OrganizationList from './OrganizationList';
import EventList from './EventList';

const UserDashboard = ({ userId }) => {
  const [likedOrganizations, setLikedOrganizations] = useState([]);
  const [interestedEvents, setInterestedEvents] = useState([]);

  useEffect(() => {
    // Fetch liked organizations and interested events for the user
    const fetchUserDetails = async () => {
      try {
        const userResponse = await fetch(`/api/users/${userId}`);
        const userData = await userResponse.json();

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user details');
        }

        const user = userData.user;

        // Make additional API calls or function invocations to retrieve the liked organizations and interested events
        const orgResponse = await fetch(`/api/users/${user.id}/likedOrganizations`);
        const eventResponse = await fetch(`/api/users/${user.id}/interestedEvents`);

        if (!orgResponse.ok || !eventResponse.ok) {
          throw new Error('Failed to fetch user details');
        }

        const orgData = await orgResponse.json();
        const eventData = await eventResponse.json();

        setLikedOrganizations(orgData.organizations);
        setInterestedEvents(eventData.events);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  return (
    <div className="user-dashboard">
      <h2>Liked Organizations</h2>
      <div className="user-organizations">
        {likedOrganizations.map(org => (
          <OrganizationList key={org._id} organization={org} />
        ))}
      </div>
      <h2>Interested Events</h2>
      <div className="user-events">
        {interestedEvents.map(event => (
          <EventList key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
