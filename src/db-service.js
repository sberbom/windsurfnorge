import { db } from './firebase';

export const getAllSpots = async () => {
    const fetchedSpots = await db.collection('spots').get()
    const spots = [];
    fetchedSpots.forEach((doc) => spots.push(doc.data()))
    return spots;
}

export const getSpot = async (spotName) => {
    const spotRef = await db.collection('spots').doc(spotName);
    const fetchedSpot = await spotRef.get();
    if(!fetchedSpot.exists) {
        console.error("Could not find spot");
    }
    return fetchedSpot.data();
}

export const addSpot = async (spot) => {
    try{
        db.collection('spots').doc(spot.name).set({
            name: spot.name,
            about: spot.about,
            approach: spot.approach,
            facebook: spot.facebook,
            latLng: spot.latLng,
            timeStamp: spot.timeStamp,
            views: spot.views,
            images: spot.images,
            smallImages: spot.smallImages
        })
    }catch(error) {
        console.log('Error adding spot', error)
    }
}

export const incrementSpotViews = async (spot) => {
    try{
        db.collection('spots').doc(spot.name).update({
            views: spot.views + 1,
        })
    }catch(error) {
        console.log('Error incrementing spot views', error)
    }
}

