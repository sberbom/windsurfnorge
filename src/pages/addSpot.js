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



function AddSpot() {
    const addSpotFormContainerRef = React.createRef()
    const nameRef = React.createRef()
    const aboutRef = React.createRef()
    const approachRef = React.createRef()
    const facebookPageRef = React.createRef()

    const [latLng, setLatLng] = useState(null);
    const [address, setAddress] = useState('Dra markøren på kartet for å velge addresse')

    const [showLogInModal, setShowLogInModal] = useState(false);
    const user = useContext(UserContext)

    const history = useHistory()

    // const [imageAsFile, setImageAsFile] = useState('');
    // const [imageAsUrl, setImageAsUrl] = useState({imageUrl: ''});

    // const handleImageAsFile = (e) => {
    //     const image = e.target.files[0]
    //     setImageAsFile({imageAsFile: image})
    // } 

    useEffect(() => {
        if(user == null){
            setShowLogInModal(true);
        }
        console.log(user)
    }, [user] )

    const dragEnd = async (pos) => {
        const address = await getAddress(pos.lat, pos.lng)
        setLatLng({lat: pos.lat, lng: pos.lng})
        setAddress(address)
      }


    const checkValid = () => {
        if (nameRef.current.value === '' || latLng === mapCenter) {
            window.alert('Legg til navn og dra markøren til spottents posisjon');
            return false
        }
        return true
    }

    const onSubmit = () => {
        const spot = {
            name: nameRef.current.value,
            about: aboutRef.current.value,
            approach: approachRef.current.value,
            facebook: facebookPageRef.current.value,
            latLng: latLng,
            user: user,
            // imageAsFile: imageAsFile,
            // imageAsUrl: imageAsUrl,
        }
        if(checkValid()){
            dbService.addSpot(spot)
            history.push('/')
        }
    }

    return(
        <div>
            <Header
                title="Legg til spot"
            />
            <div className="spot-container">
                <div className="spot-map-container">
                    <Map draggable={true} onDragEnd={dragEnd}/>
                </div>
                <div className="addSpot-spotInfo" ref= {addSpotFormContainerRef}>
                    <AddSpotForm 
                        onSubmit={onSubmit} 
                        nameRef={nameRef}
                        aboutRef={aboutRef}
                        approachRef={approachRef}
                        facebookPageRef = {facebookPageRef}
                        address = {address}
                        // handleImageAsFile={handleImageAsFile}
                    />
                </div>
            </div>
            <LogInModal show={showLogInModal} onHide={() => {setShowLogInModal(false); history.push('/')}}/>
        </div>
    )
    
}

export default withRouter(AddSpot);