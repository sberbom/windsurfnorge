import React, { useEffect, useState } from 'react';
import ImageGallery from './imageGallery'
import '../styles/myContent.css'
import {getUser, getUserSpots, getUserImages} from '../api-service'
import SpotCreatedByUserEntry from './spotCreatedByUserEntry';
import {ISpot, IImage} from '../types/types'

interface IProps {
    user: any;
}

const MyContent = ({user}: IProps) => {

    const [spotsCreatedByUser, setSpotsCratedByUser] = useState<ISpot[]>([]);
    const [userImages, setUserImages] = useState<IImage[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const dbUser = await getUser(user.email);
            const userSpots = await getUserSpots(dbUser.id)
            const userImages = await getUserImages(dbUser.id)
            if(userSpots){
                setSpotsCratedByUser(userSpots);
            }
            if(userImages){
                setUserImages(userImages)
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