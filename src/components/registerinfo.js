import React, {useState } from 'react';
import {InputGroup, FormControl, Button} from 'react-bootstrap'
import {registerUser, validatePassword, validateEmail} from '../utils'
import '../styles/myinfo.css'

const RegisterInfo = () => {

    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const createNewUser =  async () => {
        if(!validateEmail(email)) {
            alert("You have entered an invalid email address.")
        }
        if(!(validatePassword(password1, password2))) {
            alert("Passwords are not mathcing")
        }

        await registerUser(email, password1)

    }

    return(
        <div className="myInfo-container">
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon2">Email:</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    value={email}
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                    onChange={(event) => setEmail(event.target.value)}
                />
            </InputGroup>
            <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon4">Passord:</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
                value={password1}
                type="password"
                aria-label="newpassword"
                aria-describedby="basic-addon1"
                onChange={(event) => setPassword1(event.target.value)}
            />
            </InputGroup>
            <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon5">Gjenta passord:</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
                value={password2}
                type="password"
                aria-label="repetnewpassword"
                aria-describedby="basic-addon1"
                onChange={(event) => setPassword2(event.target.value)}
            />
            </InputGroup>
            <Button className="myinfo-button" onClick={createNewUser}>Lagre</Button>
        </div>
    )
}

export default RegisterInfo;