import '../styles/map.css';

import {IPos, ISpot} from '../types/types';
import React, {useEffect} from "react";

import { mapboxAccessToken } from "../keys";
import mapboxgl from 'mapbox-gl';

export const mapCenter: [number, number] = [8.707806, 61.123456]

interface IProps {
  spots?: ISpot[];
  spot?: ISpot;
  draggable?: boolean;
  onDragEnd?: (lngLat: IPos) => void;
  markerPos?: [number, number];
}

const SBMap = ({spots, spot, draggable, onDragEnd, markerPos}: IProps) => {

  const mapRef = "mapRef"

  useEffect(() => {
    mapboxgl.accessToken = mapboxAccessToken;
    let mapCenter: [number, number] = [8.707806, 61.123456]
    let startZoom = 5;

    if(spot) {
      mapCenter = [spot.lng, spot.lat]
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
        .setLngLat([spot.lng, spot.lat])
        .setPopup(new mapboxgl.Popup({closeButton: false}).setHTML(`<a href='/spot?spotName=${spot.name}'>${spot.name}</a>`))
        .addTo(map); // add the marker to the map
      })
    }

    if(spot){
      new mapboxgl.Marker()
        .setLngLat([spot.lng, spot.lat])
        .addTo(map);
    }

    if(draggable){
      const pos = markerPos ? markerPos : mapCenter
      const draggableMarker = new mapboxgl.Marker({draggable: true})
      .setLngLat(pos)
      .addTo(map)

      draggableMarker.on('dragend', () => onDragEnd!(draggableMarker.getLngLat()))
    }

  
  }, [spots, draggable])

  return <div className="map" id={mapRef}/>;
}

export default SBMap;
