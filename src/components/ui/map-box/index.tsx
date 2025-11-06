'use client';

import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export function MapBox({
  lat,
  long,
  address,
  siteId,
  height = '14.3rem',
}: {
  lat: number;
  long: number;
  address: string;
  siteId: number;
  height?: string;
}) {
  useEffect(() => {
    const map = L?.map('map', {
      minZoom: 2,
    });
    if (!map) return;
    if (!lat || !long) return;
    map?.setView([lat, long], 10);
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
      {},
    ).addTo(map);

    const customIcon = L.icon({
      iconUrl: '/svg/map-marker.svg',
      iconSize: [30, 30],
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
      <div id="map" style={{ height: height }} className="relative z-10" />
    </div>
  );
}

export function GroupMapBox({
  locations,
}: {
  locations?: { lat: number; long: number; address: string; siteId: number }[];
}) {
  useEffect(() => {
    const map = L?.map('map', {
      minZoom: 3,
      dragging: true,
      trackResize: false,
    });
    if (!map) return;
    if (!locations || locations.length === 0) return;
    const bounds = L.latLngBounds(locations.map((location) => [location.lat, location.long]));
    map.fitBounds(bounds);
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
      {},
    ).addTo(map);

    const customIcon = L.icon({
      iconUrl: '/svg/map-marker.svg',
      iconSize: [30, 30],
      iconAnchor: [16, 32], // [lat, long] Point of the icon which will correspond to marker's location
      popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
    });

    locations.forEach((location) => {
      L.marker([location.lat, location.long], { icon: customIcon })
        .addTo(map)
        .on('click', () => {
          L.popup()
            .setLatLng([location.lat, location.long])
            .setContent(`<a href="/sites/${location.siteId}">${location.address}</a>`)
            .openOn(map);
        });
    });
    map.zoomOut(10);
    return () => {
      map.remove();
    };
  }, [locations]);

  return (
    <div>
      <div id="map" className="relative z-10 h-[22.3rem] rounded-[3px]" />
    </div>
  );
}
