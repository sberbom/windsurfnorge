import '../styles/home.css';

import { Link, withRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {getAllImages, getAllSpots} from '../api-service';

import { Button } from 'react-bootstrap';
import CardCarousel from '../components/cardCarousel'
import Header from '../components/header';
import { IImage } from '../types/types';
import ImageGallery from '../components/imageGallery'
import Map from '../components/map';
import Title from '../components/title';

function Home() {
    const [spots, setSpots] = useState([])
    const [images, setImages] = useState<IImage[]>([])

    document.title = `Windsurf Norge`
    
    useEffect(() => {
        const fetchData = async () => {
            const allSpots = await getAllSpots();
            const allImages = await getAllImages();
            setSpots(allSpots);
            setImages(allImages)
        }
        fetchData();
    }, [])

    return(
        <div>
            <Header
                title="Windsurf Norge"
                buttonText="Se spots"
                buttonLink="/allSpots"
            />
            <Title title="Populære steder å windsurfe" />
            <CardCarousel
                spots={spots}
            />
            <div className="home-center-button">
                <Link to="/allSpots"><Button>Se alle steder å windsurfe</Button></Link>
            </div>
            <div className="home-map-container">
                <Map spots={spots}/>
            </div>
            <div className="image-gallery-container-home">
                <ImageGallery images={images}/>
            </div>
        </div>
    )
}

export default withRouter(Home);