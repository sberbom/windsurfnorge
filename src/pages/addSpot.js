import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import AddSpotForm from '../components/addSpotForm';
import Header from '../components/header';
import Map from '../components/map';
import {getSpot, addSpot, deleteImage, getImage, getUser, editSpot, addImage, getImages, updateMainImage} from '../api-service'
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
    const [spotId, setSpotId] = useState(0);
    const [spot, setSpot] = useState(null)
    const [images, setImages] = useState([])
    const [newImages, setNewImages] = useState([]);

    const [latLng, setLatLng] = useState(mapCenter);
    const [address, setAddress] = useState('Dra markøren på kartet for å velge addresse')

    const [mainImage, setMainImage] = useState(0);

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
            if(edit) {
                setIsEdit(true)
                const spot = await getSpot(spotName);
                const images = await getImages(spot.id)
                setSpot(spot);
                setSpotId(spot.id)
                setSpotName(spot.name);
                setAboutSpot(spot.about);
                setApproachSpot(spot.approach);
                setFacebookPageSpot(spot.facebook)
                setLatLng({lat: spot.lat, lng: spot.lng})
                const address = await getAddress(spot.lat, spot.lng)
                setAddress(address);
                setImages(images)
                setMainImage(spot.main_image ? spot.main_image : 0);
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

    const onDeleteImage = async (imageId) => {        
        try{
            const image = await getImage(imageId)
            storage.refFromURL(image.big_image).delete()
            storage.refFromURL(image.small_image).delete()

            const newImages = images.filter(oldImage => oldImage.id !== image.id)
            
            if(spot.main_image === imageId){
                updateMainImage(null, spot.id)
            }

            deleteImage(imageId)
            setImages(newImages)
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

    const addImages = async (spotId, dbUser) => {
        const newImages = images.filter(image => image.id === undefined)
        for(const image of newImages) {
            const newImage = {bigImageUrl: image.big_image, smallImageUrl: image.small_image}
            await addImage(newImage, spotId, dbUser.id)
        }
        if(newImages.length !== 0 && (spot === null || spot.mainImage === undefined)){
            const images = await getImages(spotId)
            updateMainImage(images[0].id, spotId)
        }
    }

    const onSubmit = async () => {
        const dbUser = await getUser(user.email);
        let spot = {
            name: spotName,
            about: aboutSpot,
            approach: approachSpot,
            facebook: facbookPageSpot,
            lat: latLng.lat,
            lng: latLng.lng,
            current_user_id: dbUser.id
        }
        if(checkValid()){
            if(isEdit){
                spot = {...spot, id: spotId}
                editSpot(spot)
                addImages(spot.id, dbUser)
            }
            else{
                spot = {...spot, createdBy: dbUser.id}
                await addSpot(spot)
                const newSpot = await getSpot(spotName)
                addImages(newSpot.id, dbUser)
            }
            history.push('/')
        }
    }

    return(
        <div>
            <Header
                title={isEdit ? "Endre spot" : "Legg til spot"}
                image={spot && spot.big_image}
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
                                mainImage = {mainImage}
                                setMainImage = {setMainImage}
                                onDeleteImage = {onDeleteImage}
                                images = {images}
                                setImages = {setImages}
                                newImages = {newImages}
                                setNewImages = {setNewImages}
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