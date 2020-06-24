import React from 'react';
import Header from '../components/header'
import CardList from '../components/cardList'
import Sortbar from '../components/sortbar';
import {withRouter} from 'react-router-dom'
import '../styles/allSpots.css'

function AllSpots(props) {
    return(
        <div className="allSpots-container">
            <Header
                title="Steder å windsurfe"
            />
            <Sortbar/>
            <CardList 
                cards = {20}
            />
        </div>
    )
}

export default withRouter(AllSpots);