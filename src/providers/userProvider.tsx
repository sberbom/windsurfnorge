import React, {createContext, useEffect, useState} from 'react';
import { createDbUser, getDbUser } from '../api-service';

import { IDbUser } from '../types/types';
import {auth} from '../firebase';
import firebase from 'firebase/app'

interface IContext{
    user: firebase.User | null;
    dbUser: IDbUser | null;
}

const defaultContext = {
    user: null,
    dbUser: null
}
export const UserContext = createContext<IContext>(defaultContext);

const UserProvider = ({children}:any) => {
    const [user, setUser] = useState<firebase.User | null>(null);
    const [dbUser, setDbUser] = useState<IDbUser | null>(null);

    useEffect(() => {
        auth.onAuthStateChanged(async userAuth => {
            setUser(userAuth)
        })
    }, [user, dbUser])

    useEffect(() => {
        const fetchDbUser = async () => {
            const dbUserResponse = await getDbUser(user!.uid);
            console.log(dbUserResponse);
            if(dbUserResponse === undefined) {
                const dbUserCreated = await createDbUser(user!.uid, user!.displayName!);
                setDbUser(dbUserCreated);
            }
            else{
                setDbUser(dbUserResponse);
            }
        }
        if(user !== null) {
            fetchDbUser();
        }
    },[user])

    return(
        <UserContext.Provider value={{user: user, dbUser: dbUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider