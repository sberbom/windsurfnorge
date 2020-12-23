import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import '../styles/confirmDeleteModal.css'


const confirmDeleteModal = (props) => {

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
                    Vil du slette bildet?
                </p>
                <img src={props.img} alt="to-delete" className="image-to-delete"/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onDelete}>Slette</Button>
                <Button onClick={props.onHide}>Avbryt</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default confirmDeleteModal;