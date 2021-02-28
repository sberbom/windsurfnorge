import React, {useEffect, useState} from 'react';
import Header from '../components/header'
import CardList from '../components/cardList'
import Sortbar from '../components/sortbar';
import {withRouter} from 'react-router-dom'
import * as dbService from '../db-service';
import '../styles/allSpots.css'

function AllSpots() {
    const [spots, setSpots] = useState([]);
    const [sortBy, setSortBy] = useState("Alphabetical")
    const [searchWord, setSearchWord] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const allSpots = await dbService.getAllSpots();
            setSpots(allSpots);
        }
        fetchData();
    }, [])

    const sort = (spotsToSort, sortMethod) => {
        let spots = spotsToSort;
        if(sortMethod === "Alphabetical") {
            spots = spots.sort();
        }
        if(sortMethod === "Newest") {
            spots = spots.sort((spot1, spot2) => spot2.timeStamp - spot1.timeStamp);
        }
        if(sortMethod === "Most popular") {
            spots = spots.sort((spot1, spot2) => spot2.views - spot1.views);
        }
        return spots
    }

    return(
        <div className="allSpots-container">
            <Header
                title="Steder å windsurfe"
            />
            <Sortbar
                onSearchWordChange={setSearchWord}
                onSortbyChange={setSortBy}
            />
            {spots.length === 0 ?
                <div className="empty"></div>
                :
                <CardList 
                    spots={sort(spots.filter(spot => spot.name.toLowerCase().includes(searchWord.toLowerCase())), sortBy)}
                />
            }
        </div>
    )
}

export default withRouter(AllSpots);