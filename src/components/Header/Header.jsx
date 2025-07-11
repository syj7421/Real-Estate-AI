import React from "react";
import CategoryFilter from "./CategoryFilter";

function Header({ selectedLocation, places, activeCategories, onCategoryChange }) {
  const coords = selectedLocation?.toJSON?.();

  return (
    <div className="absolute top-0 left-0 w-full z-20 bg-white p-4 shadow-md">
      <div>
        {coords
          ? `Selected location: (${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)})`
          : 'Click on the map to select a location.'
        }
      </div>
      <div>
  {places.map((place, index) => (
    <span key={index}>
      {place.displayName}
      {' '}
      ({place.category || 'no category'})<br />
      {/* <small>{JSON.stringify(place.types)}</small><br /> */}
    </span>
  ))}
</div>


      {(
        <CategoryFilter onChange={onCategoryChange} activeCategories={activeCategories} />
      )}
    </div>
  );
}

export default Header;
