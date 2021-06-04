import '../styles/mypage.css'

import React, {useContext} from 'react';

import Header from '../components/header'
import RegisterInfo from '../components/registerinfo'
import {UserContext} from '../providers/userProvider';
import { useHistory } from "react-router-dom";

const Register = () => {

    const user = useContext(UserContext)
    const history = useHistory()

    document.title = `Windsurf Norge - Ny bruker`


    if(user.user) {
        history.push("/mypage")
    }

    return(
        <div>
            <Header
                title="Registrer ny bruker"
            />
            <RegisterInfo />
        </div>
    )
}

export default Register;