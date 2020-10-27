import React, { useEffect, useState } from 'react';
import * as dbService from '../db-service';
import { Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import CardList from '../components/cardList';
import Header from '../components/header';
import Map from '../components/map';
import Title from '../components/title';
import CardCarousel from '../components/cardCarousel'
import '../styles/home.css';

function Home() {
    const [spots, setSpots] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            const allSpots = await dbService.getAllSpots();
            setSpots(allSpots);
            console.log(allSpots)
        }
        fetchData();
    }, [])

    return(
        <div>
            <Header
                title="Windsurf Norge"
                button="Se spots"
                link="/allSpots"
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
        </div>
    )
}

export default withRouter(Home);