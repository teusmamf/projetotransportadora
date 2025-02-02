import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../App.css';

const accidentLocation = [-25.350, -51.480]; // Localização default entre Guarapuava e Curitiba (BR)

const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const ViewLocalButton = ({ show }) => {
  const [showMap, setShowMap] = useState(false);
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (showMap && mapContainer.current && !mapInstance.current) {
      // Inicializa o mapa
      mapInstance.current = L.map(mapContainer.current, { attributionControl: false }).setView(accidentLocation, 10);

      // Adiciona o tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data © OpenStreetMap contributors',
      }).addTo(mapInstance.current);

      // Adiciona o marcador
      L.marker(accidentLocation, { icon: customIcon }).addTo(mapInstance.current);
    }

    // Limpeza ao desmontar o componente
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [showMap]);

  if (!show) return null;

  return (
    <div className="view-local-container">
        <div className='btn_container_see_local'>
      <button className="view-local-button" onClick={() => setShowMap(!showMap)}>
        {showMap ? "Fechar Mapa" : "Ver Local Sinistro"}
      </button>
      </div>
      {showMap && (
        <div
          className="map-container"
          ref={mapContainer}
          style={{ height: '300px', width: '100%', marginTop: '20px' }}
        ></div>
      )}
    </div>
  );
};

export default ViewLocalButton;
