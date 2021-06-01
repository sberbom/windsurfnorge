import '../styles/confirmDeleteModal.css';

import {Button, Modal} from 'react-bootstrap';
import {IModal, ISpot} from '../types/types';

import React from 'react';
import {deleteSpot} from '../api-service'
import { useHistory } from "react-router-dom";

interface props extends IModal {
    spot: ISpot;
    onHide: () => void;
}

const DeleteSpotModal = (props: props) => {

    const history = useHistory()

    const onDeleteSpot = (id: number) => {
        deleteSpot(id); 
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
                <Button onClick={() => onDeleteSpot(props.spot.id)}>Slette</Button>
                <Button onClick={props.onHide}>Avbryt</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteSpotModal;