// src/hooks/useSearchNearbyAmenities.js
export default async function searchNearbyAmenities({ lat, lng, radius, amenities }) {
    // build Overpass QL
  const query = `
    [out:json][timeout:25];
    (
      ${amenities
        .map(tag => `node["amenity"="${tag}"](around:${radius},${lat},${lng});`)
        .join('\n')}
    );
    out body;`;
  const url =
    'https://overpass-api.de/api/interpreter?data=' +
    encodeURIComponent(query);

  const res = await fetch(url);
  if (!res.ok) throw new Error('Overpass request failed');
  const data = await res.json();

  return data.elements.map(elem => ({
    id: elem.id,
    name: elem.tags.name || elem.tags.amenity,
    lat: elem.lat,
    lng: elem.lon,
    type: elem.tags.amenity,
  }));
}
