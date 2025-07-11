import React, { useRef } from 'react';
import useGoogleMap from '../../hooks/useGoogleMap';

const MapView = ({ onLocationSelect, onPlacesUpdate, selectedLocation, activeCategories }) => {
  const mapRef = useRef(null);
  useGoogleMap(mapRef, onLocationSelect, onPlacesUpdate, selectedLocation, activeCategories);

  return <div ref={mapRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

export default MapView;