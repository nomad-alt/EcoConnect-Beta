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

  const sortedByBiotope = organizations.filter(org => org.biotope === category);
  const sortedArrays = {};

  sortedByBiotope.forEach((obj) => {
    const { category } = obj;
    if (sortedArrays[category]) {
      sortedArrays[category].push(obj);
    } else {
      sortedArrays[category] = [obj];
    }
  });
  const arrayResult = Object.values(sortedArrays);

  return (
    <div className="organization-list">
      <h2 className="organization-biotope">{category.toUpperCase()}</h2>
      {arrayResult.map((organizationArray, index) => (
        <div className="organization-category" key={index}>
          <h2>{organizationArray[0].category}</h2>
          {organizationArray.map((organization) => (
            <OrganizationCard
              key={organization.id}
              organization={organization}
              onLike={handleLike}
              onUnlike={handleUnlike}
              imageUrl={organization.imageUrl}
              user={user}
            />
          ))}
        </div>
      ))}
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
