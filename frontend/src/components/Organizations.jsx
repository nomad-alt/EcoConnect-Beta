import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import OrganizationList from './OrganizationList';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';


const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryFilter = searchParams.get('category');
  const { category } = useParams();
  const [likedOrganizations, setLikedOrganizations] = useState([]);


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
    // getImageUrl implementation
  };

  return (
    <div className="organizations">
      <Navbar />
      <h1>Organizations</h1>
      <p>Explore various climate organizations.</p>

      <OrganizationList
      organizations={organizations}
      category={category}
      likedOrganizations={likedOrganizations}
     />
    </div>
  );
};

export default Organizations;
