// src/components/Content.jsx
import React from "react";
import Dashboard from "./Dashboard.jsx";
import MapView from "./Map/MapView.jsx";

export default function Content({ selectedMode }) {
  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      {selectedMode === "whyMelbourne" && <Dashboard />}
      {selectedMode === "amenities"     && <MapView />}

    </main>
  );
}
