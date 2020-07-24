import React, { useEffect, useState } from 'react';
import * as dbService from '../db-service';
import '../styles/cardList.css';
import SBCard from './card';

function CardList() {
    const [spots, setSpots] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            const allSpots = await dbService.getAllSpots();
            setSpots(allSpots);
        }
        fetchData();
    }, [])

    return(
        <div className="cardList-container">
            <div className="cardList">
                {spots.map((spot, i) => 
                    <SBCard
                        key={i}
                        title={spot.name}
                        text={spot.about}
                        button="Se mer"
                    />
                )}
            </div>
        </div>
    )
}

export default CardList;