import React,  {useState, useEffect} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {signIn} from '../utils'
import { useHistory } from "react-router-dom";
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
            }
            setErrorMessage('Kunne ikke logge in')
        }catch(error) {
            console.log(error)
        } 
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
                {/* <Button variant="primary" className='hidden' type="submit">Logg inn</Button>             */}
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={onSignIn}>Logg inn</Button>            
            <Button onClick={props.onHide}>Avbryt</Button>
        </Modal.Footer>
        </Modal>
    )
}

export default withRouter(LogInModal);