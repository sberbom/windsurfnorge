import React, {useState } from 'react';
import {Button} from 'react-bootstrap'
import {registerUser, validatePassword, validateEmail} from '../utils'
import Input from './input'
import '../styles/myinfo.css'

const RegisterInfo = () => {

    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const createNewUser =  async () => {
        if(!validateEmail(email)) {
            alert("You have entered an invalid email address.")
        }
        if(!(validatePassword(password1, password2))) {
            alert("Passwords are not mathcing")
        }

        await registerUser(displayName, email, password1)

    }

    return(
        <div className="myInfo-container">
            <Input title={"Brukernavn:"} value={displayName} onChange={setDisplayName} />
            <Input title={"Email:"} value={email} onChange={setEmail} />
            <Input title={"Passord:"} value={password1} onChange={setPassword1} type={"password"} />
            <Input title={"Gjenta passord:"} value={password2} onChange={setPassword2} type={"password"}/>
            
            {(password2 && (password1 !== password2)) && <p className='errorMessage'>{"Passordene må være like"}</p>}

            <p>Ved å registere deg godtar du <a href="/termsAndConditions" target="_blank">terms and conditions</a> og <a href="/policy">policy</a>.</p>

            <Button className="myinfo-button" onClick={createNewUser}>Lagre</Button>
        </div>
    )
}

export default RegisterInfo;