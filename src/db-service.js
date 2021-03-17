import { db } from './firebase';

export const getAllSpots = async () => {
    const fetchedSpots = await db.collection('spots').where("deleted", "==", false).get()
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
            editList: spot.editList,
            deleted: spot.deleted,
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

export const deleteSpot = async (spotName) => {
    try{
        db.collection('spots').doc(spotName).update({
            deleted: true
        })
    }catch(error) {
        console.error('Error deleting spot', error)
    }
}

export const restoreSpot = async (spotName) => {
    try{
        db.collection('spots').doc(spotName).update({
            deleted: false
        })
    }catch(error) {
        console.error('Error restoring spot', error)
    }
}

export const addSpotCreatedByUser = async (spotName, userID) => {
    try{
        const fetchedUserInfo = await db.collection('userInfo').doc(userID).get()
        const userInfo = fetchedUserInfo.data();
        let newSpots = [];
        if(userInfo && userInfo.createdSpots){
            newSpots = userInfo.createdSpots.concat([spotName])
        }
        else {
            newSpots = [spotName]
        }
        if(userInfo){
            db.collection('userInfo').doc(userID).update({
                createdSpots: newSpots
            })
        }
        else{
            db.collection('userInfo').doc(userID).set({
                createdSpots: newSpots
            })
        }
    }catch(error) {
        console.error('Error updating user created spots', error)
    }
}

export const getSpotsCreatedByUser = async (userID) => {
    try {
        const fetchedUserInfo = await db.collection('userInfo').doc(userID).get()
        const userInfo = fetchedUserInfo.data();
        return userInfo.createdSpots;
    }catch(error) {
        console.error('Error getting spots created by user', error)
    }
}

export const addImageUploadedByUser = async (bigImageAsUrl, smallImageAsUrl, userID, documentExists = false) => {
    try{
        const fetchedUserInfo = await db.collection('userInfo').doc(userID).get()
        const userInfo = fetchedUserInfo.data();
        let newBigImages = [];
        let newSmallImages = [];
        if(userInfo && userInfo.uploadedBigImages){
            newBigImages = userInfo.uploadedBigImages.concat(bigImageAsUrl)
            newSmallImages = userInfo.uploadedSmallImages.concat(smallImageAsUrl)
        }
        else {
            newBigImages = bigImageAsUrl
            newSmallImages = smallImageAsUrl
        }
        if(userInfo || documentExists){
            db.collection('userInfo').doc(userID).update({
                uploadedBigImages: newBigImages,
                uploadedSmallImages: newSmallImages
            })
        }else {
            db.collection('userInfo').doc(userID).set({
                uploadedBigImages: newBigImages,
                uploadedSmallImages: newSmallImages
            })
        }
    }catch(error) {
        console.error('Error updating image uploaded by  user', error)
    }
}

export const deleteImageFromUserUploade = async (bigImageUrl, smallImageUrl) => {
    try {
        const userRef = db.collection('userInfo').where('uploadedBigImages', 'array-contains', bigImageUrl);
        const querySnapshot = await userRef.get();
        querySnapshot.forEach((doc) => {
            let userInfo = doc.data();
            let userID = doc.id
            const newUploadedBigImages = userInfo.uploadedBigImages.filter(url => url =! bigImageUrl)
            const newUploadedSmallImages = userInfo.uploadedSmallImages.filter(url => url =! smallImageUrl)
            db.collection('userInfo').doc(userID).update({
                uploadedBigImages: newUploadedBigImages,
                uploadedSmallImages: newUploadedSmallImages
            })
            });
    }catch(error) {
        console.error('Error getting big images uploaded by user', error)
    }
}

export const getBigImagesUploadedByUser = async (userID) => {
    try {
        const fetchedUserInfo = await db.collection('userInfo').doc(userID).get()
        const userInfo = fetchedUserInfo.data();
        return userInfo.uploadedBigImages;
    }catch(error) {
        console.error('Error getting big images uploaded by user', error)
    }
}

export const getSmallImagesUploadedByUser = async (userID) => {
    try {
        const fetchedUserInfo = await db.collection('userInfo').doc(userID).get()
        const userInfo = fetchedUserInfo.data();
        return userInfo.uploadedSmallImages;
    }catch(error) {
        console.error('Error getting small images uploaded by user', error)
    }
}

export const getUserData = async (userID) => {
    try {
        const fetchedUserInfo = await db.collection('userInfo').doc(userID).get()
        const userInfo = fetchedUserInfo.data();
        return userInfo
    }catch(error) {
        console.error('Error getting userdata', error)
    }
}
