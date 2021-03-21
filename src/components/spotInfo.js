import React, { useState, useContext } from 'react';
import {DropdownButton, Dropdown} from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import Rating from 'react-rating'
import star from '../images/star.png'
import star_empty from '../images/star_empty.png'
import {updateRating} from '../api-service'
import '../styles/spotInfo.css'
import DeleteSpotModal from './deleteSpotModal'
import {UserContext} from '../providers/userProvider';
import LogInModal from '../components/logInModal'
import EmailVerificationModal from '../components/emailVerificationModal'


function SpotInfo({spot}) {

    const [showDeleteSpotModal, setShowDeleteSpotModal] = useState(false);
    const [showLogInModal, setShowLogInModal] = useState(false);
    const [showEmailVerificationModal, setShowEmailVerificationModal] = useState(false);
    const user = useContext(UserContext)

    const history = useHistory()

    const onDeleteSpotClick = () => {
        if(user === null){
            setShowLogInModal(true);
        }
        else if(user && !user.emailVerified){
            setShowEmailVerificationModal(true);
        }
        else {
            setShowDeleteSpotModal(true);
        }
    }

    const onEditSpotClick = (spot) => {
        history.push(`/addSpot?spotName=${spot.name}&edit=true`)
    }

    const onUpdateRating = (rating) => {
        updateRating(spot.id, rating, user.email);
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
                        <Dropdown.Item eventKey="2" size="sm" onClick={() => onDeleteSpotClick()}>Slett spot</Dropdown.Item>
                    </DropdownButton>
                </div>
                <p>Vi har ingen beskrivelse av denne spotten. Har du vært her? Legg gjerne inn infomasjon om spotten!</p>
                <div className="created-by-container">
                    <p className="created-by">{`Opprettet av: ${spot.createdBy ? spot.createdBy : "Windsurf Norge"}`}</p>
                </div>
                <DeleteSpotModal show={showDeleteSpotModal} onHide={() => setShowDeleteSpotModal(false)} spot={spot} />
                <LogInModal show={showLogInModal} onHide={() => {setShowLogInModal(false); history.push('/')}}/>
                <EmailVerificationModal show={showEmailVerificationModal} onHide={() => {setShowLogInModal(false); history.push('/')}} user={user}/>
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
                    <Dropdown.Item eventKey="2" size="sm" onClick={() => onDeleteSpotClick()}>Slett spot</Dropdown.Item>
                </DropdownButton>
            </div>
            {spot.about && <p className="pre-line">{spot.about}</p>}
            {spot.approach &&
                <> 
                    <h2>Annokmst</h2>
                    <p className="pre-line">{spot.approach}</p>
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
            <div className="created-by-container">
                <p className="created-by">{`Opprettet av: ${spot.createdBy ? spot.createdBy : "Windsurf Norge"}`}</p>
            </div>
            <DeleteSpotModal show={showDeleteSpotModal} onHide={() => setShowDeleteSpotModal(false)} spot={spot} />
            <LogInModal show={showLogInModal} onHide={() => {setShowLogInModal(false); history.push('/')}}/>
            <EmailVerificationModal show={showEmailVerificationModal} onHide={() => {setShowLogInModal(false); history.push('/')}} user={user}/>
        </div>
    )
}

export default SpotInfo;