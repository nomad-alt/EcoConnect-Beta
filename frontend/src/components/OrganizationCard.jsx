import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

const OrganizationCard = ({
  organization,
  user,
  onLike,
  onUnlike,
  imageUrl,
}) => {
  console.log('User in OrganizationCard: ', user);

  const shareUrl = window.location.href;
  const { name, description, category, website, donateLink, additionalLinks } =
    organization;
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    console.log(`handleLike called with orgId: ${organization.id}`);

    if (!user) {
      window.location.href = "/login";
      return;
    }
    try {
      const response = await fetch(
        `/api/users/${user.id}/likedOrganizations/${organization.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        // Update the state to reflect that the organization has been liked
        setLiked(true);
        onLike(organization.id); // Notify parent component that the organization has been liked
      } else {
        // Log the status and status text of the response
        console.error(
          "An error occurred while liking the organization, status:",
          response.status,
          "status text:",
          response.statusText
        );
      }
    } catch (error) {
      // Handle any errors that occur while sending the request
      console.error("An error occurred while liking the organization", error);
    }
  };

  const handleUnlike = async () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    try {
      const response = await fetch(
        `/api/users/${user.id}/likedOrganizations/${organization.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        if (response.ok) {
          setLiked(false);
          onUnlike(organization.id);
        }
      } else {
        console.error(
          "An error occurred while unliking the organization, status:",
          response.status,
          "status text:",
          response.statusText
        );
      }
    } catch (error) {
      console.error(
        "An error occurred while unliking the organization:",
        error
      );
    }
  };


  const [showModal, setShowModal] = useState(false);

  const handleShare = () => {
    setShowModal(true);
  };

  const handleDonate = () => {
    window.open(donateLink, "_blank");
  };

  return (
    <div className="organization-card">
      <div className='image-container'>
        <img src={imageUrl} alt={name} className="organization-image" />
        <div className='website'>
          <a href={website} target="_blank" rel="noopener noreferrer" className="organization-website">
            Go to website
          </a>
        </div>
      </div>
      <h3 className="organization-name">{name}</h3>
      <p className="organization-description">{description}</p>
      <div className="organization-buttons">
        {liked ? (
          <button onClick={handleUnlike} className="organization-remove">
            Remove
          </button>
        ) : (
          <button onClick={handleLike} className="organization-like">
            Like
          </button>
        )}
        <button onClick={handleShare}>Share</button>
        <button onClick={handleDonate} className="organization-donate">
          Donate
        </button>
      </div>
      {showModal && (
        <div className="overlay">
          <div className="modal-content">
            <h4 className="share-organization">Share this organization</h4>

            <LinkedinShareButton
              url={shareUrl} /* title={title} summary={description} */
            >
              Share on LinkedIn
            </LinkedinShareButton>

            <TwitterShareButton
              url={shareUrl}
              title={name}
              hashtags={["chasAcademy", "EcoConnect"]}
              className="organization-share"
            >
              Twitter
            </TwitterShareButton>

            <FacebookShareButton
              url={shareUrl}
              quote={"Take care of environment"}
              description={description}
              hashtags={["chasAcademy", "EcoConnect"]}
            >
              Facebook
            </FacebookShareButton>

            <button onClick={() => setShowModal(false)}>X</button>
          </div>
        </div>
      )}
      <ul className="additional-links">
        {additionalLinks?.map((link, index) => (
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
    //imageUrl: PropTypes.string.isRequired,
  }),
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }),
  onLike: PropTypes.func.isRequired,
  onUnlike: PropTypes.func.isRequired,
};

export default OrganizationCard;