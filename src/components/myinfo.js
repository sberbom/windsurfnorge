import React, { useEffect, useState } from 'react';
import {Button} from 'react-bootstrap'
import {updateUsername, updateEmail, reAuthenticateUser, updatePassword, signOut} from '../utils'
import { useHistory } from "react-router-dom";
import ReAuthenticateModal from './reAuthenticateModal';
import Input from './input'
import '../styles/myinfo.css'

const MyInfo = ({user, dbUser}) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordRepet, setNewPasswordRepet] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [isChangePasswordState, setIsChangePasswordSate] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if(user && dbUser) {
            dbUser.displayname && setUsername(dbUser.displayname)
            setEmail(user.email)
        }  
    }, [user, dbUser])

    const onSubmit = () => {
        if(user.email !== email || newPassword) {
            setShowPasswordModal(true);
            return;
        }
        try{
            if (user.displayName !== username) {
                updateUsername(user, dbUser.id, username)
            }
            history.push("/")
        }
        catch(error){
            setErrorMessage("Noe gikk galt, vennligst prøv igjen.")
        }
    }

    const onReAuthenticateSubmit = async () => {
        try{
            await reAuthenticateUser(user, password)
            if(user.email !== email) {
                updateEmail(user, email)
            }
            if(newPassword !== "") {
                if(newPassword === newPasswordRepet){
                    updatePassword(user, newPassword)
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

    const onSignOut = () => {
        signOut();
        history.push('/');
    }

    return(
        <div className="myInfo-container">
            <Input title={"Brukernavn:"} value={username} onChange={setUsername} />
            <Input title={"Email:"} value={email} onChange={setEmail} />
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
            <Button className="myinfo-button" onClick={onSignOut}>Logg ut</Button>


            <ReAuthenticateModal show={showPasswordModal} password={password} onHide={() => setShowPasswordModal(false)} onPasswordChange={setPassword} onSubmit={onReAuthenticateSubmit}/>
        </div>
    )
}

export default MyInfo;