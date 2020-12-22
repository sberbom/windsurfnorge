import React from 'react';
import {DropdownButton, Dropdown} from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import Rating from 'react-rating'
import star from '../images/star.png'
import star_empty from '../images/star_empty.png'
import {updateRating} from '../db-service'
import '../styles/spotInfo.css'

function SpotInfo({spot}) {

    const history = useHistory()

    const onEditSpotClick = (spot) => {
        history.push(`/addSpot?spotName=${spot.name}&edit=true`)
    }

    const onUpdateRating = (rate) => {
        updateRating(spot, rate);
    }

    if(!spot.about && !spot.approach && !spot.facebook) {
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
                <p>Vi har ingen beskrivelse av denne spotten. Har du vært her? Legg gjerne inn infomasjon om spotten!</p>
            </div>
        )
    }

    return(
        <div className="spotInfo-container overflow">
            <div className="options-container">
                {spot.about && <h2>Beskrivelse</h2>}
                <DropdownButton
                    variant={'secondary'}
                    title={'Alternativer'}
                    size="sm"
                >
                    <Dropdown.Item eventKey="1" size="sm" onClick={() => onEditSpotClick(spot)}>Endre spot</Dropdown.Item>
                </DropdownButton>
            </div>
            {spot.about && <p>{spot.about}</p>}
            {spot.approach &&
                <> 
                    <h2>Annokmst</h2>
                    <p>{spot.approach}</p>
                </>
            }
            {spot.facebook &&
                <>
                    <h2>Facebook</h2>
                    <a href={spot.facebook} target="_blank" rel="noopener noreferrer" >{spot.facebook}</a>
                </>
            }
            <div className="rating-container">
                <Rating
                    emptySymbol={<img src={star_empty} className="icon rating-img" alt="emptyStar"/>}
                    fullSymbol={<img src={star} className="icon rating-img" alt="filledStar"/>}
                    fractions={2}
                    initialRating={spot.rating}
                    onChange={onUpdateRating}
                />
            </div>
        </div>
    )
}

export default SpotInfo;