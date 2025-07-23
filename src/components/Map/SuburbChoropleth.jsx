import React, { useEffect, useState } from 'react';
import { GeoJSON, CircleMarker, Tooltip } from 'react-leaflet';
import { getChoroplethColor } from '../../utils/colorScale';
import { top50VicSchools } from '../../data/top50VicSchools';

// ✅ GeoJSON 정적 import
import geo2014 from '../../data/suburb analysis/every_PA_region/melbourneSuburbsWithChange_PA_2014.json';
import geo2015 from '../../data/suburb analysis/every_PA_region/melbourneSuburbsWithChange_PA_2015.json';
import geo2016 from '../../data/suburb analysis/every_PA_region/melbourneSuburbsWithChange_PA_2016.json';
import geo2017 from '../../data/suburb analysis/every_PA_region/melbourneSuburbsWithChange_PA_2017.json';
import geo2018 from '../../data/suburb analysis/every_PA_region/melbourneSuburbsWithChange_PA_2018.json';
import geo2019 from '../../data/suburb analysis/every_PA_region/melbourneSuburbsWithChange_PA_2019.json';
import geo2020 from '../../data/suburb analysis/every_PA_region/melbourneSuburbsWithChange_PA_2020.json';
import geo2021 from '../../data/suburb analysis/every_PA_region/melbourneSuburbsWithChange_PA_2021.json';
import geo2022 from '../../data/suburb analysis/every_PA_region/melbourneSuburbsWithChange_PA_2022.json';
import geo2023 from '../../data/suburb analysis/every_PA_region/melbourneSuburbsWithChange_PA_2023.json';

// ✅ 연도별 GeoJSON 매핑
const geoMap = {
  2014: geo2014,
  2015: geo2015,
  2016: geo2016,
  2017: geo2017,
  2018: geo2018,
  2019: geo2019,
  2020: geo2020,
  2021: geo2021,
  2022: geo2022,
  2023: geo2023,
};

export default function SuburbChoropleth({ startYear, showSchools }) {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    const data = geoMap[startYear];
    if (data) {
      setGeoData(data);
    } else {
      setGeoData(null);
      console.error('No GeoJSON found for year:', startYear);
    }
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
        key={startYear} 
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
