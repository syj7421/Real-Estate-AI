// src/components/Map/MapView.jsx
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import { facilities } from "../../data/facilities";
import { getDistanceMeters } from "../../utils/distance";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import CustomerFacilMarker from "./CustomerFacilMarker";
import ReactDOMServer from "react-dom/server";
import { properties } from "../../data/properties";
import { freeTramZone } from "../../data/freeTramZone";
import melbourneCitySuburb from "../../data/melbourne city analysis/melbourneCitySuburbs.json";

// Leaflet 기본 아이콘 설정
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// 붉은 점 아이콘
const redIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export default function MapView({ selectedCategory, showTramZone }) {
  const [selectedProperty, setSelectedProperty] = useState(null);

  const filteredFacilities = selectedProperty
    ? facilities.filter(
        (fac) =>
          getDistanceMeters(
            selectedProperty.lat,
            selectedProperty.lng,
            fac.lat,
            fac.lng
          ) <= 800 &&
          fac.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : [];

  return (
    <div className="pt-16">
      <MapContainer
        center={[properties[0].lat, properties[0].lng]}
        zoom={15}
        className="w-[70vw] mx-auto"
        style={{ height: "90vh" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {properties.map((property) => (
          <Marker
            key={property.name}
            position={[property.lat, property.lng]}
            icon={redIcon}
            eventHandlers={{
              click: () => setSelectedProperty(property),
            }}
          >
            <Popup>
              {property.name}
              <br />
              Click to show nearby facilities
            </Popup>
          </Marker>
        ))}

        {selectedProperty &&
          filteredFacilities.map((fac, idx) => (
            <Marker
              key={fac.name}
              position={[fac.lat, fac.lng]}
              icon={
                new L.DivIcon({
                  html: ReactDOMServer.renderToString(
                    <CustomerFacilMarker number={idx + 1} />
                  ),
                  className: "",
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

        <GeoJSON
          data={melbourneCitySuburb}
          style={{
            color: "#333333",
            fillColor: "#999999",
            fillOpacity: 0.25,
            weight: 4,
          }}
        />

        {showTramZone && (
          <GeoJSON
            data={freeTramZone}
            style={{
              color: "#5C8B2F",
              fillColor: "#92C359",
              fillOpacity: 0.6,
              weight: 4,
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}
