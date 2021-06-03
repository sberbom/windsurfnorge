import '../styles/allSpots.css'

import {Link, withRouter} from 'react-router-dom'
import React, {useEffect, useState} from 'react';

import { Button } from 'react-bootstrap';
import CardList from '../components/cardList'
import Header from '../components/header'
import { ISpot } from '../types/types';
import Sortbar from '../components/sortbar';
import {getAllSpots} from '../api-service';

function AllSpots() {
    const [spots, setSpots] = useState([]);
    const [sortBy, setSortBy] = useState("Alphabetical")
    const [searchWord, setSearchWord] = useState("");

    document.title = `Windsurf Norge - Steder å windsurfe`

    useEffect(() => {
        const fetchData = async () => {
            const allSpots = await getAllSpots();
            setSpots(allSpots);
        }
        fetchData();
    }, [])

    const sort = (spotsToSort: ISpot[], sortMethod:string) => {
        let spots = spotsToSort;
        if(sortMethod === "Alphabetical") {
            spots = spots.sort((spot1, spot2) => {
                if(spot1.name < spot2.name) { return -1; }
                if(spot1.name > spot2.name) { return 1; }
                return 0;
            });
        }
        else if(sortMethod === "Newest") {
            spots = spots.sort((spot1, spot2) => new Date(spot2.created).valueOf() - new Date(spot1.created).valueOf());
        }
        else if(sortMethod === "Most popular") {
            spots = spots.sort((spot1, spot2) => spot2.views - spot1.views);
        }
        else if(sortMethod === "Rating") {
            spots = spots.sort((spot1, spot2) => spot2.rating - spot1.rating);
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
            <div className="add-spot-button">
                <Link to="/addSpot"><Button className="add-spot-button  ">Legg til spot</Button></Link>
            </div>
            {spots.length === 0 ?
                <div className="empty"></div>
                :
                <CardList 
                    spots={sort(spots.filter((spot:ISpot) => spot.name.toLowerCase().includes(searchWord.toLowerCase())), sortBy)}
                />
            }
        </div>
    )
}

export default withRouter(AllSpots);