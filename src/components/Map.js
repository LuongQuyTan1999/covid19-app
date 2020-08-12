import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import styled from "styled-components";
import { showDataOnMap } from "../utils";

const StyledMap = styled.div`
  height: 600px;
  background-color: white;
  padding: 1rem;
  border-radius: 20px;
  margin-top: 16px;
  box-shadow: 0 0 8px -4px rgba(0, 0, 0, 0.5);
  .leaflet-container {
    height: 100%;
    border-radius: 12px;
  }
`;

function Map({ countries, casesType, center, zoom }) {
  return (
    <StyledMap>
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </StyledMap>
  );
}

Map.propTypes = {};

export default Map;
