import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import OrganizationList from './OrganizationList';
import Navbar from './Navbar';

const UserDashboard = () => {
  const { user } = useAuthContext();
  const [likedOrganizations, setLikedOrganizations] = useState([]);

  useEffect(() => {
    const fetchLikedOrganizations = async () => {
      try {
        const response = await fetch(`/api/users/${user.id}/likedOrganizations`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch liked organizations');
        }

        const { likedOrganizations: orgData } = await response.json();

        if (Array.isArray(orgData)) {
          setLikedOrganizations(orgData);
        } else {
          throw new Error('Liked organizations data is not an array');
        }
      } catch (error) {
        console.error('Error fetching liked organizations:', error);
        // Handle the error state here, e.g., display an error message to the user
      }
    };

    fetchLikedOrganizations();
  }, [user.id, user.token]);

  return (
    <div className="user-dashboard">
      <Navbar />
      <h2>Liked Organizations</h2>
      <div className="user-organizations">
        {likedOrganizations.map(org => (
          <OrganizationList
            key={org._id}
            organizations={likedOrganizations}
            category={org.category}
          />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
