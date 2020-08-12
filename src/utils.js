import Geocode from "react-geocode";
import {auth, googleAuthProvider, facebookAuthProvider } from './firebase'
import { googleKey } from './keys';


Geocode.setApiKey(googleKey);

export const getAddress = async (lat, lng) => {
    try{
        const fetchedData = await Geocode.fromLatLng(lat, lng)
        return fetchedData.results[0].formatted_address
    }catch(error){
        console.error('Klarte ikke hente adresse', error)
    }
}

export const signIn = async (email, password) => {
    try{
        const user = await auth.signInWithEmailAndPassword(email, password)
        return user
    }catch(error) {
        console.error('kunne ikke logg inn', error)
    }
}

export const signInWithGoogle = async () => {
    try{
        await auth.signInWithPopup(googleAuthProvider);
    }catch(error) {
        console.error('kunne ikke logg inn med google', error)
    }
}

export const signInWithFacebook = async () => {
    try{
        await auth.signInWithPopup(facebookAuthProvider);
    }catch(error){
        console.error('kunne ikke logge inn med facebook', error)
    }
}

export const signOut = async (props) => {
    try {
        await auth.signOut();
    }catch(error) {
        console.error('kunne ikke logg ut', error)
    }
}