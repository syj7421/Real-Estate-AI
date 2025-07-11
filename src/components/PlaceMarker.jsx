// src/components/PlaceMarker.jsx
import React from 'react';
import { Marker, Popup } from 'react-leaflet';

export default function PlaceMarker({ place }) {
  return (
    <Marker position={[place.lat, place.lng]}>
      <Popup>{place.name}</Popup>
    </Marker>
  );
}
