import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import '../App.css';

const geoUrl = "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";

const BrazilMap = () => {
  const [selectedState, setSelectedState] = useState(null);

  return (
    <div className="map-container">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 900, center: [-52, -15] }} // Ajuste para centralizar o Brasil
        width={800}
        height={600}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => setSelectedState(geo.properties.name)}
                className="state"
              />
            ))
          }
        </Geographies>
      </ComposableMap>
      {selectedState && <p className="selected-state">Estado Selecionado: {selectedState}</p>}
    </div>
  );
};

export default BrazilMap;
