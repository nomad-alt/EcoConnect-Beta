import React, { useState, useEffect } from 'react';
import OrganizationList from './OrganizationList';
import EventList from './EventList';

const UserDashboard = ({ userId }) => {
  const [likedOrganizations, setLikedOrganizations] = useState([]);
  const [interestedEvents, setInterestedEvents] = useState([]);

  useEffect(() => {
    // Fetch liked organizations and interested events for the user
    const fetchUserDetails = async () => {
      // Replace this with an API call to your backend
      const userOrganizations = await getUserLikedOrganizations(userId);
      const userEvents = await getUserInterestedEvents(userId);

      setLikedOrganizations(userOrganizations);
      setInterestedEvents(userEvents);
    };

    fetchUserDetails();
  }, [userId]);

  return (
    <div className="user-dashboard">
      <h2>Liked Organizations</h2>
      <div className="user-organizations">
        {likedOrganizations.map(org => (
          <OrganizationList key={org._id} organizations={likedOrganizations} category={org.category} />
        ))}
      </div>
      <h2>Interested Events</h2>
      <div className="user-events">
        {interestedEvents.map(event => (
          <EventList key={event._id} events={interestedEvents} category={event.category} />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;