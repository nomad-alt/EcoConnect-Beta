import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

import oceanImage from '../assets/Biotopes/Ocean.jpg';
import forestImage from '../assets/Biotopes/Forest.jpg';
import desertImage from '../assets/Biotopes/Desert.jpg';
import jungleImage from '../assets/Biotopes/Jungle.jpg';

const Home = () => {
  const [biotopes, setBiotopes] = useState([]);

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

  return (
    <div className="home-page">
    <Navbar key="navbar" />

     <div className="categories">
      {biotopes.map((biotope, index) => (
        <Link key={biotope.category} to={`/organizations/${biotope.category}`}>
          <img className="category-image" src={getImage(biotope.title)} alt={biotope.title} />
          <h3 className="categoryTitle">{biotope.title}</h3>
        </Link>
      ))}
    </div>
  </div>
);
};

export default Home;
