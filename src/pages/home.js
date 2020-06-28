import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import CardList from '../components/cardList';
import Header from '../components/header';
import Map from '../components/map';
import Title from '../components/title';
import '../styles/home.css';

function Home(props) {
    return(
        <div>
            <Header
                title="Windsurf Norge"
                button="Se spots"
                link="/allSpots"
            />
            <Title title="Populære steder å windsurfe" />
            <CardList
                cards={4}
            />
            <div className="home-center-button">
                <Link to="/allSpots"><Button>Se alle steder å windsurfe</Button></Link>
            </div>
            <div className="home-map-container">
                <Map/>
            </div>
        </div>
    )
}

export default withRouter(Home);