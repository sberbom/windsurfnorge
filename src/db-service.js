import { db } from './firebase';

export const getAllSpots = async () => {
    const fetchedSpots = await db.collection('spots').get()
    const spots = [];
    fetchedSpots.forEach((doc) => spots.push(doc.data()))
    return spots;
}