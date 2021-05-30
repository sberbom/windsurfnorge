import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import {signOut} from '../utils'
import { useHistory } from "react-router-dom";
import {IModal} from '../types/types';

const SignOutModal = (props: IModal) => {
    const history = useHistory();

    const onSignOut = () => {
        signOut();
        props.onHide();
        history.push('/');
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
            Logg ut
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>
            Vil du logge ut?
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onSignOut}>Logg ut</Button>
            <Button onClick={props.onHide}>Avbryt</Button>
        </Modal.Footer>
        </Modal>
    )
}

export default SignOutModal;