import React from 'react';
import Map from '../components/map'
import '../styles/mapView.css'

function MapView(props) {
    return(
        <div>
            <div className="mapView-nav-background"></div>
            <div className="mapView-container">
                <Map/>
            </div>
        </div>
    )
}

export default MapView;