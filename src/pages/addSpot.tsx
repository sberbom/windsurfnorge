import '../styles/addSpot.css';
import '../styles/spot.css';

import {IImage, IImagePreUploade, IPos, ISpot, IToDbSpot, IWindDirections, defaultWindDirections} from '../types/types'
import React, { useContext, useEffect, useState } from 'react';
import {addImage, addSpot, addWindDirections, deleteImage, editSpot, getImage, getImages, getSpot, getWindDirections, updateMainImage, updateWindDirections} from '../api-service'

import AddSpotForm from '../components/addSpotForm';
import EmailVerificationModal from '../components/emailVerificationModal'
import Header from '../components/header';
import LogInModal from '../components/logInModal'
import Map from '../components/map';
import {UserContext} from '../providers/userProvider';
import { getAddress } from '../utils';
import {mapCenter} from '../components/map'
import queryString from 'query-string'
import {storage} from '../firebase'
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router-dom';

function AddSpot() {
    const [spotName, setSpotName] = useState("")
    const [aboutSpot, setAboutSpot] = useState("")
    const [approachSpot, setApproachSpot] = useState("")
    const [facbookPageSpot, setFacebookPageSpot] = useState("")
    const [spotId, setSpotId] = useState(0);
    const [spot, setSpot] = useState<ISpot | undefined>(undefined)
    const [images, setImages] = useState<IImage[]>([])
    const [windsensor, setWindsensor] = useState("")
    const [windDirections, setWindDirections] = useState<IWindDirections>(defaultWindDirections)
    const [windDirectionsExists, setWindDirectionsExists] = useState(false);

    const [latLng, setLatLng] = useState(mapCenter);
    const [address, setAddress] = useState('Dra markøren på kartet for å velge addresse')

    const [mainImage, setMainImage] = useState(undefined);

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
                //@ts-ignore TODO
                const spot = await getSpot(spotName);
                const images = await getImages(spot.id)
                const windDirections = await getWindDirections(spot.id);
                setSpot(spot);
                setSpotId(spot.id)
                setSpotName(spot.name);
                setAboutSpot(spot.about);
                setApproachSpot(spot.approach);
                setFacebookPageSpot(spot.facebook)
                setWindsensor(spot.windsensor)
                setLatLng([spot.lng, spot.lat])
                const address = await getAddress(spot.lat, spot.lng)
                setAddress(address);
                setImages(images)
                setMainImage(spot.main_image);
                if(windDirections) {
                    setWindDirections(windDirections);
                    setWindDirectionsExists(true);
                }
            }
            setIsLoading(false)
        }
        fetchSpot();
    }, [user])

    const history = useHistory()

    useEffect(() => {
        if(user.user === null){
            setShowLogInModal(true);
        }
        else{
            setShowLogInModal(false);
        }
        if(user.user && !user.user!.emailVerified){
            setShowEmailVerificationModal(true);
        }
    }, [user] )

    const dragEnd = async (pos: IPos) => {
        const address = await getAddress(pos.lat, pos.lng)
        setLatLng([pos.lng, pos.lat])
        setAddress(address)
      }

    const onDeleteImage = async (imageId: number) => {        
        try{
            const image = await getImage(imageId)
            storage.refFromURL(image.big_image).delete()
            storage.refFromURL(image.small_image).delete()

            const newImages = images.filter((oldImage:IImage) => oldImage.id !== image.id)
            
            if(spot!.main_image === imageId){
                updateMainImage(null, spot!.id)
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

    const addImages = async (spotId: number, uid: string) => {
        const newImages: IImage[] = images.filter((image:IImage) => image.id === undefined)
        for(const image of newImages) {
            const newImage: IImagePreUploade = {big_image: image.big_image, small_image: image.small_image}
            await addImage(newImage, spotId, uid)
        }
        if(newImages.length !== 0 && (spot === null || spot?.main_image === undefined)){
            const images = await getImages(spotId)
            updateMainImage(images[0].id, spotId)
        }
    }

    const isWindDirectionsSet = (windDirections: IWindDirections) => {
        let isChanged = false;
        //@ts-ignore
        Object.values(windDirections).forEach(windDirection => {
            if(windDirection === "good" || windDirection === "ok"){
                isChanged = true;
            }
        })
        return isChanged;
    }

    const onAddWindDirections = (windDirections: IWindDirections, spotId: number) => {
        if(isWindDirectionsSet(windDirections) && windDirectionsExists) {
            console.log(windDirectionsExists)
            updateWindDirections(spotId, windDirections)
        }
        else if(isWindDirectionsSet(windDirections)) {
            addWindDirections(spotId, windDirections)
        }
    }

    const onSubmit = async () => {
        let spot: ISpot | IToDbSpot = {
            name: spotName.trim(),
            about: aboutSpot,
            approach: approachSpot,
            facebook: facbookPageSpot,
            lat: latLng[1],
            lng: latLng[0],
            current_user_id: user.user!.uid,
            main_image: mainImage,
            windsensor: windsensor,
        }
        if(checkValid()){
            if(isEdit){
                spot = {...spot, id: spotId}
                editSpot(spot, user.user!.uid)
                //@ts-ignore
                addImages(spot.id, user.user!.uid)
                onAddWindDirections(windDirections, spotId);
            }
            else{
                spot = {...spot, createdby: user.user!.uid}
                await addSpot(spot)
                const newSpot = await getSpot(spotName)
                addImages(newSpot.id, user.user!.uid)
                onAddWindDirections(windDirections, newSpot.id);
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
                                onWindsensorChange = {setWindsensor}
                                address = {address}
                                name= {spotName}
                                about = {aboutSpot}
                                approach = {approachSpot}
                                facebook = {facbookPageSpot}
                                windsensor = {windsensor}
                                isEdit ={isEdit}
                                mainImage = {mainImage}
                                setMainImage = {setMainImage}
                                onDeleteImage = {onDeleteImage}
                                images = {images}
                                setImages = {setImages}
                                windDirections = {windDirections}
                                onWindDirectionsChange = {setWindDirections}
                                //newImages = {newImages}
                                //setNewImages = {setNewImages}
                            />
                        </div>
                    </div>
                    {/*@ts-ignore TODO*/}
                    <LogInModal show={showLogInModal} onHide={() => {setShowLogInModal(false); history.push('/')}}/>
                    <EmailVerificationModal show={showEmailVerificationModal} onHide={() => {setShowLogInModal(false); history.push('/')}} user={user!.user!}/>
                </>
            }
        </div>
    )
    
}

export default withRouter(AddSpot);