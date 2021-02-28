import React from 'react';
import { Button, Form } from 'react-bootstrap';
import ImageUploade from './imageUploade'
import '../styles/addSpotForm.css';

function AddSpotForm(props) {
    return (
        <div className="spotInfo-container">
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Navn</Form.Label>
                <Form.Control as="textarea" rows="1" value={props.name} onChange={(event) => props.onNameChange(event.target.value)}/>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea2">
                <Form.Label>Beskrivelse</Form.Label>
                <Form.Control as="textarea" rows="4" value={props.about} onChange={(event) => props.onAboutChange(event.target.value)} />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea3">
                <Form.Label>Annkomst</Form.Label>
                <Form.Control as="textarea" rows="3" value={props.approach} onChange={(event) => props.onApproachChange(event.target.value)} />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea4">
                <Form.Label>Addresse</Form.Label>
                <Form.Control as="textarea" rows="1" value={props.address} placeholder={props.address} readOnly/>
            </Form.Group>

            {/* <Form.Group controlId="exampleForm.ControlTextarea5">
                <Form.Label>Bilde</Form.Label>
                <input className='fileUploade' accept="image/*" type='file' onChange={props.handleImageAsFile}/>
            </Form.Group> */}

            <Form.Group controlId="exampleForm.ControlTextarea6">
                <Form.Label>Facbook side</Form.Label>
                <Form.Control as="textarea" rows="1" value={props.facebook} onChange={(event) => props.onFacebookPageChange(event.target.value)}/>
            </Form.Group>

            <ImageUploade setImageAsUrl={props.setImageAsUrl} imageAsUrl={props.imageAsUrl}/>
            
            <Button variant="primary" type='submit' onClick={props.onSubmit} >
                {props.isEdit ? "Lagre spot" : "Legg til spot"}
            </Button>
        </div>
    )
}

export default AddSpotForm;