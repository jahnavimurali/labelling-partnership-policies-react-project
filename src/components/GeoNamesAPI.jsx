// not really required, have declared function in PolicyManagers.jsx 

import React, { useState, useEffect } from 'react';

const GeoNamesAPI = ({ searchQuery, username }) => {
  const [geodata, setGeodata] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGeodata = async () => {
      try {
        const maxRows = 1;
        const url = `http://api.geonames.org/searchJSON?q=${searchQuery}&maxRows=${maxRows}&username=${username}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`GET request failed with response code: ${response.status}`);
        }
        const data = await response.json();
        if (data.geonames && data.geonames.length > 0) {
          setGeodata(data.geonames[0]);
        } else {
          throw new Error('No geonames data found');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchGeodata();
  }, [searchQuery, username]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {geodata ? (
        <pre>{JSON.stringify(geodata, null, 2)}</pre>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default GeoNamesAPI;
