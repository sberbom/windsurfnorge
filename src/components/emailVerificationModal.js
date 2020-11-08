import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import {sendEmailVerification} from '../utils'
import { useHistory } from "react-router-dom";


const EmailVerificationModal = (props) => {

    const history = useHistory();

    const onSendEmailVerification = () => {
        sendEmailVerification(props.user);
        props.onHide()
        history.push("/")
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
            Email bekreftelse
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>
            Vennligst bekreft din email
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onSendEmailVerification}>Send ny email bekreftelse</Button>
            <Button onClick={props.onHide}>Avbryt</Button>
        </Modal.Footer>
        </Modal>
    )
}

export default EmailVerificationModal;