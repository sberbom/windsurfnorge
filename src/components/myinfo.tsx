import '../styles/myinfo.css'

import React, { useContext, useEffect, useState } from 'react';
import {reAuthenticateUser, signOut, updateEmail, updatePassword, updateUsername} from '../utils'

import {Button} from 'react-bootstrap'
import Input from './input'
import ReAuthenticateModal from './reAuthenticateModal';
import {UserContext} from '../providers/userProvider';
import { updateDbDisplayName } from '../api-service';
import { useHistory } from "react-router-dom";

const MyInfo = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordRepet, setNewPasswordRepet] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [isChangePasswordState, setIsChangePasswordSate] = useState(false);

    const history = useHistory();

    const user = useContext(UserContext)

    useEffect(() => {
        const setUserState = () => {
            setUsername(user.user!.displayName!);
            setEmail(user.user!.email!)
        }
        if(user.user !== null) {
            setUserState();
        }
    },[user])

    const onSubmit = (): void => {
        if(user == null){
            console.error("User is null");
        }
        else{
            if(newPassword) {
                setShowPasswordModal(true);
                return;
            }
            try{
                if (user.user!.displayName !== username) {
                    updateUsername(user!.user!, username)
                    updateDbDisplayName({uid: user!.user!.uid, displayName: username})
                }
                history.push("/")
            }
            catch(error){
                setErrorMessage("Noe gikk galt, vennligst prøv igjen.")
            }
        }
    }

    const onReAuthenticateSubmit = async () => {
        if(user == null){
            console.error("User is null");
        }
        else {
            try{
                await reAuthenticateUser(user.user!, password)
                if(user.user!.email !== email) {
                    updateEmail(user.user!, email)
                }
                if(newPassword !== "") {
                    if(newPassword === newPasswordRepet){
                        updatePassword(user.user!, newPassword)
                    }
                    else{
                        alert("Passordene må være like")
                    }
                }
                history.push("/")
            }
            catch(error){
                setErrorMessage("Noe gikk galt, vennligst prøv igjen.")
            }
        }
    }

    const onSignOut = () => {
        signOut();
        history.push('/');
    }

    return(
        <div className="myInfo-container">
            <Input title={"Brukernavn:"} value={username} onChange={setUsername} />
            <Input title={"Email:"} value={email!} onChange={setEmail} readOnly={true}/>
            <Button className="myinfo-button" onClick={() => setIsChangePasswordSate(!isChangePasswordState)}>Endre passord</Button>
            {isChangePasswordState && 
                <div>
                    <Input title={"Nytt passord:"} value={newPassword} onChange={setNewPassword} type={"password"} />
                    <Input title={"Gjenta passord:"} value={newPasswordRepet} onChange={setNewPasswordRepet} type={"password"} />

                    {(newPasswordRepet && (newPassword !== newPasswordRepet)) && <p className='errorMessage'>{"Passordene må være like"}</p>}

                </div>
            } 

            {errorMessage && <p className='errorMessage'>{errorMessage}</p>}

            <Button className="myinfo-button" onClick={onSubmit}>Lagre</Button>
            <Button className="myinfo-button" variant="danger" onClick={onSignOut}>Logg ut</Button>


            <ReAuthenticateModal show={showPasswordModal} password={password} onHide={() => setShowPasswordModal(false)} onPasswordChange={setPassword} onSubmit={onReAuthenticateSubmit}/>
        </div>
    )
}

export default MyInfo;