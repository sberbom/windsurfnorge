import React from 'react';
import {DropdownButton, Dropdown} from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import '../styles/spotInfo.css'

function SpotInfo({spot}) {

    const history = useHistory()

    const onEditSpotClick = (spot) => {
        history.push(`/addSpot?spotName=${spot.name}&edit=true`)
    }

    return(
        <div className="spotInfo-container">
            <div className="options-container">
                <h2>Beskrivelse</h2>
                <DropdownButton
                    variant={'secondary'}
                    title={'Alternativer'}
                    size="sm"
                >
                    <Dropdown.Item eventKey="1" size="sm" onClick={() => onEditSpotClick(spot)}>Endre spot</Dropdown.Item>
                </DropdownButton>
            </div>
            <p>{spot.about}</p>
            <h2>Annokmst</h2>
            <p>{spot.approach}</p>
            <h2>Facebook</h2>
            <p>{spot.facebook}</p>
        </div>
    )
}

export default SpotInfo;