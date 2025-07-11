// src/components/MapView.jsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import searchNearbyAmenities  from '../hooks/searchNearbyAmenities.jsx';
import PlaceMarker from './PlaceMarker';

function ClickHandler({ setPlaces, radius, amenities }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        const places = await searchNearbyAmenities({ lat, lng, radius, amenities });
        console.log('✅ Normalized places:', places);

        setPlaces(places);
      } catch (err) {
        console.error(err);
      }
    },
  });
  return null;
}

export default function MapView() {
  const [places, setPlaces] = useState([]);
  const radius = 800; // metres
  const amenities = [
    // Education
    'school',
    'kindergarten',
    'college',
    'university'
  ];

  return (
    <MapContainer
      center={[-37.8136, 144.9631]}
      zoom={14}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ClickHandler setPlaces={setPlaces} radius={radius} amenities={amenities} />
      {places.map(place => (
        <PlaceMarker key={place.id} place={place} />
      ))}
    </MapContainer>
  );
}
