import React, {useEffect, useState} from 'react';
import Header from '../components/header'
import CardList from '../components/cardList'
import Sortbar from '../components/sortbar';
import {withRouter} from 'react-router-dom'
import * as dbService from '../db-service';
import '../styles/allSpots.css'

function AllSpots(props) {
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const allSpots = await dbService.getAllSpots();
            setSpots(allSpots);
        }
        fetchData();
    }, [])

    return(
        <div className="allSpots-container">
            <Header
                title="Steder å windsurfe"
            />
            <Sortbar/>
            <CardList 
                cards = {20}
                spots={spots}
            />
        </div>
    )
}

export default withRouter(AllSpots);