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
            smallImages: spot.smallImages,
            rating: spot.rating,
            ratings: spot.ratings,
            mainImage: spot.mainImage,
            createdBy: spot.createdBy,
            editList: spot.editList
        })
    }catch(error) {
        console.error('Error adding spot', error)
    }
}

export const incrementSpotViews = async (spot) => {
    try{
        db.collection('spots').doc(spot.name).update({
            views: spot.views + 1,
        })
    }catch(error) {
        console.error('Error incrementing spot views', error)
    }
}

export const updateRating = async (spot, rating) => {
    try{
        const newRatings = spot.ratings.concat([rating])
        const newRating = spot.ratings.reduce((a,b) => a+b, 0) / spot.ratings.length
        db.collection('spots').doc(spot.name).update({
            rating: newRating,
            ratings: newRatings
        })
    }catch(error) {
        console.error('Error updating rating', error)
    }
}

export const updateImages = async (spotName, images, smallImages, mainImage) => {
    try{
        db.collection('spots').doc(spotName).update({
            images: images,
            smallImages: smallImages,
            mainImage: mainImage
        })
    }catch(error) {
        console.error('Error updating images', error)
    }
}
