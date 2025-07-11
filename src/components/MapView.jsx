// src/components/MapView.jsx
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import SuburbChoropleth from './SuburbChoropleth';
import 'leaflet/dist/leaflet.css';

export default function MapView() {
   return (
    
    <MapContainer
      center={[-37.8136, 144.9631]}
      zoom={14}
      style={{ height: '100vh', width: '100%' }}
    >
      {/* This is your map tiles source */}
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SuburbChoropleth />
   </MapContainer>
   );
 }
