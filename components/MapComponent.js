import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const searchBoxRef = useRef(null);

  const mapContainerStyle = {
    width: '100%',
    height: '100vh',
  };

  const center = {
    lat: -34.397,
    lng: 150.644,
  };

  const options = {
    mapTypeId: 'terrain', // Topographic view
  };

  const onLoad = (ref) => {
    setMap(ref);
  };

  const onSearchBoxLoad = (ref) => {
    searchBoxRef.current = ref;
  };

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const newCenter = {
        lat: places[0].geometry.location.lat(),
        lng: places[0].geometry.location.lng(),
      };
      map.panTo(newCenter);
      map.setZoom(15);
    }
  };

  // Styling for the search box container
  const searchBoxContainerStyle = {
    position: 'absolute', // Absolute positioning to float over the map
    top: '10px', // Distance from the top of the map container
    left: '50%', // Centered horizontally
    transform: 'translateX(-50%)', // Adjust horizontal position to truly center
    zIndex: 10, // Ensure it's above the map layers
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCQEjBzl2MSx3l7rvE6aTOGkJGaQBUzQvI"
      libraries={['places']}
    >
      <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <div style={searchBoxContainerStyle}>
          <StandaloneSearchBox
            onLoad={onSearchBoxLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              type="text"
              placeholder="Search for places..."
              className='text-black'
              style={{ boxSizing: 'border-box', border: '1px solid transparent', width: '240px', height: '32px', padding: '0 12px', borderRadius: '3px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)', fontSize: '14px', outline: 'none', textOverflow: 'ellipses' }}
            />
          </StandaloneSearchBox>
        </div>
        <GoogleMap
          onLoad={onLoad}
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={8}
          options={options}
        >
          {/* Additional components or overlays can be added here */}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default MapComponent;
