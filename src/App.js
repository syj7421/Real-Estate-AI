// App.jsx
import React, { useState } from 'react';
import MapView from './components/Map/MapView';
import Header from './components/Header/Header';

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [activeCategories, setActiveCategories] = useState(['education']);

  return (
    <div className="relative w-full h-screen">
      <MapView
        onLocationSelect={setSelectedLocation}
        onPlacesUpdate={setPlaces}
        selectedLocation={selectedLocation}
        activeCategories={activeCategories}
      />
      <Header
        selectedLocation={selectedLocation}
        places={places}
        activeCategories={activeCategories}
        onCategoryChange={setActiveCategories}
      />
    </div>
  );
}

export default App;