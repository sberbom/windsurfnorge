import React, {useEffect, useState} from 'react';
import Header from '../components/header'
import CardList from '../components/cardList'
import Sortbar from '../components/sortbar';
import {withRouter} from 'react-router-dom'
import * as dbService from '../db-service';
import '../styles/allSpots.css'

function AllSpots() {
    const [spots, setSpots] = useState([]);
    const [searchWord, setSearchWord] = useState("");

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
            <Sortbar
                onSearchWordChange={setSearchWord}
            />
            <CardList 
                spots={spots.filter(spot => spot.name.toLowerCase().includes(searchWord.toLowerCase()))}
            />
        </div>
    )
}

export default withRouter(AllSpots);