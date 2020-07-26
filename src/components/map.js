import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import React from "react";
import { googleKey } from '../keys';
import '../styles/map.css';

const SBMap = (props) => {
  
  const center = {lat: 61.123456, lng: 8.707806}

  return (
      <Map
        className="map"
        google={props.google}
        zoom={6}
        initialCenter={center}
      >
      {props.draggable && 
        <Marker 
          title="Location"
          id={1}
          position={props.latLng}
          draggable={true}
          onDragend ={(t, map, coord) => props.onDragEnd(t, map, coord)}
        />
      }
      </Map>
  );
}
export default GoogleApiWrapper({
  apiKey: googleKey
})(SBMap);