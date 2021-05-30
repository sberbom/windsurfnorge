import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import {restoreSpot} from '../api-service'
import '../styles/spotCreatedByUserEntry.css'
import {ISpot} from '../types/types';

interface IProps {
    spot: ISpot;
}

const SpotCreatedByUserEntry = ({spot}: IProps) => {

    const [currentSpot, setCurrentSpot] = useState(spot) 

    const onRestoreSpot = (id: number) => {
        restoreSpot(id);
        setCurrentSpot({...currentSpot, deleted: false})
    }

    return(
        <div className="spot-entry-conainer">
            <Link to={`/spot?spotName=${spot.name}`}>{spot.name}</Link>
            {currentSpot.deleted && <span> - Denne spotten er slettet, <span onClick={() => onRestoreSpot(spot.id)} className="restore">gjennopprett.</span></span>}
        </div>
    )
}

export default SpotCreatedByUserEntry;