import React, { useState, useEffect } from "react";

const Biotopes = () => {
  const [biotopes, setBiotopes] = useState([]);

  useEffect(() => {
    fetchBiotopes();
  }, []);

  const fetchBiotopes = async () => {
    try {
      const response = await fetch("/api/biotopes");
      const data = await response.json();
      setBiotopes(data);
    } catch (error) {
      console.error("Error fetching biotopes:", error);
    }
  };

  return (
    <div className="biotopes">
      <h1>Biotopes</h1>
      <div className="biotopes-grid">
        {biotopes.map((biotope) => (
          <div key={biotope._id} className="biotope-card">
            <h2>{biotope.title}</h2>
            <img src={biotope.imageUrl} alt={biotope.title} />
            <p>Category: {biotope.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Biotopes;
