import React, { useEffect, useState } from 'react';
import { GeoJSON, CircleMarker, Tooltip } from 'react-leaflet';
import { getChoroplethColor } from '../../utils/colorScale';
import { top50VicSchools } from '../../data/top50VicSchools';

export default function SuburbChoropleth({ startYear, showSchools }) {
  const [geoData, setGeoData] = useState(null);
  const paColumn = `PA_${startYear}_to_end`;

  useEffect(() => {
    // The file path was incorrect: it should use "house analysis" (with a space), not "house-analysis" (with a dash), and the extension is .geojson not .json
    // Try both .geojson and .json in case of static file server config issues
    let url = `/every_PA_region/melbourneSuburbsWithChange_${startYear}.json`;
    // If running in dev and .geojson fails (returns HTML), fallback to .json
    // We'll check for this in the fetch error handler below
    setGeoData(null);
    fetch(url)
      .then(res => res.json())
      .then(setGeoData)
      .catch(err => {
        setGeoData(null);
        console.error('Failed to load GeoJSON:', err);
      });
  }, [startYear]);

  if (!geoData) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading map data...</div>;
  }

  const styleFeature = feat => ({
    fillColor: getChoroplethColor(feat.properties.change),
    weight: 1,
    color: '#333',
    fillOpacity: 0.6,
  });

  const onEachFeature = (feat, layer) => {
    const name = feat.properties.vic_loca_2 || feat.properties.name;
    const value = feat.properties.change;
    const yearLabel = `Δ ${startYear}–2024`;
    layer.bindPopup(`${name}<br/>${yearLabel}: ${value != null ? value.toFixed(1) : 'N/A'}%`);
  };

  return (
    <>
      <GeoJSON
        data={geoData}
        style={styleFeature}
        onEachFeature={onEachFeature}
      />
      {showSchools && top50VicSchools.map(school => (
        <CircleMarker
          key={school.name}
          center={[school.lat, school.lng]}
          radius={6}
          pathOptions={{ color: '#6f42c1', fillColor: '#6f42c1', fillOpacity: 0.95 }}
        >
          <Tooltip direction="top" offset={[0, -8]}>{school.name}</Tooltip>
        </CircleMarker>
      ))}
    </>
  );
}