import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../App.css';

const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const RouteButton = ({ origin, destination }) => {
  const [routeData, setRouteData] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  const handleConfirmRoute = async () => {
    try {
      const response = await axios.get('https://projetotransportadoraback.vercel.app/api_transportadora/rotas/get_route_status');
      setRouteData(response.data);

      // Simulação de coordenadas entre origem e destino
      const simulatedCoords = [
        [-23.5505, -46.6333], // São Paulo
        [-22.9068, -43.1729]  // Rio de Janeiro
      ];
      setRouteCoords(simulatedCoords);
    } catch (error) {
      console.error('Erro ao obter a rota:', error);
    }
  };

  // Inicializa o mapa
  useEffect(() => {
    if (routeCoords.length > 0 && mapContainer.current && !mapInstance.current) {
      // Cria o mapa
      mapInstance.current = L.map(mapContainer.current, { attributionControl: false }).setView(routeCoords[0], 6);

      // Adiciona o tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data © OpenStreetMap contributors',
      }).addTo(mapInstance.current);

      // Adiciona os marcadores e a polilinha
      const markers = routeCoords.map(coord => L.marker(coord, { icon: customIcon }).addTo(mapInstance.current));
      const polyline = L.polyline(routeCoords, { color: 'blue' }).addTo(mapInstance.current);

      // Limpeza ao desmontar
      return () => {
        if (mapInstance.current) {
          mapInstance.current.remove();
          mapInstance.current = null;
        }
      };
    }
  }, [routeCoords]);

  return (
    <div className="route-section">
      <button className="confirm-route-button" onClick={handleConfirmRoute}>
        Confirmar Rota
      </button>

      {routeData && routeCoords.length > 0 && (
        <div className="map-container">
          <p>Rota de {origin} para {destination}</p>
          <div
            ref={mapContainer}
            style={{ height: '200px', width: '100%' }}
          ></div>

          <div className="route-info">
            <p><strong>Acidentes:</strong> {routeData.acidentes}</p>
            <p><strong>Obras:</strong> {routeData.obras}</p>
            <p><strong>Trânsito:</strong> {routeData.transito}</p>
            <p><strong>Status:</strong> {routeData.status}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteButton;