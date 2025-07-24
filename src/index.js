import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import "./index.css";    // ← 요게 꼭 필요



import 'leaflet/dist/leaflet.css';


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
