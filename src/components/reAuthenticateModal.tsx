import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Input from './input'
import '../styles/logIn.css';
import {IModal} from '../types/types'

interface IProps extends IModal {
    password: string;
    onPasswordChange: React.Dispatch<React.SetStateAction<string>>;
    onSubmit: () => void;
}

const ReAuthenticateModal = (props:IProps) => {
    
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
            <Input title={"Nytt passord:"} value={props.password} onChange={props.onPasswordChange} type={"password"} />
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={props.onSubmit}>Lagre</Button>
        </Modal.Footer>
        </Modal>
    )
}

export default ReAuthenticateModal;