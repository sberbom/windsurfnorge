const host = 'http://localhost:3001';

export const getAllSpots = async () => {
    const spotResponse = await fetch(`${host}/spots`, {
        method: 'get',
    })
    const spots = spotResponse.json()
    return spots;
}

export const getSpot = async (spotName) => {
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

export const getImages = async (spot_id) => {
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

export const deleteImage = async (imageId) => {
    await fetch(`${host}/deleteImage`, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'id': imageId 
        })
    })
}

export const getImage = async (imageId) => {
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

export const addImage = async (image, spotId, userId) => {
    await fetch(`${host}/addImage`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'spot_id': spotId,
            'big_image' : image.bigImageUrl,
            'small_image' : image.smallImageUrl,
            'user_id' : userId 
        })
    })
}

export const updateMainImage = async (main_image, spotId) => {
    await fetch(`${host}/updateMainImage`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'spot_id': spotId,
            'main_image': main_image,
        })
    })
}


export const addSpot = async (spot) => {
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
            'created_by': spot.user,
        })
    })
    const returnSpot = spotResponse.json()
    return returnSpot;
}

export const editSpot = async (spot) => {
    await fetch(`${host}/editSpot`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'id': spot.id,
            'name': spot.name,
            'about': spot.about,
            'approach': spot.approach,
            'facebook': spot.facebook,
            'lat': spot.lat,
            'lng': spot.lng,
            'main_image': spot.main_image
        })
    })
}

export const deleteSpot = async (id) => {
    await fetch(`${host}/spot`, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'id': id,
        })
    })
}

export const updateRating = async (spotid, rating, userEmail) => {
    const user = await getUser(userEmail);
    const userid = user.id
    await fetch(`${host}/rating`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'user_id': userid,
            'spot_id': spotid,
            'rating': rating
        })
    })
}

export const getUser = async (userEmail) => {
    const response = await fetch(`${host}/getUser`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'user_email': userEmail
        })
    })
    const user = await response.json()
    return user[0]
}

export const addUser = async (userEmail) => {
    const response = await fetch(`${host}/addUser`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'user_email': userEmail
        })
    })
    const user = await response.json()
    return user[0]
}

export const getUsers = async () => {
    const response = await fetch(`${host}/users`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    })
    const users = await response.json()
    return users
}

export const getUserSpots = async (id) => {
    const response = await fetch(`${host}/getUserSpots`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'user_id': id
        })
    })
    const userSpots = await response.json()
    return userSpots
}

export const restoreSpot = async (id) => {
    await fetch(`${host}/restoreSpot`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'id': id,
        })
    })
}

export const getUserImages = async (id) => {
    const response = await fetch(`${host}/getUserImages`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'user_id': id
        })
    })
    const images = await response.json()
    return images
}