import React from "react";
import PropTypes from "prop-types";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

const EventCard = ({ event, onInterest, onUninterest, interested }) => {
  const shareUrl = window.location.href;
  console.log(`This is the link for this page: ${shareUrl}`);
  return (
    <div className="event-card">
      <img src={event.imageUrl} alt={event.title} />
      <h2>{event.title}</h2>
      <p>{event.location}</p>
      <p>{event.startDate}</p>
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
