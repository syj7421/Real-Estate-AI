// src/components/MapView.jsx
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { facilities } from "../../data/facilities";
import { getDistanceMeters } from "../../utils/distance";
import L from "leaflet";
import "leaflet/dist/leaflet.css";     
import CustomerFacilMarker from "./CustomerFacilMarker";
import ReactDOMServer from "react-dom/server";
import { properties } from "../../data/properties";

// 1️⃣ Leaflet 기본 아이콘을 로컬 번들로 지정
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Red icon for property markers
const redIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const categories = [
  "education",
  "medical",
  "park",
  "shopping",
  "culture",
  "station",
  "other"
];

export default function MapView() {
  // State for selected property and category
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("education");

  // Facilities within 800m of selected property and matching category
  const filteredFacilities = selectedProperty
    ? facilities.filter(
        (fac) =>
          getDistanceMeters(selectedProperty.lat, selectedProperty.lng, fac.lat, fac.lng) <= 800 &&
          fac.category === selectedCategory
      )
    : [];

  return (
    <div>
      {/* Header with radio buttons */}
      <div style={{ padding: "1rem", background: "#f8f8f8", display: "flex", gap: "1.5rem" }}>
        {categories.map((cat) => (
          <label key={cat} style={{ textTransform: "capitalize", cursor: "pointer" }}>
            <input
              type="radio"
              name="facility-category"
              value={cat}
              checked={selectedCategory === cat}
              onChange={() => setSelectedCategory(cat)}
              style={{ marginRight: "0.5em" }}
            />
            {cat}
          </label>
        ))}
      </div>
      <MapContainer
        center={[properties[0].lat, properties[0].lng]}
        zoom={15}
        style={{ height: "90vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Property markers */}
        {properties.map((property) => (
          <Marker
            key={property.name}
            position={[property.lat, property.lng]}
            icon={redIcon}
            eventHandlers={{
              click: () => setSelectedProperty(property),
            }}
          >
            <Popup>{property.name}<br/>Click to show nearby facilities</Popup>
          </Marker>
        ))}

        {/* Facility markers (only after property is selected) */}
        {selectedProperty &&
          filteredFacilities.map((fac, idx) => (
            <Marker
              key={fac.name}
              position={[fac.lat, fac.lng]}
              icon={
                new L.DivIcon({
                  html: ReactDOMServer.renderToString(<CustomerFacilMarker number={idx + 1} />),
                  className: "", // Prevents default styles
                  iconSize: [32, 32],
                  iconAnchor: [16, 32],
                })
              }
            >
              <Popup>
                <strong>{fac.name}</strong>
                <br />
                Category: {fac.category}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
