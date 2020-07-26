import Geocode from "react-geocode";
import {auth } from './firebase'
import { googleKey } from './keys';


Geocode.setApiKey(googleKey);

export const getAddress = async (lat, lng) => {
    try{
        const fetchedData = await Geocode.fromLatLng(lat, lng)
        return fetchedData.results[0].formatted_address
    }catch(error){
        console.log('Klarte ikke hente adresse', error)
    }
}

export const signIn = async (email, password) => {
    try{
        const user = await auth.signInWithEmailAndPassword(email, password)
        return user
    }catch(error) {
        console.log('kunne ikke logg inn', error)
    }
}

export const signOut = async (props) => {
    try {
        await auth.signOut();
    }catch(error) {
        console.log('kunne ikke logg ut', error)
    }
}