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
import {storage} from '../firebase'

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
    const [mainImage, setMainImage] = useState(0);

    const [createdBy, setCreatedBy] = useState();
    const [editList, setEditList] = useState([]);

    const [showLogInModal, setShowLogInModal] = useState(false);
    const [showEmailVerificationModal, setShowEmailVerificationModal] = useState(false);
    const user = useContext(UserContext)

    const [isLoading, setIsLoading] = useState(true)
    const [isEdit, setIsEdit] = useState(false)

    document.title = `Windsurf Norge - Legg til/endre spot`

    useEffect(() => {
        const fetchSpot = async () => {
            const spotName = queryString.parse(window.location.search).spotName
            const edit = queryString.parse(window.location.search).edit
            user && !edit && setCreatedBy(user.email)
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
                setMainImage(spot.mainImage ? spot.mainImage : 0);
                setRating(spot.rating)
                setRatings(spot.ratings ? spot.ratings : [])
                setCreatedBy(spot.createdBy ? spot.createdBy : 'Windsurf Norge')
                setEditList(spot.editList ? spot.editList : [])
            }
            setIsLoading(false)
        }
        fetchSpot();
    }, [user])

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

    const onDeleteImage = async (imageIndex) => {        
        try{
            await storage.refFromURL(bigImageAsUrl[imageIndex]).delete()
            await storage.refFromURL(smallImageAsUrl[imageIndex]).delete()
            const bigImages = bigImageAsUrl.filter(image => image !== bigImageAsUrl[imageIndex])
            const smallImages = smallImageAsUrl.filter(image => image !== smallImageAsUrl[imageIndex])
            let mainImageLocal = mainImage
            setBigImageAsUrl(bigImages)
            setSmallImageAsUrl(smallImages)
            if(mainImage === imageIndex) {
                setMainImage(0)
                mainImageLocal = 0
            }
            dbService.updateImages(spotName, bigImages, smallImages, mainImageLocal)
        }
        catch(error){
            console.error("Could not delete image", error)
        }
    }


    const checkValid = () => {
        if (spotName === '' || latLng === mapCenter) {
            window.alert('Legg til navn og dra markøren til spottents posisjon');
            return false
        }
        return true
    }

    const onSubmit = () => {
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
            mainImage: mainImage,
            createdBy: createdBy,
            editList: editList.concat([user.email])
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
                    <div className="spot-container-edit">
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
                                mainImage = {mainImage}
                                setMainImage = {setMainImage}
                                onDeleteImage = {onDeleteImage}
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