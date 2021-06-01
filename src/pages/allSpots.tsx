import React, {useEffect, useState} from 'react';
import Header from '../components/header'
import CardList from '../components/cardList'
import Sortbar from '../components/sortbar';
import {withRouter} from 'react-router-dom'
import {getAllSpots} from '../api-service';
import '../styles/allSpots.css'
import { ISpot } from '../types/types';

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
            //@ts-ignore TODO
            spots = spots.sort((spot1, spot2) => new Date(spot2.created) - new Date(spot1.created));
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