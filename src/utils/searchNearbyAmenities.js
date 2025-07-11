/* global google */
import ReactDOMServer from 'react-dom/server';
import CustomerMarker from '../components/Map/CustomMarker';


const CATEGORY_TYPE_MAP = {
  education: ['primary_school', 'secondary_school', 'university'],
  medical: ['hospital', 'doctor', 'clinic'],
  shopping: ['supermarket', 'grocery_store', 'department_store', 'shopping_mall', 'asian_grocery_store'],
  transport: ['train_station', 'subway_station', 'bus_station', 'transit_station', 'light_rail_station'],
  green: ['park', 'state_park', 'campground', 'rv_park'],
  culture: ['museum', 'library', 'art_gallery', 'stadium', 'concert_hall'],
};

const categoryReverseLookup = Object.fromEntries(
  Object.entries(CATEGORY_TYPE_MAP).flatMap(([category, types]) =>
    types.map(type => [type, category])
  )
);

function normalizeName(name) {
  return name.toLowerCase()
    .replace(/building\s*\d+/g, '')
    .replace(/academic|campus|centre|center|college|institute|school|university/g, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

function isRelevantPlace(place, isTransport, name) {
  const { types = [], rating = 0, userRatingCount = 0 } = place;

  if (!isTransport && ((userRatingCount < 5) || (rating < 3.0))){
    return false;
  } 

  return (
    types.some(t => CATEGORY_TYPE_MAP.education.includes(t) && /university|college|high school|primary school/.test(name)) ||
    (types.includes('hospital') && name.includes('hospital')) ||
    (types.includes('clinic') && /specialist|surgery|medical|health/.test(name)) ||
    types.includes('asian_grocery_store') ||
    types.includes('department_store') ||
    types.includes('shopping_mall') ||
    ((types.includes('supermarket') || types.includes('grocery_store')) && /coles|woolworths|aldi/.test(name)) ||
    isTransport ||
    (types.some(t => CATEGORY_TYPE_MAP.green.includes(t)) && userRatingCount >= 10 && rating >= 3.8) ||
    (types.some(t => CATEGORY_TYPE_MAP.culture.includes(t)) && userRatingCount >= 10 && rating >= 3.8)
  );
}

function removeDuplicatePlaces(places) {
  const seen = new Set();
  return places.filter(place => {
    const norm = normalizeName(place.displayName);
    if ([...seen].some(existing => norm.includes(existing) || existing.includes(norm))) return false;
    seen.add(norm);
    return true;
  });
}

function assignCategory(place) {
  const matched = place.types?.map(t => categoryReverseLookup[t]).find(Boolean);
  place.category = matched || null;
  return place;
}

function createMarker(place, index, map, AdvancedMarkerElement) {
  const markerHTML = ReactDOMServer.renderToStaticMarkup(<CustomerMarker number={index + 1} />);
  const wrapper = document.createElement('div');
  wrapper.innerHTML = markerHTML;
  return new AdvancedMarkerElement({
    map,
    position: place.location,
    title: place.displayName,
    content: wrapper.firstChild,
  });
}

export async function searchNearbyAmenities({ map, clickedLocation, radius, includedPrimaryTypes }) {
  const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary('places');
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

  const request = {
    locationRestriction: { center: clickedLocation, radius },
    fields: ['displayName', 'location', 'businessStatus', 'types', 'rating', 'userRatingCount'],
    includedPrimaryTypes,
    maxResultCount: 20,
    rankPreference: SearchNearbyRankPreference.DISTANCE,
    language: 'en-AU',
  };

  const { places = [] } = await Place.searchNearby(request);

  const filtered = places.filter(place => {
    if (place.businessStatus !== 'OPERATIONAL') return false;
    const types = place.types ?? [];
    const name = place.displayName?.toLowerCase() ?? '';
    const isTransport = types.some(t => CATEGORY_TYPE_MAP.transport.includes(t));
    return isRelevantPlace(place, isTransport, name);
  });

  const sortedPlaces = [...filtered].sort((a, b) => {
    const aIsTransport = (a.types ?? []).some(t => CATEGORY_TYPE_MAP.transport.includes(t));
    const bIsTransport = (b.types ?? []).some(t => CATEGORY_TYPE_MAP.transport.includes(t));
  
    if (aIsTransport && !bIsTransport) return -1;
    if (!aIsTransport && bIsTransport) return 1;
    if (!aIsTransport && !bIsTransport) {
      return (b.userRatingCount ?? 0) - (a.userRatingCount ?? 0);
    }
    return 0; // 둘 다 transport일 경우 순서 유지
  });

  const uniquePlaces = removeDuplicatePlaces(sortedPlaces).map(assignCategory);

  const markers = uniquePlaces.map((place, i) => createMarker(place, i, map, AdvancedMarkerElement));

  return { places: uniquePlaces, markers };
}
