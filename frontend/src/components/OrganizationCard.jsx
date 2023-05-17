import React from 'react';

const OrganizationCard = ({ organization }) => {
  const { name, description, category, website, donateLink, additionalLinks, imageUrl } = organization;

 const handleLike = async () => {
  if (!user) {
    history.push('/login');
    return;
  }

  try {
    const response = await fetch(
      `/api/users/${user.id}/likedOrganizations/${organization.id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (response.ok) {
      // Update the state of your component to reflect that the organization has been liked
      // This is just an example. Your actual state update logic might be different.
      setLiked(true);
    } else {
      // Handle any non-200 HTTP status codes
      console.error('An error occurred while liking the organization');
    }
  } catch (error) {
    // Handle any errors that occur while sending the request
    console.error('An error occurred while liking the organization', error);
  }
};

  const handleShare = () => {
    // the share functionality here
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
        <button onClick={handleLike} className="organization-like">Like</button>
        <button onClick={handleShare} className="organization-share">Share</button>
        <button onClick={handleDonate} className="organization-donate">Donate</button>
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

export default OrganizationCard;
