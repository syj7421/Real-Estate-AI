// src/components/Map/LocationButton.jsx
import React from 'react';

const LocationButton = ({ onClick }) => {
  return (
    <button onClick={onClick} style={{ position: 'absolute', top: 20, left: 20, zIndex: 1000 }}>
      도보 10분 거리 시설 찾기
    </button>
  );
};

export default LocationButton;
