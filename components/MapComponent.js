import React, { useState, useEffect, useRef } from 'react';
import Script from 'next/script';

const GoogleMapsComponent = ({ defaultPlace }) => {
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const mapElementRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !isMapLoaded && window.google) {
      initMap();
      setIsMapLoaded(true); // Set map as loaded
    }
  }, [isMapLoaded]);

  const initMap = async () => {
    const geocoder = new window.google.maps.Geocoder();
    const geocoderResponse = await geocoder.geocode({ address: defaultPlace.address });
    const geocoderResult = geocoderResponse.results[0];

    const mapInstance = new window.google.maps.Map(mapElementRef.current, {
      center: geocoderResult.geometry.location,
      zoom: 19,
      tilt: 0,
      mapTypeId: 'satellite',
      mapTypeControl: false,
      fullscreenControl: false,
      rotateControl: false,
      streetViewControl: false,
      zoomControl: false,
    });

    setMap(mapInstance);
    setLocation(geocoderResult.geometry.location);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery || !window.google || !map) return;

    const geocoder = new window.google.maps.Geocoder();
    const response = await geocoder.geocode({ address: searchQuery });
    if (response.results.length > 0) {
      const newLocation = response.results[0].geometry.location;
      map.setCenter(newLocation);
      setLocation(newLocation);
    }
  };

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCQEjBzl2MSx3l7rvE6aTOGkJGaQBUzQvI&libraries=places`}
        strategy="beforeInteractive"
        onLoad={() => {
          if (!isMapLoaded) {
            initMap();
          }
        }}
      />
      <div className="flex">
        <div ref={mapElementRef} className="w-full h-screen" />
        <aside className="w-80 h-screen overflow-auto p-4 bg-gray-100">
          <form onSubmit={handleSearch} className="mb-4">
            <input
              type="text"
              placeholder="Search for places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2"
            />
            <button type="submit" className="w-full p-2 bg-blue-500 text-white mt-2">
              Search
            </button>
          </form>
          <div>
            <h2 className="font-bold">Location Details</h2>
            {location && (
              <p>Name: {defaultPlace.name}<br />Address: {defaultPlace.address}</p>
            )}
          </div>
        </aside>
      </div>
    </>
  );
};

export default GoogleMapsComponent;
