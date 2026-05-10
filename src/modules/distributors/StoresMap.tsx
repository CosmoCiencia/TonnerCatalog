import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import type { Distributor } from './types';

interface StoresMapProps {
  distributors: Distributor[];
}

type DistributorPoint = {
  distributor: Distributor;
  lat: number;
  lng: number;
};

const bogotaCenter: [number, number] = [4.6062, -74.1057];

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };

    return entities[char] ?? char;
  });
}

function getCoordinates(distributor: Distributor) {
  const lat = Number(distributor.lat ?? distributor.coordinates?.[0]);
  const lng = Number(distributor.lng ?? distributor.coordinates?.[1]);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null;
  }

  return { lat, lng };
}

export default function StoresMap({ distributors }: StoresMapProps) {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const [selectedDistributor, setSelectedDistributor] = useState<Distributor | null>(null);

  const points = useMemo<DistributorPoint[]>(() => {
    return distributors
      .map((distributor) => {
        const coordinates = getCoordinates(distributor);
        if (!coordinates) return null;

        return {
          distributor,
          lat: coordinates.lat,
          lng: coordinates.lng,
        };
      })
      .filter((point): point is DistributorPoint => Boolean(point));
  }, [distributors]);

  useEffect(() => {
    if (!mapElementRef.current || mapRef.current) return;

    const map = L.map(mapElementRef.current, {
      attributionControl: true,
      scrollWheelZoom: false,
      zoomControl: false,
    }).setView(bogotaCenter, 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19,
    }).addTo(map);

    markersRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    setTimeout(() => map.invalidateSize(), 0);

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const markers = markersRef.current;
    if (!map || !markers) return;

    markers.clearLayers();

    const icon = L.divIcon({
      className: 'catalog-map-pin',
      html: '<span></span>',
      iconAnchor: [13, 28],
      iconSize: [26, 28],
      popupAnchor: [0, -24],
    });

    points.forEach(({ distributor, lat, lng }) => {
      const marker = L.marker([lat, lng], { icon }).addTo(markers);
      marker.bindPopup(
        `<div class="catalog-map-popup">
          <h2>${escapeHtml(distributor.name)}</h2>
          <p>${escapeHtml(distributor.address)} · ${escapeHtml(distributor.city)}</p>
          <span>${escapeHtml(distributor.email || '')}</span>
          <strong>${escapeHtml(distributor.phone)}</strong>
        </div>`,
      );
      marker.on('click', () => setSelectedDistributor(distributor));
    });
  }, [points]);

  const focusSelectedDistributor = () => {
    const coordinates = selectedDistributor ? getCoordinates(selectedDistributor) : null;
    if (!coordinates || !mapRef.current) return;

    mapRef.current.flyTo([coordinates.lat, coordinates.lng], 15, {
      duration: 0.7,
    });
  };

  return (
    <>
      <div ref={mapElementRef} className="catalog-real-map" aria-label="Mapa real de puntos de venta" />
      {selectedDistributor ? (
        <button className="catalog-map-selected" type="button" onClick={focusSelectedDistributor}>
          <strong>{selectedDistributor.name}</strong>
          <span>
            {selectedDistributor.address} · {selectedDistributor.city}
          </span>
        </button>
      ) : null}
    </>
  );
}
