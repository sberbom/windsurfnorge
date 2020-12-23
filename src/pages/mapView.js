import React, {useEffect, useState} from 'react';
import * as dbService from '../db-service';
import Map from '../components/map'
import '../styles/mapView.css'

function MapView() {
    const [spots, setSpots] = useState([])

    document.title = `Windsurf Norge - Kart`

    useEffect(() => {
        const fetchData = async () => {
            const allSpots = await dbService.getAllSpots();
            setSpots(allSpots);
        }
        fetchData();
    }, [])

    return(
        <div>
            <div className="mapView-nav-background"></div>
            <div className="mapView-container">
                <Map spots={spots}/>
            </div>
        </div>
    )
}

export default MapView;