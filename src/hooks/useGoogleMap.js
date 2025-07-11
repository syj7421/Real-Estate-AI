/* global google */
import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { searchNearbyAmenities } from '../utils/searchNearbyAmenities';
const useGoogleMap = (
  mapRef,
  onLocationSelect,
  onPlacesUpdate,
  selectedLocation,
  activeCategories
) => {
  const mapInstance = useRef(null);
  const selectedMarkerRef = useRef(null); // ✅ 클릭 위치 마커
  const nearbyMarkersRef = useRef([]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
    });

    loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary('maps');
      const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

      const melbourneCBD = { lat: -37.8136, lng: 144.9631 };
      const map = new Map(mapRef.current, {
        center: melbourneCBD,
        zoom: 14,
        mapId: 'feabc4fd011254f284cca2c8',
      });

      mapInstance.current = map;

      map.addListener('click', async (event) => {
        const clickedLocation = event.latLng;
        onLocationSelect(clickedLocation);

        // ✅ 클릭 위치 마커 표시
        if (selectedMarkerRef.current) {
          selectedMarkerRef.current.position = clickedLocation;
        } else {
          selectedMarkerRef.current = new AdvancedMarkerElement({
            position: clickedLocation,
            map,
          });
        }
      });
    });
  }, [mapRef, onLocationSelect]);

  useEffect(() => {
    if (!selectedLocation || !mapInstance.current) return;

    // ❌ 주변 마커 초기화
    nearbyMarkersRef.current.forEach((marker) => marker.map = null);
    nearbyMarkersRef.current = [];

    // ✅ 타입 설정
    const CATEGORY_TYPE_MAP = {
      education: ['primary_school', 'secondary_school', 'university'],
      medical: ['hospital', 'doctor'],
      shopping: ['supermarket', 'grocery_store', 'department_store', 'shopping_mall'],
      transport: ['train_station', 'subway_station', 'bus_station', 'transit_station', 'light_rail_station'],
      green: ['park', 'state_park', 'campground', 'rv_park'],
      culture: ['museum', 'library', 'art_gallery', 'stadium', 'concert_hall'],
    };

    let includedTypes = activeCategories.flatMap((category) => CATEGORY_TYPE_MAP[category] || []);


    searchNearbyAmenities({
      map: mapInstance.current,
      clickedLocation: selectedLocation,
      radius: 800, // 10 min walk
      includedPrimaryTypes: includedTypes,
    }).then(({ places, markers }) => {
      nearbyMarkersRef.current = markers;
      onPlacesUpdate(places);
    });
  }, [selectedLocation, activeCategories, onPlacesUpdate]);
};

export default useGoogleMap;