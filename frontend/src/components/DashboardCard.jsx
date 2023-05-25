import PropTypes from 'prop-types';
import React from 'react';

const DashboardCard = ({ organization, user, onUnlike, imageUrl }) => {
  console.log('User in DashboardCard: ', user);

  const { _id, name, description, category, website, donateLink, additionalLinks } = organization;

  const handleUnlike = async () => {
    if (!user) {
        window.location.href = '/login';
        return;
    }
    try {
        const response = await fetch(`/api/users/${user.id}/likedOrganizations/${organization._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
        });

        if (response.ok) {
            onUnlike(_id);
        } else {
            console.error('An error occurred while unliking the organization, status:', response.status, 'status text:', response.statusText);
        }
    } catch (error) {
        console.error('An error occurred while unliking the organization:', error);
    }
  };

  const handleShare = () => {
    // Implement the share functionality here
  };

  const handleDonate = () => {
    window.open(donateLink, '_blank');
  };

  return (
    <div className="dashboard-card">
      <img src={imageUrl} alt={name} className="organization-image" />
      <h3 className="organization-name">{name}</h3>
      <p className="organization-description">{description}</p>
      <p className="organization-category">{category}</p>
      <a href={website} target="_blank" rel="noopener noreferrer" className="organization-website">
        Visit Website
      </a>
      <div className="organization-buttons">
        <button onClick={handleUnlike} className="organization-remove">Remove</button>
        <button onClick={handleShare} className="organization-share">
          Share
        </button>
        <button onClick={handleDonate} className="organization-donate">
          Donate
        </button>
      </div>
      <ul className="additional-links">
        {additionalLinks.map((link, index) => (
          <li key={index}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              Link {index + 1}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

DashboardCard.propTypes = {
    organization: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
      donateLink: PropTypes.string.isRequired,
      additionalLinks: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      token: PropTypes.string.isRequired,
    }).isRequired,
    onUnlike: PropTypes.func.isRequired,
    imageUrl: PropTypes.string.isRequired,
  };

export default DashboardCard;
