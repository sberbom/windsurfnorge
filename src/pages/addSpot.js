import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import AddSpotForm from '../components/addSpotForm';
import Header from '../components/header';
import Map from '../components/map';
import * as dbService from '../db-service';
import '../styles/addSpot.css';
import '../styles/spot.css';
import { getAddress } from '../utils';
import {mapCenter} from '../components/map'
import LogInModal from '../components/logInModal'
import {UserContext} from '../providers/userProvider';
import { useHistory } from "react-router-dom";
import queryString from 'query-string'
import EmailVerificationModal from '../components/emailVerificationModal'



function AddSpot() {
    const [spotName, setSpotName] = useState("")
    const [aboutSpot, setAboutSpot] = useState("")
    const [approachSpot, setApproachSpot] = useState("")
    const [facbookPageSpot, setFacebookPageSpot] = useState("")
    const [timeStamp, setTimeStamp] = useState(new Date())
    const [views, setViews] = useState(0);
    const [rating, setRating] = useState(0);
    const [ratings, setRatings] = useState([]);

    const [latLng, setLatLng] = useState(mapCenter);
    const [address, setAddress] = useState('Dra markøren på kartet for å velge addresse')

    const [bigImageAsUrl, setBigImageAsUrl] = useState([]);
    const [smallImageAsUrl, setSmallImageAsUrl] = useState([]);
    // let bigImageAsUrl = []
    // let smallImageAsUrl = []

    const [showLogInModal, setShowLogInModal] = useState(false);
    const [showEmailVerificationModal, setShowEmailVerificationModal] = useState(false);
    const user = useContext(UserContext)

    const [isLoading, setIsLoading] = useState(true)
    const [isEdit, setIsEdit] = useState(false)

    // const addToSmallImageAsUrl = (url) => {
    //     smallImageAsUrl.push(url)
    // }

    // const addToBigImageAsUrl = (url) => {
    //     bigImageAsUrl.push(url)
    // }

    // const setBigImageAsUrl = (urls) => {
    //     bigImageAsUrl=urls
    // }

    // const setSmallImageAsUrl = (urls) => {
    //     smallImageAsUrl=urls
    // }

    useEffect(() => {
        const fetchSpot = async () => {
            const spotName = queryString.parse(window.location.search).spotName
            const edit = queryString.parse(window.location.search).edit
            if(edit) {
                setIsEdit(true)
                const spot = await dbService.getSpot(spotName);
                setSpotName(spot.name);
                setAboutSpot(spot.about);
                setApproachSpot(spot.approach);
                setFacebookPageSpot(spot.facebook)
                setLatLng(spot.latLng)
                setTimeStamp(spot.timeStamp)
                setViews(spot.views)
                const address = await getAddress(spot.latLng.lat, spot.latLng.lng)
                setAddress(address);
                setBigImageAsUrl(spot.images ? spot.images : [])
                setSmallImageAsUrl(spot.smallImages ? spot.smallImages : [])
                // setBigImageAsUrl(spot.images ? spot.images : [])
                // setSmallImageAsUrl(spot.smallImages ? spot.smallImages : [])
                setRating(spot.rating)
                setRatings(spot.ratings)
            }
            setIsLoading(false)
        }
        fetchSpot();
    }, [])

    const history = useHistory()

    useEffect(() => {
        if(user === null){
            setShowLogInModal(true);
        }
        else{
            setShowLogInModal(false);
        }
        if(user && !user.emailVerified){
            setShowEmailVerificationModal(true);
        }
    }, [user] )

    const dragEnd = async (pos) => {
        const address = await getAddress(pos.lat, pos.lng)
        setLatLng({lat: pos.lat, lng: pos.lng})
        setAddress(address)
      }


    const checkValid = () => {
        if (spotName === '' || latLng === mapCenter) {
            window.alert('Legg til navn og dra markøren til spottents posisjon');
            return false
        }
        return true
    }

    const onSubmit = () => {
        console.log("last", bigImageAsUrl)
        console.log(smallImageAsUrl)
        const spot = {
            name: spotName,
            about: aboutSpot,
            approach: approachSpot,
            facebook: facbookPageSpot,
            latLng: latLng,
            user: user,
            timeStamp: timeStamp,
            views: views,
            images: bigImageAsUrl,
            smallImages: smallImageAsUrl,
            rating: rating,
            ratings: ratings,
        }
        if(checkValid()){
            dbService.addSpot(spot)
            history.push('/')
        }
    }

    return(
        <div>
            <Header
                title={isEdit ? "Endre spot" : "Legg til spot"}
                image={bigImageAsUrl[0]}
            />
            {!isLoading &&
                <> 
                    <div className="spot-container">
                        <div className="spot-map-container">
                            <Map draggable={true} onDragEnd={dragEnd} markerPos={latLng}/>
                        </div>
                        <div className="addSpot-spotInfo">
                            <AddSpotForm 
                                onSubmit={onSubmit} 
                                onNameChange={setSpotName}
                                onAboutChange={setAboutSpot}
                                onApproachChange={setApproachSpot}
                                onFacebookPageChange = {setFacebookPageSpot}
                                address = {address}
                                name= {spotName}
                                about = {aboutSpot}
                                approach = {approachSpot}
                                facebook = {facbookPageSpot}
                                isEdit ={isEdit}
                                setBigImageAsUrl = {setBigImageAsUrl}
                                bigImageAsUrl = {bigImageAsUrl}
                                setSmallImageAsUrl = {setSmallImageAsUrl}
                                smallImageAsUrl = {smallImageAsUrl}
                                // addToBigImageAsUrl = {addToBigImageAsUrl}
                                // addToSmallImageAsUrl ={addToSmallImageAsUrl}
                            />
                        </div>
                    </div>
                    <LogInModal show={showLogInModal} onHide={() => {setShowLogInModal(false); history.push('/')}}/>
                    <EmailVerificationModal show={showEmailVerificationModal} onHide={() => {setShowLogInModal(false); history.push('/')}} user={user}/>
                </>
            }
        </div>
    )
    
}

export default withRouter(AddSpot);