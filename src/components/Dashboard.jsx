import React, { useState } from "react";
import MapView from "./Map/MapView";
import SuburbChoropleth from "./Map/SuburbChoropleth";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Dashboard() {
  const [selectedMode, setSelectedMode] = useState("amenities"); // "amenities" or "growth"

  return (
    <div>
      {/* Top-level mode selector */}
      <div style={{ 
        padding: "1rem", 
        background: "#e8f4fd", 
        borderBottom: "2px solid #007bff",
        display: "flex", 
        gap: "2rem",
        alignItems: "center"
      }}>
        <h2 style={{ margin: 0, color: "#333" }}>Real Estate Dashboard</h2>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <label style={{ 
            display: "flex", 
            alignItems: "center", 
            cursor: "pointer",
            fontWeight: selectedMode === "amenities" ? "bold" : "normal"
          }}>
            <input
              type="radio"
              name="mode-selector"
              value="amenities"
              checked={selectedMode === "amenities"}
              onChange={(e) => setSelectedMode(e.target.value)}
              style={{ marginRight: "0.5em" }}
            />
            See Nearby Amenities
          </label>
          <label style={{ 
            display: "flex", 
            alignItems: "center", 
            cursor: "pointer",
            fontWeight: selectedMode === "growth" ? "bold" : "normal"
          }}>
            <input
              type="radio"
              name="mode-selector"
              value="growth"
              checked={selectedMode === "growth"}
              onChange={(e) => setSelectedMode(e.target.value)}
              style={{ marginRight: "0.5em" }}
            />
            House Price Growth (2013–2024)
          </label>
        </div>
      </div>

      {/* Conditional content rendering */}
      {selectedMode === "amenities" ? (
        <MapView />
      ) : (
        <div style={{ height: "90vh", width: "100%" }}>
          <MapContainer
            center={[-37.8136, 144.9631]}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution="© OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <SuburbChoropleth />
          </MapContainer>
        </div>
      )}
    </div>
  );
} 