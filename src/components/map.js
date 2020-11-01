import React, {useEffect} from "react";
import mapboxgl from 'mapbox-gl';
import '../styles/map.css';
import { mapboxAccessToken } from "../keys";

export const  mapCenter = [8.707806, 61.123456]

const SBMap = ({spots, spot, draggable, onDragEnd, markerPos}) => {

  const mapRef = "mapRef"

  useEffect(() => {
    mapboxgl.accessToken = mapboxAccessToken;
    let mapCenter = [8.707806, 61.123456]
    let startZoom = 5;

    if(spot) {
      mapCenter = [spot.latLng.lng, spot.latLng.lat]
      startZoom = 11;
    }

    const map = new mapboxgl.Map({
      container: mapRef,
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: mapCenter, // starting position [lng, lat]
      zoom:  startZoom// starting zoom
    });

    if(spots){
      spots.forEach((spot) => {
        new mapboxgl.Marker()
        .setLngLat([spot.latLng.lng, spot.latLng.lat])
        .setPopup(new mapboxgl.Popup({closeButton: false}).setHTML(`<a href='/spot?spotName=${spot.name}'>${spot.name}</a>`))
        .addTo(map); // add the marker to the map
      })
    }

    if(spot){
      new mapboxgl.Marker()
        .setLngLat([spot.latLng.lng, spot.latLng.lat])
        .addTo(map);
    }

    if(draggable){
      const pos = markerPos ? markerPos : mapCenter
      const draggableMarker = new mapboxgl.Marker({draggable: true})
      .setLngLat(pos)
      .addTo(map)

      draggableMarker.on('dragend', () => onDragEnd(draggableMarker.getLngLat()))
    }

  
  }, [spots, draggable])

  return <div className="map" id={mapRef}/>;
}

export default SBMap;
