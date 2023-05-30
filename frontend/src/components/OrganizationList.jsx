import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import OrganizationCard from './OrganizationCard';
import { AuthContext } from '../context/AuthContext';

const OrganizationList = ({ organizations, category, onLike }) => {

  const filteredOrganizations = organizations
    .filter((org) => org.category && org.category.toLowerCase() === category.toLowerCase())
    .map((org) => ({
      ...org,
      id: org._id,
    }));

  const [likedOrganizations, setLikedOrganizations] = useState([]);

  useEffect(() => {
    setLikedOrganizations([]);
  }, [category]);

  useEffect(() => {
    const likedOrgIds = organizations.filter((org) => likedOrganizations.includes(org.id)).map((org) => org.id);

    setLikedOrganizations(likedOrgIds);
  }, [organizations]);

  const handleLike = async (orgId) => {
    console.log(`Liked organization with id: ${orgId}`);
    onLike(orgId);
  };

  const handleUnlike = async (orgId) => {
    console.log(`Unliked organization with id: ${orgId}`);
    onUnlike(orgId);
  };

  const { user } = useContext(AuthContext);

  return (
    <div className="organization-list">
      <h2 className="organization-category">{category.toUpperCase()}</h2>

      <div className="organization-cards">
        {filteredOrganizations.map((organization) => (
          <OrganizationCard
          key={organization.id}
          organization={organization}
          onLike={handleLike}
          onUnlike={handleUnlike}
          user={user}
          />
        ))}
      </div>
    </div>
  );
};

OrganizationList.propTypes = {
  organizations: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  onLike: PropTypes.func.isRequired,
  onUnlike: PropTypes.func.isRequired,
};

export default OrganizationList;
