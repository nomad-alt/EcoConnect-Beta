import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

const EventCard = ({ event, onInterest, onUninterest, interested }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShare = () => {
    setShowModal(true);
  };

  const shareUrl = window.location.href;
  console.log(`This is the link for this page: ${shareUrl}`);
  return (
    <div className="event-card">
      <img src={event.imageUrl} alt={event.title} />
      <h2>{event.organization}</h2>
      <h2>{event.title}</h2>
      <p>{event.location}</p>
      <p>{event.startDate}</p>
      <button onClick={handleShare}>Share</button>
      {/* För att kunna dela linkiden och facebook åste sidan hostas */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Share this organization</h2>
            <LinkedinShareButton url={shareUrl} title={event.title}>
              Share on LinkedIn
            </LinkedinShareButton>

            <TwitterShareButton
              url={shareUrl}
              title={event.title}
              hashtags={["chasAcademy", "EcoConnect"]}
              className="organization-share"
            >
              Twitter
            </TwitterShareButton>

            <FacebookShareButton
              url={shareUrl}
              quote={"Take care of environment"}
              description={event.title}
              hashtags={["chasAcademy", "EcoConnect"]}
            >
              Facebook
            </FacebookShareButton>

            <button onClick={() => setShowModal(false)}>X</button>
          </div>
        </div>
      )}
      ;
      <button
        onClick={
          interested
            ? () => onUninterest(event._id)
            : () => onInterest(event._id)
        }
      >
        {interested ? "Not Interested" : "Interested"}
      </button>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
  onInterest: PropTypes.func.isRequired,
  onUninterest: PropTypes.func.isRequired,
  interested: PropTypes.bool.isRequired,
};

export default EventCard;
