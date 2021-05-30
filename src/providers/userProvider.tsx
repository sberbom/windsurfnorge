import React, {useState, createContext, useEffect} from 'react';
import {auth} from '../firebase'; 

//TODO: Add proper typechecking

export const UserContext = createContext<any>(null);

const UserProvider = ({children}:any) => {
    const [user, setUser] = useState<any>();

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