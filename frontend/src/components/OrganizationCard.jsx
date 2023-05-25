import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const OrganizationCard = ({ organization, user, onLike, onUnlike, imageUrl }) => {
  console.log('User in OrganizationCard: ', user);
  console.log(organization, imageUrl, user);

  const { name, description, category, website, donateLink, additionalLinks } = organization;
  const [liked, setLiked] = useState(false);


  const handleLike = async () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    try {
      const response = await fetch(`/api/users/${user.id}/likedOrganizations/${organization.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
    
      if (response.ok) {
        // Update the state to reflect that the organization has been liked
        setLiked(true);
        onLike(organization.id); // Notify parent component that the organization has been liked
      } else {
        // Log the status and status text of the response
        console.error('An error occurred while liking the organization, status:', response.status, 'status text:', response.statusText);
      }
    } catch (error) {
      // Handle any errors that occur while sending the request
      console.error('An error occurred while liking the organization', error);
    }
  };

  const handleUnlike = async () => {
    if (!user) {
        window.location.href = '/login';
        return;
    }
    try {
        const response = await fetch(`/api/users/${user.id}/likedOrganizations/${organization.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
        });

        if (response.ok) {
          if (response.ok) {
            setLiked(false);
            onUnlike(organization.id);
          }
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
    <div className="organization-card">
      <img src={imageUrl} alt={name} className="organization-image" />
      <h3 className="organization-name">{name}</h3>
      <p className="organization-description">{description}</p>
      <p className="organization-category">{category}</p>
      <a href={website} target="_blank" rel="noopener noreferrer" className="organization-website">
        Visit Website
      </a>
      <div className="organization-buttons">
      {liked ? (
  <button onClick={handleUnlike} className="organization-remove">Remove</button>
) : (
  <button onClick={handleLike} className="organization-like">Like</button>
)}

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

OrganizationCard.propTypes = {
  organization: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    donateLink: PropTypes.string.isRequired,
    additionalLinks: PropTypes.arrayOf(PropTypes.string).isRequired,
    imageUrl: PropTypes.string.isRequired,
  }),
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }),
  onLike: PropTypes.func.isRequired,
  onUnlike: PropTypes.func.isRequired,
};

export default OrganizationCard;
