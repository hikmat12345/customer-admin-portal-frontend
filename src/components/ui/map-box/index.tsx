'use client';

import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export function MapBox({
  lat,
  long,
  address,
  siteId,
  height = '230px',
}: {
  lat: number;
  long: number;
  address: string;
  siteId: number;
  height?: string;
}) {
  useEffect(() => {
    const map = L?.map('map');
    if (!map) return;
    if (!lat || !long) return;
    map?.setView([lat, long], 10);
    // Add tile layer from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '',
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: '/svg/map-marker.svg',
      iconSize: [50, 50],
      iconAnchor: [16, 32], // [lat, long] Point of the icon which will correspond to marker's location
      popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
    });

    L.marker([lat, long], { icon: customIcon })
      .addTo(map)
      .bindPopup(`<a href="/sites/${siteId}">${address}</a>`)
      .openPopup();
    map.zoomOut(2);
    return () => {
      map.remove();
    };
  }, [lat, long, address]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div id="map" style={{ height: height }} />
    </div>
  );
}

export function GroupMapBox({
  locations,
}: {
  locations?: { lat: number; long: number; address: string; siteId: number }[];
}) {
  useEffect(() => {
    const map = L?.map('map');
    if (!map) return;
    if (!locations || locations.length === 0) return;
    const bounds = L.latLngBounds(locations.map((location) => [location.lat, location.long]));
    map.fitBounds(bounds);

    // Add tile layer from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '',
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: '/svg/map-marker.svg',
      iconSize: [50, 50],
      iconAnchor: [16, 32], // [lat, long] Point of the icon which will correspond to marker's location
      popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
    });

    locations.forEach((location) => {
      L.marker([location.lat, location.long], { icon: customIcon })
        .addTo(map)
        .bindPopup(`<a  href="/sites/${location.siteId}">${location.address}</a>`)
        .openPopup();
    });
    map.zoomOut(10);
    return () => {
      map.remove();
    };
  }, [locations]);

  return (
    <div>
      <div id="map" style={{ height: '307px', borderRadius: '3px' }} />
    </div>
  );
}
