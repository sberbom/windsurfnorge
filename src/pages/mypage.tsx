import '../styles/mypage.css'

import Header from '../components/header'
import MyContent from '../components/myContent';
import MyInfo from '../components/myinfo'
import React from 'react';

//import {getUser} from '../api-service'

const MyPage = () => {

    document.title = `Windsurf Norge - Min Side`

    return(
        <div>
            <Header
                title="Min side"
            />
            <MyInfo />
            <MyContent />
        </div>
    )
}

export default MyPage;