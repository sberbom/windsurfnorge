import React,  {useState} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {signIn, 
    //signInWithGoogle, 
    sendPasswordResetEmail} from '../utils'
import { useHistory } from "react-router-dom";
// import signInWithGoogleButton from '../images/signInWithGoogle.png'
// import continueWithFacebookButton from '../images/continuteWithFacebook.png'
import Input from './input'
import '../styles/logIn.css';
import {IModal} from '../types/types'


const LogInModal = (props: IModal) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState("")
    const [recoveryEmail, setRecoveryEmail] = useState("")
    const [isForgottonPassword, setIsForgottonPassword] = useState(false)

    const history = useHistory()

    const onSignIn = async () =>  {
        try{
            const user = await signIn(email, password);
            if(user) {
                props.onHide();
                history.push('/')
            }else {
                setErrorMessage('Kunne ikke logge in')
            }
        }catch(error) {
            console.error(error)
        } 
    }

    //const onSignInWithGoogle = async () => {
    //   try{
    //       props.onHide();
    //       const res = await signInWithGoogle();
    //       console.log(res);
    //       // history.push('/')
    //   }catch(error) {
    //       console.error(error)
    //   } 
    //}

    // const onSignInWithFacebook = async () => {
    //     try{
    //         props.onHide();
    //         await signInWithFacebook();
    //         history.push('/')
    //     }catch(error) {
    //         console.error(error)
    //     } 
    // }

    const onRegistrer = () => {
        props.onHide();
        history.push('/register')
    }

    const onRecoveryPasswordClick = () => {
        sendPasswordResetEmail(recoveryEmail)
        props.onHide();
    }

    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Logg inn
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className='logInForm'>
                <Input value={email} title={"Epost"} onChange={setEmail} /> 
                <Input value={password} title={"Passord"} onChange={setPassword} type="password" /> 

                <p className={"forgotten-password"} onClick={() => setIsForgottonPassword(!isForgottonPassword)}>Glemt passord?</p>
                {errorMessage && <p className='errorMessage'>{errorMessage}</p>}

                {isForgottonPassword && 
                    <>
                        <Input value={recoveryEmail} title={"Epost"} onChange={setRecoveryEmail} />
                        <Button variant="primary" onClick={onRecoveryPasswordClick}>Send nytt passord</Button>
                    </>
                }

                {/*<div className='externalLogInContainer'>
                    <img src={signInWithGoogleButton} alt='sign in with google' onClick={onSignInWithGoogle} className='logInImg'/>
                    <img src={continueWithFacebookButton} alt='continue with facebook' onClick={onSignInWithFacebook} className='logInImg'/>
                </div>*/}
                
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={onSignIn}>Logg inn</Button>
            <Button variant="primary" onClick={onRegistrer}>Registrer</Button>            
            <Button onClick={props.onHide}>Avbryt</Button>
        </Modal.Footer>
        </Modal>
    )
}

//@ts-ignore
export default withRouter(LogInModal);