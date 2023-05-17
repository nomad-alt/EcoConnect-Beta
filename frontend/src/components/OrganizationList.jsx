import React from 'react';
import OrganizationCard from './OrganizationCard';

const OrganizationList = ({ organizations, category }) => {
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

  const filteredOrganizations = organizations.filter(org => org.category === category);

  return (
    <div className="organization-list">
      <h2 className="organization-category">{category}</h2>
      <div className="organization-cards">
        {filteredOrganizations.map(organization => (
          <OrganizationCard key={organization._id} organization={organization} imageUrl={getImageUrl(organization.category)} />
        ))}
      </div>
    </div>
  );
};

export default OrganizationList;
