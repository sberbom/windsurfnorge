import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import {deleteSpot} from '../db-service'
import { useHistory } from "react-router-dom";
import '../styles/confirmDeleteModal.css'


const DeleteSpotModal = (props) => {

    const history = useHistory()

    const onDeleteSpot = (spotName) => {
        deleteSpot(spotName); 
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
                Bekrefte sletting
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Vil du slette spotten, {props.spot.name}?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => onDeleteSpot(props.spot.name)}>Slette</Button>
                <Button onClick={props.onHide}>Avbryt</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteSpotModal;