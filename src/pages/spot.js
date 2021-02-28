import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import * as dbService from '../db-service';
import Header from '../components/header'
import Map from '../components/map'
import SpotInfo from '../components/spotInfo'
import queryString from 'query-string'
import '../styles/spot.css'
import ImageCarousel from '../components/imageCarousel';

function Spot() {

    const [spot, setSpot] = useState(null)
    const [image, setImage] = useState(null)

    useEffect(() => {
        const fetchSpot = async () => {
            const spotName = queryString.parse(window.location.search).spotName
            const spot = await dbService.getSpot(spotName);
            setSpot(spot);
            dbService.incrementSpotViews(spot);
            spot.images && spot.images[0] ? setImage(spot.images[0]) : setImage(null)
        }
        fetchSpot();
    }, [])

    return (
        <div>
            {spot && 
                <>
                    <Header
                        title={spot.name}
                        image={image}
                    />
                    <div className="spot-container">
                        <div className="spot-map-container">
                            <Map spot={spot}/>
                        </div>
                        <div className="spot-spotInfo-container">
                            <SpotInfo spot={spot}/>
                        </div>
                    </div>
                    <div className="image-carousel-container">
                        <ImageCarousel images={spot.images} />
                    </div>
                </>
            }
        </div>
    )
}

export default withRouter(Spot);