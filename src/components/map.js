import React, {useEffect} from "react";
import mapboxgl from 'mapbox-gl';
import '../styles/map.css';
import { mapboxAccessToken } from "../keys";

const SBMap = ({spots, draggable, onDragEnd}) => {

  const mapRef = "mapRef"

  useEffect(() => {
    mapboxgl.accessToken = mapboxAccessToken;
    const mapCenter = [8.707806, 61.123456]
    const map = new mapboxgl.Map({
      container: mapRef,
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: mapCenter, // starting position [lng, lat]
      zoom:  5// starting zoom
    });

    if(spots){
      spots.forEach((spot) => {
        new mapboxgl.Marker()
        .setLngLat([spot.latLng.lng, spot.latLng.lat])
        .setPopup(new mapboxgl.Popup({closeButton: false}).setHTML(`<a href='/spot'>${spot.name}</a>`))
        .addTo(map); // add the marker to the map
      })
    }

    if(draggable){
      const draggableMarker = new mapboxgl.Marker({draggable: true})
      .setLngLat(mapCenter)
      .addTo(map)

      draggableMarker.on('dragend', () => onDragEnd(draggableMarker.getLngLat()))
    }

  
  }, [spots, draggable])

  return <div className="map" id={mapRef}/>;
}

export default SBMap;
