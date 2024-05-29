"use client"
import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export const GoogleMap = ({
  lat,
  long,
  address
}: { lat: number, long: number, address: string }) => {

  useEffect(() => {
    const map = L?.map('map')
    if (!map) return;
    if (!lat || !long) return;
    map?.setView([lat, long], 10);
    // Add tile layer from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: '/svg/map-marker.svg',
      iconSize: [50, 50],
      iconAnchor: [16, 32], // [lat, long] Point of the icon which will correspond to marker's location
      popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
    });

    L.marker([   lat,   long,  ], { icon: customIcon }).addTo(map)
      .bindPopup(address)
      .openPopup();

    return () => {
      map.remove(); 
    };
  }, [lat, long, address]);

  return (
    <div>    
      <div id="map" style={{ height: '230px' }} />
    </div>

  );
};



