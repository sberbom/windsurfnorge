import Geocode from "react-geocode";
import {auth, googleAuthProvider } from './firebase'
import {addUser, getUsers} from './api-service' 
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
        const user = await auth.signInWithPopup(googleAuthProvider);
        const users = await getUsers()
        const userEmail = user.additionalUserInfo.profile.email
        let newUser = true;
        users.forEach(dbUser => {
            if(dbUser.identifier === userEmail){
                newUser = false
            } 
        })
        if(newUser){
            console.log(userEmail)
            addUser(userEmail)
        }
    }catch(error) {
        console.error('kunne ikke logg inn med google', error)
    }
}

// export const signInWithFacebook = async () => {
//     try{
//         const user = await auth.signInWithPopup(facebookAuthProvider);
//         console.log(user)
//     }catch(error){
//         console.error('kunne ikke logge inn med facebook', error)
//     }
// }

export const signOut = async (props) => {
    try {
        await auth.signOut();
    }catch(error) {
        console.error('kunne ikke logg ut', error)
    }
}

export const registerUser = async (email, password) => {
    try{
        const user = await auth.createUserWithEmailAndPassword(email, password);
        sendEmailVerification(user.user)
        addUser(email)
        return user;
    }
    catch(error){
        if (error.code === 'auth/weak-password') {
            alert('The password is too weak.');      
        console.error("Error creating user", error) 
        }
    }
}

export const updateUsername = async (user, username) => {
    try{
        await user.updateProfile({
            displayName: username
        })
    }
    catch(error){
        console.error("Could not update username", error)
    }
}

export const updateEmail = async (user, email) => {
    try{
        await user.updateEmail(email)
    }
    catch(error){
        console.error("Could not update email", error)
    }
}

export const updatePassword = async (user, password) => {
    try{
        await user.updatePassword(password)
    }
    catch(error){
        console.error("Could not update password", error)
    }
}

export const deleteUser = async (user) => {
    try{
        await user.delete()
    }
    catch(error){
        console.error("Could not delete user", error)
    }
}

export const sendPasswordResetEmail = async (email) => {
    try{
        await auth.sendPasswordResetEmail(email)
    }
    catch(error){
        console.error("Could not send password reset email", error)
    }
}

export const reAuthenticateUser = async(user, password) => {
    try{
        const credentials = auth.EmailAuthProvider.credential(user.email, password);
        await user.reauthenticateWithCredential(credentials)
    }
    catch(error) {
        console.error("Could not re-authenticate user", error)
    }
}

export const sendEmailVerification = (user) => {
    try{
        user.sendEmailVerification()
    }
    catch(error){
        console.error("Could not send veification email", error)
    }
} 

export const validatePassword = (password1, password2) => {
    return(password1 === password2)
}

export const validateEmail = (email) => {
    return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email));
}

export const getRandomInt = () => {
    return Math.floor(Math.random() * Math.floor(1000000));
}

export const getWeekDay = (date) => {
    switch (date.getDay()){
        case 0:
            return 'Søndag'
        case 1:
            return 'Mandag'
        case 2:
            return 'Tirsdag'
        case 3:
            return 'Onsdag'
        case 4:
            return 'Torsdag'
        case 5:
            return 'Fredag'
        case 6:
            return 'Lørdag'
        default:
            return ''
    }

}