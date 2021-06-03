import '../styles/myContent.css'

import {IImage, ISpot} from '../types/types'
import React, { useContext, useEffect, useState } from 'react';
import {getUserImages, getUserSpots} from '../api-service'

import ImageGallery from './imageGallery'
import SpotCreatedByUserEntry from './spotCreatedByUserEntry';
import { Table } from 'react-bootstrap';
import {UserContext} from '../providers/userProvider';

const MyContent = () => {

    const [spotsCreatedByUser, setSpotsCratedByUser] = useState<ISpot[]>([]);
    const [userImages, setUserImages] = useState<IImage[]>([]);

    const user = useContext(UserContext)
    
    useEffect(() => {
        const fetchData = async () => {
            const userSpots = await getUserSpots(user.user!.uid)
            const userImages = await getUserImages(user.user!.uid)
            if(userSpots){
                setSpotsCratedByUser(userSpots);
            }
            if(userImages){
                setUserImages(userImages)
            }
        }
        if(user.user !== null) {
            fetchData() 
        }
    }, [user])

    return(
        <div className="my-content-container">
            <div className="my-spots-container">
                {spotsCreatedByUser.length > 0 &&
                <> 
                    <h2>Mine spotter</h2>      
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Navn</th>
                                <th>Aksjon</th>
                            </tr>
                        </thead>
                        <tbody>
                        {spotsCreatedByUser.map(spot => <SpotCreatedByUserEntry key={spot.id} spot={spot}/>)}
                        </tbody>
                    </Table>
                </>}
            </div>
            <div className="my-images-conatiner">
                {userImages.length > 0 && <h2>Mine bilder</h2>}      
                {userImages.length > 0 && <ImageGallery images={userImages} />}
            </div>
        </div>
    )
}

export default MyContent;