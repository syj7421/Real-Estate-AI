import React, { useState } from "react";
import MapView from "./Map/MapView";
import SuburbChoropleth from "./Map/SuburbChoropleth";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Dashboard() {
  const [selectedMode, setSelectedMode] = useState("amenities"); // "amenities" or "growth"
  const [startYear, setStartYear] = useState(2013); // For growth mode


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

      {/* Growth mode: year selector */}
      {selectedMode === "growth" && (
        <div style={{ padding: "1rem", background: "#f8f8f8", display: "flex", alignItems: "center", gap: "1rem" }}>
          <label htmlFor="start-year-select" style={{ fontWeight: 500 }}>
            Start Year:
          </label>
          <select
            id="start-year-select"
            value={startYear}
            onChange={e => setStartYear(Number(e.target.value))}
            style={{ fontSize: "1rem", padding: "0.25rem 0.5rem" }}
          >
            {Array.from({ length: 2023 - 2013 + 1 }, (_, i) => 2013 + i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <span style={{ color: '#666', fontSize: '0.95em' }}>
            (Growth to 2024)
          </span>
        </div>
      )}

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
            <SuburbChoropleth startYear={startYear} />
          </MapContainer>
        </div>
      )}
    </div>
  );
} 