import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {getImages, getSpot} from '../api-service'
import Header from '../components/header'
import Map from '../components/map'
import SpotInfo from '../components/spotInfo'
import queryString from 'query-string'
import '../styles/spot.css'
// import ImageCarousel from '../components/imageCarousel';
import Weather from '../components/weather'
import SBImageGallery from '../components/imageGallery'
import { IImage, ISpot } from '../types/types';



function Spot() {

    const [spot, setSpot] = useState<ISpot | undefined>(undefined)
    const [images, setImages] = useState<IImage[] | undefined>(undefined)
    const [image, setImage] = useState(undefined)

    useEffect(() => {
        const fetchSpot = async () => {
            const spotName = queryString.parse(window.location.search).spotName
            //@ts-ignore
            const spot = await getSpot(spotName);
            const images = await getImages(spot.id);
            setSpot(spot);
            setImages(images);
            setImage(spot.big_image)
            // spot.images && spot.images[spot.mainImage] ? setImage(spot.images[spot.mainImage]) : setImage(null)
            document.title = `Windsurf Norge - ${spot.name}`
        }
        fetchSpot();
    }, [])

    if(!spot) {
        return(<div className="empty"></div>)
    }

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
                            <SpotInfo spot={spot} />
                        </div>
                    </div>
                    <Weather lat={spot.lat} lng={ spot.lng}/>
                    <div className="image-gallery-container">
                        {images && <SBImageGallery images={images}/>}
                    </div>
                </>
            }
        </div>
    )
}

export default withRouter(Spot);