// src/components/Map/MapView.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, GeoJSON, Tooltip } from "react-leaflet";
import { facilities } from "../../data/facilities";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import melbourneCitySuburb from "../../data/melbourne city analysis/melbourneCitySuburbs.json";
import { freeTramZone } from "../../data/freeTramZone";

// Leaflet 기본 아이콘 설정
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

/**
 * MapView 컴포넌트는 부모로부터 선택된 카테고리와 트램 존 표시 여부를 props로 받아
 * facilities 데이터에서 해당 카테고리 항목만 지도에 렌더링합니다.
 *
 * props:
 * - selectedCategory: string (e.g., "major", "education")
 * - showTramZone: boolean
 */
export default function MapView({ selectedCategory = "major", showTramZone = false }) {
  // facilities에서 selectedCategory와 일치하는 항목만 필터링
  const filteredFacilities = facilities.filter(
    (fac) => fac.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  return (
    <div className="pt-16 flex justify-center">
      <MapContainer
        center={[-37.8136, 144.9631]}
        zoom={13}
        className="w-[70vw] h-[90vh] mx-auto"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 필터된 시설 마커 및 툴팁 */}
        {filteredFacilities.map((fac, idx) => (
          <Marker key={`${fac.name}-${idx}`} position={[fac.lat, fac.lng]}> 
            <Tooltip direction="top" offset={[0, -10]} permanent>
              {fac.name}
            </Tooltip>
          </Marker>
        ))}

        {/* 멜버른 시 경계 */}
        <GeoJSON
          data={melbourneCitySuburb}
          style={{
            color: "#333333",
            fillColor: "#999999",
            fillOpacity: 0.25,
            weight: 4,
          }}
        />

        {/* 트램 존 표시 (옵션) */}
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
