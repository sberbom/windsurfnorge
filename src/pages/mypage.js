import React, {useContext} from 'react';
import Header from '../components/header'
import MyInfo from '../components/myinfo'
import {UserContext} from '../providers/userProvider';
import '../styles/mypage.css'

const MyPage = () => {

    const user = useContext(UserContext)

    document.title = `Windsurf Norge - Min Side`

    return(
        <div>
            <Header
                title="Min side"
            />
            <MyInfo user={user}/>
        </div>
    )
}

export default MyPage;