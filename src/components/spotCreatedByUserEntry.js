import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import {getSpot, restoreSpot} from '../db-service'
import '../styles/spotCreatedByUserEntry.css'

const SpotCreatedByUserEntry = ({spotName}) => {

    const [spot, setSpot] = useState({deleted: false});

    useEffect(() => {
        const fetchSpot = async () => {
            const fetchedSpot = await getSpot(spotName);
            setSpot(fetchedSpot)
        }
        fetchSpot();
    },[spotName])

    const onRestoreSpot = (spotName) => {
        restoreSpot(spotName);
        setSpot({...spot, deleted:false,})
    }

    return(
        <div className="spot-entry-conainer">
            <Link to={`/spot?spotName=${spotName}`}>{spotName}</Link>
            {spot.deleted && <span> - Denne spotten er slettet, <span onClick={() => onRestoreSpot(spotName)} className="restore">gjennopprett.</span></span>}
        </div>
    )
}

export default SpotCreatedByUserEntry;