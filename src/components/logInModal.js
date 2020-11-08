import React,  {useState} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {signIn, signInWithGoogle, signInWithFacebook} from '../utils'
import { useHistory } from "react-router-dom";
import signInWithGoogleButton from '../images/signInWithGoogle.png'
import continueWithFacebookButton from '../images/continuteWithFacebook.png'
import '../styles/logIn.css';

const LogInModal = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState()

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
            console.log(error)
        } 
    }

    const onSignInWithGoogle = async () => {
        try{
            props.onHide();
            await signInWithGoogle();
            history.push('/')
        }catch(error) {
            console.log(error)
        } 
    }

    const onSignInWithFacebook = async () => {
        try{
            props.onHide();
            await signInWithFacebook();
            history.push('/')
        }catch(error) {
            console.log(error)
        } 
    }

    const onRegistrer = () => {
        props.onHide();
        history.push('/register')
    
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
                <Form.Group controlId="formBasicEmail" onSubmit={onSignIn}>
                    <Form.Label>Epost</Form.Label>
                    <Form.Control type="email" placeholder="windsurf@norge.no" onChange={(event) => setEmail(event.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Passord</Form.Label>
                    <Form.Control type="password" placeholder="Passord" onChange={(event) => setPassword(event.target.value)}/>
                </Form.Group>

                {errorMessage && <p className='errorMessage'>{errorMessage}</p>}

                <div className='externalLogInContainer'>
                    <img src={signInWithGoogleButton} alt='sign in with google' onClick={onSignInWithGoogle} className='logInImg'/>
                    <img src={continueWithFacebookButton} alt='continue with facebook' onClick={onSignInWithFacebook} className='logInImg'/>
                </div>
                
                {/* <Button variant="primary" className='hidden' type="submit">Logg inn</Button>             */}
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

export default withRouter(LogInModal);