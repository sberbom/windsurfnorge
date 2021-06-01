import Geocode from "react-geocode";
import {auth} from './firebase'
import firebase from 'firebase/app'
import { googleKey } from './keys';

Geocode.setApiKey(googleKey);

export const getAddress = async (lat: number, lng: number) => {
    try{
        const lat_string = String(lat);
        const lng_string = String(lng);
        const fetchedData = await Geocode.fromLatLng(lat_string, lng_string)
        return fetchedData.results[0].formatted_address
    }catch(error){
        console.error('Klarte ikke hente adresse', error)
    }
}

//@ts-ignore
export const signIn = async (email: string, password: string) => {
    try{
        const user = await auth.signInWithEmailAndPassword(email, password)
        return user
    }catch(error) {
        console.error('kunne ikke logg inn', error)
    }
}

//export const signInWithGoogle = async () => {
//    try{
//        const user = await auth.signInWithPopup(googleAuthProvider);
//        const users = await getUsers()
//        //@ts-ignore
//        const userEmail = user.additionalUserInfo.profile.email
//        //@ts-ignore
//        const displayName = user.additionalUserInfo.profile.name
//        let newUser = true;
//        users.forEach((dbUser: IUser) => {
//            if(dbUser.identifier === userEmail){
//                newUser = false
//            } 
//        })
//        if(newUser){
//            await addUser(displayName, userEmail)
//        }
//    }catch(error) {
//        console.error('kunne ikke logg inn med google', error)
//    }
//}

// export const signInWithFacebook = async () => {
//     try{
//         const user = await auth.signInWithPopup(facebookAuthProvider);
//         console.log(user)
//     }catch(error){
//         console.error('kunne ikke logge inn med facebook', error)
//     }
// }

export const signOut = async () => {
    try {
        await auth.signOut();
    }catch(error) {
        console.error('kunne ikke logg ut', error)
    }
}

//@ts-ignore TODO
export const registerUser = async (displayName: string, email: string, password: string) => {
    try{
        const user = await auth.createUserWithEmailAndPassword(email, password);
        if(user !== null){
            sendEmailVerification(user.user!)
            updateUsername(firebase.auth().currentUser!, displayName);
            return user;
        }
        else {
            console.error("Error creating user") 
        }
    }
    catch(error){
        if (error.code === 'auth/weak-password') {
            alert('The password is too weak.');      
            console.error("Error creating user", error) 
        }
        alert(error.message)
    }
}

export const updateUsername = async (user: firebase.User, username: string) => {
    try{
        user.updateProfile({
            displayName: username
        })
        
    }
    catch(error){
        console.error("Could not update username", error)
    }
}

export const updateEmail = async (user: firebase.User, email: string) => {
    try{
        await user.updateEmail(email)
    }
    catch(error){
        console.error("Could not update email", error)
    }
}

export const updatePassword = async (user: firebase.User, password: string) => {
    try{
        await user.updatePassword(password)
    }
    catch(error){
        console.error("Could not update password", error)
    }
}

export const deleteUser = async (user: firebase.User) => {
    try{
        await user.delete()
    }
    catch(error){
        console.error("Could not delete user", error)
    }
}

export const sendPasswordResetEmail = async (email: string) => {
    try{
        await auth.sendPasswordResetEmail(email)
    }
    catch(error){
        console.error("Could not send password reset email", error)
    }
}

export const reAuthenticateUser = async(user: firebase.User, password: string) => {
    try{
        //@ts-ignore
        const credentials = auth.EmailAuthProvider.credential(user.email, password);
        await user.reauthenticateWithCredential(credentials)
    }
    catch(error) {
        console.error("Could not re-authenticate user", error)
    }
}

export const sendEmailVerification = (user: firebase.User) => {
    try{
        user.sendEmailVerification()
    }
    catch(error){
        console.error("Could not send veification email", error)
    }
} 

export const validatePassword = (password1: string, password2: string) => {
    return(password1 === password2)
}

export const validateEmail = (email: string) => {
    return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email));
}

export const getRandomInt = () => {
    return Math.floor(Math.random() * Math.floor(1000000));
}

export const getWeekDay = (date: Date):string => {
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