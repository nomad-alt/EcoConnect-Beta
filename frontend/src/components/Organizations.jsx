import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import OrganizationList from './OrganizationList';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import oceanImage from '../assets/Biotopes/Ocean.jpg';
import forestImage from '../assets/Biotopes/Forest.jpg';
import desertImage from '../assets/Biotopes/Desert.jpg';
import jungleImage from '../assets/Biotopes/Jungle.jpg';
import oceanHero from '../assets/Desktop Landing Hero/oceanHero.png'

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryFilter = searchParams.get('category');
  const { category } = useParams();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch(`/api/organizations${categoryFilter ? `?category=${categoryFilter}` : ''}`);
        const data = await response.json();
        setOrganizations(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrganizations();
  }, [categoryFilter]);

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

  return (
    <div className="organizations">
      <Navbar />
      <h1>Organizations</h1>
      <p>Explore various climate organizations.</p>
      <OrganizationList organizations={organizations} category={category} getImageUrl={getImageUrl} />
    </div>
  );
};

export default Organizations;
