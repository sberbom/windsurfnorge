import '../styles/spotCreatedByUserEntry.css'

import React, { useState } from 'react';
import {deleteSpot, restoreSpot} from '../api-service'

import {ISpot} from '../types/types';
import { Link } from 'react-router-dom'

interface IProps {
    spot: ISpot;
}

const SpotCreatedByUserEntry = ({spot}: IProps) => {

    const [deleted, setDeleted] = useState(spot.deleted) 

    const onRestoreSpot = (id: number) => {
        restoreSpot(id);
        setDeleted(false)
    }

    const onDeleteSpot = (id: number) => {
        deleteSpot(id);
        setDeleted(true)
    }

    return(
        <tr className="spot-entry-conainer">
            <td><Link to={`/spot?spotName=${spot.name}`}>{spot.name}</Link></td>
            {deleted ? 
               <td className="green clickable" onClick={() => onRestoreSpot(spot.id)}>Gjennopprett</td>
               :
               <td className="red clickable" onClick={() => onDeleteSpot(spot.id)}>Slett</td>
            }
        </tr>
    )
}

export default SpotCreatedByUserEntry;