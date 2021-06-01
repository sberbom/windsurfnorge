import '../styles/myContent.css'

import {IImage, ISpot} from '../types/types'
import React, { useContext, useEffect, useState } from 'react';
import {getUserImages, getUserSpots} from '../api-service'

import ImageGallery from './imageGallery'
import SpotCreatedByUserEntry from './spotCreatedByUserEntry';
import {UserContext} from '../providers/userProvider';

const MyContent = () => {

    const [spotsCreatedByUser, setSpotsCratedByUser] = useState<ISpot[]>([]);
    const [userImages, setUserImages] = useState<IImage[]>([]);

    const user = useContext(UserContext)
    
    useEffect(() => {
        const fetchData = async () => {
            const userSpots = await getUserSpots(user!.uid)
            const userImages = await getUserImages(user!.uid)
            if(userSpots){
                setSpotsCratedByUser(userSpots);
            }
            if(userImages){
                setUserImages(userImages)
            }
        }
        if(user !== null) {
            fetchData() 
        }
    }, [user])

    return(
        <div className="my-content-container">
            <div className="my-spots-container">
                {spotsCreatedByUser.length > 0 && <h2>Spotter jeg har opprettet</h2>}      
                {spotsCreatedByUser.length > 0 && spotsCreatedByUser.map(spot => <SpotCreatedByUserEntry key={spot.id} spot={spot}/>)}
            </div>
            <div className="my-images-conatiner">
                {userImages.length > 0 && <h2>Bilder jeg har lastet opp</h2>}      
                {userImages.length > 0 && <ImageGallery images={userImages} />}
            </div>
        </div>
    )
}

export default MyContent;