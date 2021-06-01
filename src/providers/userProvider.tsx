import React, {createContext, useEffect, useState} from 'react';

import {auth} from '../firebase';
import firebase from 'firebase/app'

//TODO: Add proper typechecking

export const UserContext = createContext<firebase.User | null>(null);

const UserProvider = ({children}:any) => {
    const [user, setUser] = useState<firebase.User | null>(null);

    useEffect(() => {
        auth.onAuthStateChanged(async userAuth => {setUser(userAuth)})
    })

    return(
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider