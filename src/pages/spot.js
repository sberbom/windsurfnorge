import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import * as dbService from '../db-service';
import Header from '../components/header'
import Map from '../components/map'
import SpotInfo from '../components/spotInfo'
import queryString from 'query-string'
import '../styles/spot.css'

function Spot() {

    const [spot, setSpot] = useState(null)

    useEffect(() => {
        const fetchSpot = async () => {
            const spotName = queryString.parse(window.location.search).spotName
            const spot = await dbService.getSpot(spotName);
            console.log(spot)
            setSpot(spot);
        }
        fetchSpot();
    }, [])

    return (
        <div>
            {spot && 
                <>
                    <Header
                        title={spot.name}
                    />
                    <div className="spot-container">
                        <div className="spot-map-container">
                            <Map spot={spot}/>
                        </div>
                        <div className="spot-spotInfo-container">
                            <SpotInfo spot={spot}/>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default withRouter(Spot);