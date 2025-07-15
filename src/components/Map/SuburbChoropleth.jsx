import React from 'react';
import { GeoJSON } from 'react-leaflet';
import geoData from '../../data/house analysis/melbourneSuburbsWithChange.json'
import { getChoroplethColor } from '../../utils/colorScale';

export default function SuburbChoropleth() {

  const styleFeature = feat => ({
    fillColor: getChoroplethColor(feat.properties.change),
    weight: 1,
    color: '#333',
    fillOpacity: 0.6,
  });

  const onEachFeature = (feat, layer) => {
    const name   = feat.properties.vic_loca_2 || feat.properties.name;
    const change = feat.properties.change;
    layer.bindPopup(`${name}<br/>Δ 2013–24: ${change != null ? change.toFixed(1) : 'N/A'}%`);
  };

  return (
    <GeoJSON
      data={geoData}
      style={styleFeature}
      onEachFeature={onEachFeature}
    />
  );
}