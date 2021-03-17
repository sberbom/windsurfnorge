import React, { useEffect, useState } from 'react';
import ImageGallery from './imageGallery'
import '../styles/myContent.css'
import {getUserData } from '../db-service';
import SpotCreatedByUserEntry from './spotCreatedByUserEntry';

const MyContent = ({user}) => {

    const [spotsCreatedByUser, setSpotsCratedByUser] = useState([]);
    const [bigImagesUploadedByUser, setBigImagesUploadedByUser] = useState([])
    const [smallImageUploadedByUser, setSmallImagesUploadedByUser] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const userData = await getUserData(user.uid);
            if(userData && userData.createdSpots){
                setSpotsCratedByUser(userData.createdSpots);
            }
            if(userData && userData.uploadedBigImages) {
                setBigImagesUploadedByUser(userData.uploadedBigImages);
                setSmallImagesUploadedByUser(userData.uploadedSmallImages);
            }
        }
        if(user) {
            fetchData() 
        }
    }, [user])

    return(
        <div className="my-content-container">
            <div className="my-spots-container">
                {spotsCreatedByUser.length > 0 && <h2>Spotter jeg har opprettet</h2>}      
                {spotsCreatedByUser.length > 0 && spotsCreatedByUser.map(spot => <SpotCreatedByUserEntry key={spot} spotName={spot}/>)}
            </div>
            <div className="my-images-conatiner">
                {bigImagesUploadedByUser.length > 0 && <h2>Bilder jeg har lastet opp</h2>}      
                {bigImagesUploadedByUser.length > 0 && <ImageGallery images={bigImagesUploadedByUser} smallImages={smallImageUploadedByUser} />}
            </div>
        </div>
    )
}

export default MyContent;