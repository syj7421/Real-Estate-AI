import React from "react";
import Dashboard from "./Dashboard";
import MapView from "./Map/MapView";
import Hero from "./Hero";

export default function Content({ selectedMode }) {
  return (
    <main
      className={`flex-1 overflow-hidden ${
        selectedMode === "hero" ? "" : "pt-16 bg-gray-50"
      }`}
    >
      {selectedMode === "hero" && (
        <Hero
          bgImage="/carltonGarden.jpg"
          overlayOpacity={0.6}
          title1="4th most liveable city in the world"
          subtitle1="EIU 2025"
          title2="Top 6 global city in the world"
          subtitle2="Oxford 2025"
          height="h-full"
        />
      )}
      {selectedMode === "whyMelbourne" && <Dashboard />}
      {selectedMode === "amenities" && <MapView />}
      {selectedMode === "growth" && <div>Growth Content</div>}
    </main>
  );
}
