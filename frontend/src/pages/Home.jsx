import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

import oceanImage from '../assets/Biotopes/Ocean.jpg';
import forestImage from '../assets/Biotopes/Forest.jpg';
import desertImage from '../assets/Biotopes/Desert.jpg';
import jungleImage from '../assets/Biotopes/Jungle.jpg';
import landingHero from '../assets/Desktop Landing Hero/landingHero.png';
import logo from '../assets/Desktop Landing Hero/logo.png';
import eventImage from '../assets/Desktop Landing Hero/eventImage.png';
import eventUnderline from '../assets/Desktop Landing Hero/eventUnderline.png';
import aboutOverlay from '../assets/Desktop Landing Hero/aboutOverlay.png';

const Home = () => {
  const [biotopes, setBiotopes] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentTab, setCurrentTab] = useState('biotopes');


  useEffect(() => {
    const fetchBiotopes = async () => {
      try {
        const response = await fetch('/api/biotopes');
        const data = await response.json();
        setBiotopes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBiotopes();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  const getImage = (category) => {
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

  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  const [isOverlayOpen, setIsOverlayOpen] = useState(false); // State to control the overlay

  const handleLearnMoreClick = () => {
    setIsOverlayOpen(true); // Open the overlay
  };


  return (
    <div className="home-page">
      <div className="heroSection">
        <img src={landingHero} alt="Hero Image" className="heroImage" />
        <div className="about-box">
          <img src={logo} alt="logo" className="logoIcon" />
          <h4 className='ecoconnectLabel'>ecoconnect</h4>
          <p className="about-text">Uniting individuals and organizations to protect the natural world.</p>
          <button className='learnMoreButton' onClick={handleLearnMoreClick}>Learn more</button>
        </div>
      </div>
      {isOverlayOpen && (
        <div className="overlay">
          <div className="overlay-content">
            <img src={aboutOverlay} alt="aboutOverlay" className='aboutImage' />
            <button className="close-overlay" onClick={() => setIsOverlayOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )
      }

      <div className="tabs">
        <button id='biotope-tab'
          className={currentTab === 'biotopes' ? 'active' : ''}
          onClick={() => setCurrentTab('biotopes')}>
          Biotopes
        </button>
        <button id='event-tab'
          className={currentTab === 'events' ? 'active' : ''}
          onClick={() => setCurrentTab('events')}>
          Events
        </button>
      </div>

      {currentTab === 'biotopes' && (
        <div className="categories">
          {biotopes.map((biotope, index) => (
            <Link key={biotope.category} to={`/organizations/${biotope.category}`}>
              <div className="category-item">
                <img className="category-image" src={getImage(biotope.title)} alt={biotope.title} />
                <div className="category-content">
                  <h3 className="categoryTitle">{biotope.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {currentTab === 'events' && (
        <section className='eventTab'>
          <div className="events">
            <div className='eventHeaderWithLine'>
              <h1 className='event-header'>Don't miss out on events!</h1>
              <img src={eventUnderline} alt="eventUnderline" className='eventUnderline' />
            </div>
            <p className='event-info'>Our events provide a unique opportunity to connect with like-minded people who are passionate about environmental issues. You'll have the chance to learn from experts in the field, participate in thought-provoking discussions, and discover new ways to make a positive impact on the planet.</p>
            <button className='event-button'>
              <Link to="/events" className='event-link'>Go to Events</Link>
            </button>
          </div>
          <img src={eventImage} alt="eventImage" className='eventImage' />
        </section>
      )
      }

      <Navbar key="navbar" />
    </div >
  );
};

export default Home;