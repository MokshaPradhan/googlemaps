import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapComponent = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: -34.397,
    lng: 150.644,
  };

  const options = {
    mapTypeId: 'terrain', // Topographic view
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCQEjBzl2MSx3l7rvE6aTOGkJGaQBUzQvI">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={8}
        options={options}
      >
        {/* Additional components or overlays can be added here */}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
