import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import EventList from './EventList';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import eventHero from '../assets/Desktop Landing Hero/eventHero.png';
const Events = () => {
  const [events, setEvents] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryFilter = searchParams.get('biotope');
  const { biotope } = useParams();
  const [InterestedEvents, setInterestedEvents] = useState([]);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/events${categoryFilter ? `?biotope=${categoryFilter}` : ''}`);
        const data = await response.json();
        setEvents(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, [categoryFilter]);

  const getImageUrl = (category) => {
    // getImageUrl implementation
  };

  return (
    <div className="organizations">
      <div className="heroSection">
        <img src={eventHero} alt="Hero Image" className="heroImageEvents" />

      </div>
      <Navbar />

      <EventList
        events={events}
        biotope={biotope}
      />
    </div>
  );
};

export default Events;
