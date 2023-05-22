import React, { useContext } from 'react';
import OrganizationCard from './OrganizationCard';
import { AuthContext } from '../context/AuthContext';

const OrganizationList = ({ organizations, category }) => {
  const { user } = useContext(AuthContext);
  console.log("User in OrganizationList: ", user);

  const getImageUrl = (category) => {
    switch (category) {
      case 'Ocean':
        return oceanImage;
      case 'Forest':
        return forestImage;
      case 'Desert':
        return desertImage;
      case 'Jungle':
        return jungleImage;
      default:
        return null;
    }
  };

const filteredOrganizations = organizations
    .filter(org => org.category === category)
    .map(org => ({
      ...org,
      id: org._id // Assign the correct ID property from your organization object
    }));

  const handleLike = async (orgId) => {
  if (!user) {
    console.log("User not logged in.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:5173/api/users/${user.id}/likedOrganizations/${orgId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.ok) {
      // handle successful response
      console.log(`Organization ${orgId} was liked.`);
    } else {
      // handle error response
      console.error('An error occurred while liking the organization');
    }
  } catch (error) {
    // handle network error
    console.error('An error occurred while sending the request', error);
  }
};

  return (
    <div className="organization-list">
      <h2 className="organization-category">{category}</h2>
      <div className="organization-cards">
        {filteredOrganizations.map((organization) => (
          <OrganizationCard
            key={organization.id}
            organization={organization}
            imageUrl={getImageUrl(organization.category)}
            onLike={handleLike}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default OrganizationList;
