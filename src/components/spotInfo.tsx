import '../styles/spotInfo.css'

import {Dropdown, DropdownButton} from 'react-bootstrap'
import {ISpot, IWindDirections} from '../types/types';
import React, { useContext, useState } from 'react';

import DeleteSpotModal from './deleteSpotModal'
//import EmailVerificationModal from './emailVerificationModal'
import LogInModal from './logInModal'
import Rating from 'react-rating'
import {UserContext} from '../providers/userProvider';
import WindDirecitonsDisplay from './windDirectionsDisplay';
import star from '../images/star.png'
import star_empty from '../images/star_empty.png'
import {updateRating} from '../api-service'
import { useHistory } from "react-router-dom";

interface IProps {
    spot: ISpot;
    windDirections?: IWindDirections;
}


function SpotInfo({spot, windDirections}: IProps) {

    const [showDeleteSpotModal, setShowDeleteSpotModal] = useState(false);
    const [showLogInModalDeleteSpot, setShowLogInModalDeleteSpot] = useState(false);
    const [showLogInModalRating, setShowLogInModalRating] = useState(false);
    //const [showEmailVerificationModal, setShowEmailVerificationModal] = useState(false);
    const user = useContext(UserContext)

    const history = useHistory()

    const onDeleteSpotClick = () => {
        if(user === null){
            setShowLogInModalDeleteSpot(true);
        }
        //else if(user && !user.user!.emailVerified){
        //    setShowEmailVerificationModal(true);
        //}
        else {
            setShowDeleteSpotModal(true);
        }
    }

    const onEditSpotClick = (spot: ISpot) => {
        history.push(`/addSpot?spotName=${spot.name}&edit=true`)
    }

    const onUpdateRating = (rating: number) => {
        if(user === null) {
            setShowLogInModalRating(true);
        }
        else {
            updateRating(spot.id, rating, user.user!.uid!);
        }
    }

    if(!spot.about && !spot.approach && !spot.facebook && !spot.windsensor) {
        return(
            <div className="spotInfo-container">
                <div className="options-container">
                    <h2>Beskrivelse</h2>
                    <DropdownButton
                        variant={'secondary'}
                        title={'Alternativer'}
                        size="sm"
                        id={"1"}
                    >
                        <Dropdown.Item id={"1"} eventKey="1" onClick={() => onEditSpotClick(spot)}>Endre spot</Dropdown.Item>
                        <Dropdown.Item id={"2"} eventKey="2" onClick={() => onDeleteSpotClick()}>Slett spot</Dropdown.Item>
                    </DropdownButton>
                </div>
                <p>Vi har ingen beskrivelse av denne spotten. Har du vært her? Legg gjerne inn infomasjon om spotten!</p>
                <div className="created-by-container">
                    <p className="created-by">{`Opprettet av: ${spot.createdby !== null ? spot.displayname : "Windsurf Norge"}`}</p>
                </div>
                <DeleteSpotModal show={showDeleteSpotModal} onHide={() => setShowDeleteSpotModal(false)} spot={spot} />
                    {/*@ts-ignore FIX*/}
                <LogInModal show={showLogInModalDeleteSpot} onHide={() => {setShowLogInModalDeleteSpot(false); history.push('/')}}/>
                    {/*@ts-ignore FIX*/}
                <LogInModal show={showLogInModalRating} onHide={() => {setShowLogInModalRating(false)}}/>
                {/*<EmailVerificationModal show={showEmailVerificationModal} onHide={() => {setShowEmailVerificationModal(false); history.push('/')}} user={user!.user!}/>*/}
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
                    id={"2"}
                >
                    <Dropdown.Item eventKey="1" onClick={() => onEditSpotClick(spot)}>Endre spot</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={() => onDeleteSpotClick()}>Slett spot</Dropdown.Item>
                </DropdownButton>
            </div>
            {spot.about && <p className="pre-line">{spot.about}</p>}
            {spot.approach &&
                <> 
                    <h2>Adkomst</h2>
                    <p className="pre-line">{spot.approach}</p>
                </>
            }
            {spot.facebook || spot.windsensor ?
                <div className="facebook-windsensor-directions">
                    <div className="facebook-windsensor">
                        {spot.facebook &&
                            <div> 
                                <h2>Facebook</h2>
                                <a href={spot.facebook} target="_blank" rel="noopener noreferrer" >{spot.facebook}</a>
                            </div>
                        }
                        {spot.windsensor &&
                            <div >
                                <h2 className="margin-top-1">Vindmåler</h2>
                                <a href={spot.windsensor} target="_blank" rel="noopener noreferrer" >{spot.windsensor}</a>
                            </div>
                        }
                    </div>
                    <div className="windDirections-container">
                        {windDirections && <WindDirecitonsDisplay windDirections={windDirections} />}
                    </div>
                </div>
                :
                <div className="windDirections-container">
                    {windDirections && <WindDirecitonsDisplay windDirections={windDirections} />}
                </div>
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
                <p className="created-by">{`Opprettet av: ${spot.createdby ? spot.displayname: "Windsurf Norge"}`}</p>
            </div>
            <DeleteSpotModal show={showDeleteSpotModal} onHide={() => setShowDeleteSpotModal(false)} spot={spot} />
                {/*@ts-ignore FIX*/}
            <LogInModal show={showLogInModalDeleteSpot} onHide={() => {setShowLogInModalDeleteSpot(false); history.push('/')}}/>
                {/*@ts-ignore FIX*/}
            <LogInModal show={showLogInModalRating} onHide={() => {setShowLogInModalRating(false)}}/>
            {/**<EmailVerificationModal show={showEmailVerificationModal} onHide={() => {setShowEmailVerificationModal(false); history.push('/')}} user={user!.user!}/>*/}
        </div>
    )
}

export default SpotInfo;