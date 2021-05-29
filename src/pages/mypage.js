import React, {useContext, useEffect, useState} from 'react';
import Header from '../components/header'
import MyContent from '../components/myContent';
import MyInfo from '../components/myinfo'
import {UserContext} from '../providers/userProvider';
import {getUser} from '../api-service'
import '../styles/mypage.css'

const MyPage = () => {

    const user = useContext(UserContext)
    const [dbUser, setDbUser] = useState(null)

    useEffect(() => {
        const getDbUser = async (email) => {
            const user = await getUser(email);
            setDbUser(user);
        }
        if(user){
        getDbUser(user.email)        
        }
    }, [user])

    document.title = `Windsurf Norge - Min Side`

    return(
        <div>
            <Header
                title="Min side"
            />
            <MyInfo user={user} dbUser={dbUser}/>
            <MyContent user={user}/>
        </div>
    )
}

export default MyPage;