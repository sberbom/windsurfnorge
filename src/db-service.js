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

// const uploadImage = (event, spot) => {
//     event.preventDefault();
//     console.log('start of uplaod')
//     if(this.state.imageAsFile === '') {
//         console.error(`not an image, the image file is a ${typeof(spot.imageAsFile)}`)
//       }
//     const uploadTask = storage.ref(`/images/${spot.imageAsFile.name}`).put(spot.imageAsFile)
//     uploadTask.on('state_changed', 
//     (snapShot) => {
//         console.log(snapShot)
//         }, (err) => {
//         console.log(err)
//         }, () => {
//         storage.ref('images').child(spot.imageAsFile.name).getDownloadURL()
//         .then(fireBaseUrl => {
//             this.setState( {imageAsUrl: {...spot.imageAsUrl, imgUrl: fireBaseUrl}})
//             db.collection('spots').doc(spot.name).update({
//                 img: fireBaseUrl
//             })
//             .catch(() => console.log('Error adding image to spot'))
//         })
//     })
// }

export const addSpot = async (spot) => {
    try{
        db.collection('spots').doc(spot.name).set({
            name: spot.name,
            about: spot.about,
            approach: spot.approach,
            facebook: spot.facebook,
            latLng: spot.latLng,
        })
    }catch(error) {
        console.log('Error adding spot', error)
    }
}

