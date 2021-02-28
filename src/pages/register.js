import React, {useContext} from 'react';
import Header from '../components/header'
import RegisterInfo from '../components/registerinfo'
import {UserContext} from '../providers/userProvider';
import { useHistory } from "react-router-dom";
import '../styles/mypage.css'

const Register = () => {

    const user = useContext(UserContext)
    const history = useHistory()

    if(user) {
        history.push("/mypage")
    }

    return(
        <div>
            <Header
                title="Registerer ny bruker"
            />
            <RegisterInfo />
        </div>
    )
}

export default Register;