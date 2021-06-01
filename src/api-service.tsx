import { IImage, IImagePreUploade, ISpot, IToDbSpot } from './types/types';

import {auth} from './firebase'

//const host = 'http://localhost:3001';
const host = 'https://windsurfnorge-server.herokuapp.com'

export const getAllSpots = async () => {
    const spotResponse = await fetch(`${host}/spots`, {
        method: 'get',
    })
    const spots = spotResponse.json()
    return spots;
}

export const getSpot = async (spotName: string) => {
    const spotResponse = await fetch(`${host}/spot`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'name': spotName 
        })
    })
    const spot = await spotResponse.json()
    return spot[0];
}

export const getImages = async (spot_id: number) => {
    const imagesResponse = await fetch(`${host}/images`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'spot_id': spot_id 
        })
    })
    const images = imagesResponse.json()
    return images;
}

export const deleteImage = async (imageId: number) => {
    const token = await auth.currentUser!.getIdToken(true)
    await fetch(`${host}/deleteImage`, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'id': imageId, 
            'token': token
        })
    })
}

export const getImage = async (imageId: number) => {
    const imagesResponse = await fetch(`${host}/getImage`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'id': imageId 
        })
    })
    const image = imagesResponse.json()
    return image;
}

export const addImage = async (image: IImagePreUploade, spotId: number, userId: string) => {
    const token = await auth.currentUser!.getIdToken(true)
    await fetch(`${host}/addImage`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'spot_id': spotId,
            'big_image' : image.big_image,
            'small_image' : image.small_image,
            'user_id' : userId,
            'token': token,
        })
    })
}

export const updateMainImage = async (main_image: IImage | null, spotId: number) => {
    try{
        const token = await auth.currentUser!.getIdToken(true)
        await fetch(`${host}/updateMainImage`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'spot_id': spotId,
                'main_image': main_image,
                'token': token
            })
        })
    }
    catch(error){
        console.log(error)
    }
}


export const addSpot = async (spot: ISpot | IToDbSpot) => {
    const token = await auth.currentUser!.getIdToken(true)
    const spotResponse = await fetch(`${host}/addSpot`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'name': spot.name,
            'about': spot.about,
            'approach': spot.approach,
            'facebook': spot.facebook,
            'lat': spot.lat,
            'lng': spot.lng,
            //@ts-ignore
            'created_by': spot.createdby,
            'main_image': spot.main_image,
            'token': token,
        })
    })
    const returnSpot = spotResponse.json()
    return returnSpot;
}

export const editSpot = async (spot: ISpot | IToDbSpot) => {
    const token = await auth.currentUser!.getIdToken(true)
    await fetch(`${host}/editSpot`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            //@ts-ignore
            'id': spot.id,
            'name': spot.name,
            'about': spot.about,
            'approach': spot.approach,
            'facebook': spot.facebook,
            'lat': spot.lat,
            'lng': spot.lng,
            'main_image': spot.main_image,
            'token': token,
        })
    })
}

export const deleteSpot = async (id: number) => {
    const token = await auth.currentUser!.getIdToken(true)
    await fetch(`${host}/spot`, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'id': id,
            'token': token
        })
    })
}

export const updateRating = async (spotid: number, rating: number, userEmail: string) => {
    const token = await auth.currentUser!.getIdToken(true)
    const user = await getUser(userEmail);
    const userid = user.id
    await fetch(`${host}/rating`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'user_id': userid,
            'spot_id': spotid,
            'rating': rating,
            'token': token,
        })
    })
}

export const getUser = async (userEmail:string) => {
    const token = await auth.currentUser!.getIdToken(true)
    const response = await fetch(`${host}/getUser`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'user_email': userEmail,
            'token': token
        })
    })
    const user = await response.json()
    return user[0]
}

export const addUser = async (displayName: string, userEmail: string) => {
    const response = await fetch(`${host}/addUser`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'user_email': userEmail,
            'displayName': displayName
        })
    })
    const user = await response.json()
    return user[0]
}

//export const updateUser = async (user: IUser) => {
//    const token = await auth.currentUser!.getIdToken(true)
//    await fetch(`${host}/updateUser`, {
//        method: 'post',
//        headers: { 'Content-Type': 'application/json' },
//        body: JSON.stringify({
//            'user': user,
//            'token': token,
//        })
//    })
//    //const user = await response.json()
//    //return user[0]
//}

export const getUsers = async () => {
    const response = await fetch(`${host}/getUsers`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
    })
    const users = await response.json()
    return users
}

export const getUserSpots = async (id: string) => {
    const token = await auth.currentUser!.getIdToken(true)
    const response = await fetch(`${host}/getUserSpots`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'user_id': id,
            'token' : token
        })
    })
    const userSpots = await response.json()
    return userSpots
}

export const restoreSpot = async (id: number) => {
    const token = await auth.currentUser!.getIdToken(true)
    await fetch(`${host}/restoreSpot`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'id': id,
            'token': token
        })
    })
}

export const getUserImages = async (id: string) => {
    const token = await auth.currentUser!.getIdToken(true)
    const response = await fetch(`${host}/getUserImages`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'user_id': id,
            'token': token
        })
    })
    const images = await response.json()
    return images
}