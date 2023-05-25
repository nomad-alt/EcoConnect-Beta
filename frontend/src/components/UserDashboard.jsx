import React, { useState, useEffect, useContext } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import DashboardCard from './DashboardCard';
import Navbar from './Navbar';

const UserDashboard = () => {
  const { user } = useAuthContext();
  const [likedOrganizations, setLikedOrganizations] = useState([]);
  const handleUnlike = (orgId) => {
    setLikedOrganizations(likedOrganizations.filter(org => org._id !== orgId));
  };
  const handleLike = (orgId) => {
    setLikedOrganizations([...likedOrganizations, orgId]);
};
  

  useEffect(() => {
    // Fetch liked organizations from the API
const fetchLikedOrganizations = async () => {
  if (!user) return;
  
  try {
    const response = await fetch(`/api/users/${user.id}/likedOrganizations`, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      setLikedOrganizations(data.likedOrganizations || []);
    } else {
      console.error('Failed to fetch liked organizations');
      setLikedOrganizations([]);
    }
  } catch (error) {
    console.error('Failed to fetch liked organizations', error);
    setLikedOrganizations([]);
  }
};

    fetchLikedOrganizations();
  }, [user]);


  return (
    <div className="user-dashboard">
      <Navbar />
      <h2>Liked Organizations</h2>
      <div className="user-organizations">
        {likedOrganizations.map((org) => (
          <DashboardCard
          key={org._id}
          organization={org}
          onUnlike={() => handleUnlike(org._id)}
          user={user}
          liked={likedOrganizations.some(o => o._id === org._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
