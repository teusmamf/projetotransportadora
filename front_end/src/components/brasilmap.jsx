import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../App.css';

const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const DefaultRouteMap = () => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  // Coordenadas das cidades de Americo Brasiliense e Santos
  const routeCoords = [
    [-21.7249, -48.1010], // Americo Brasiliense
    [-23.9608, -46.3336]  // Santos
  ];

  useEffect(() => {
    if (mapContainer.current && !mapInstance.current) {
      // Inicializa o mapa
      mapInstance.current = L.map(mapContainer.current, { attributionControl: false }).setView(routeCoords[0], 6);

      // Adiciona o tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data © OpenStreetMap contributors',
      }).addTo(mapInstance.current);

      // Adiciona os marcadores e a rota
      routeCoords.forEach(coord => L.marker(coord, { icon: customIcon }).addTo(mapInstance.current));
      L.polyline(routeCoords, { color: 'blue' }).addTo(mapInstance.current);

      // Cleanup ao desmontar o componente
      return () => {
        if (mapInstance.current) {
          mapInstance.current.remove();
          mapInstance.current = null;
        }
      };
    }
  }, []);

  return (
    <div className="map-container">
      <h3>Mapa de Americo Brasiliense para Santos</h3>
      <div ref={mapContainer} style={{ height: '400px', width: '100%' }}></div>
    </div>
  );
};

export default DefaultRouteMap;
