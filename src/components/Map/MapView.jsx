// src/components/MapView.jsx
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { facilities } from "../../data/facilities";
import { getDistanceMeters } from "../../utils/distance";
import L from "leaflet";
import "leaflet/dist/leaflet.css";     
import CustomerFacilMarker from "./CustomerFacilMarker";
import ReactDOMServer from "react-dom/server";

// 1️⃣ Leaflet 기본 아이콘을 로컬 번들로 지정
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import SuburbChoropleth from "./SuburbChoropleth";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const bourkeSt = { lat: -37.8179, lng: 144.9546 }; // 640 Bourke St

export default function MapView() {
  const [showFacilities, setShowFacilities] = useState(false);

  // 800 m(도보 10 분) 이내 시설만 필터
  const nearbyFacilities = facilities.filter((fac) =>
    getDistanceMeters(bourkeSt.lat, bourkeSt.lng, fac.lat, fac.lng) <= 800
  );

  return (
    <MapContainer
      center={[bourkeSt.lat, bourkeSt.lng]}
      zoom={16}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* 매물 위치 (기본 파란색 아이콘 → 붉은색으로 바꾸고 싶다면 별도 커스텀 아이콘 정의) */}
      <Marker
        position={[bourkeSt.lat, bourkeSt.lng]}
        eventHandlers={{ click: () => setShowFacilities(true) }}
      >
        <Popup>640 Bourke St (Click to show nearby facilities)</Popup>
      </Marker>

      {/* 거리 조건을 만족하면 시설 마커 표시 */}
      {showFacilities &&
        nearbyFacilities.map((fac, idx) => (
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
        <SuburbChoropleth />
    </MapContainer>
  );
}
