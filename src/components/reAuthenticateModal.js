import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import '../styles/logIn.css';

const ReAuthenticateModal = (props) => {
    
    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Skriv inn passord for å oppdatere informasjon
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form className='logInForm'>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Passord</Form.Label>
                    <Form.Control type="password" placeholder="Passord" onChange={(event) => props.onPasswordChange(event.target.value)}/>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={props.onSubmit}>Lagre</Button>
        </Modal.Footer>
        </Modal>
    )
}

export default ReAuthenticateModal;