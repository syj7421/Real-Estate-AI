import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';


import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 2️⃣ Tell Leaflet (and Webpack) where to load the marker images from
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl:       require('leaflet/dist/images/marker-icon.png'),
  shadowUrl:     require('leaflet/dist/images/marker-shadow.png'),
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
