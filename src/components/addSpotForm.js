import React from 'react';
import { Button, Form } from 'react-bootstrap';
import ImageUploade from './imageUploade'
import '../styles/addSpotForm.css';
import ImageSelector from './imageSelector';

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

            <Form.Group controlId="exampleForm.ControlTextarea6">
                <Form.Label>Facbook side</Form.Label>
                <Form.Control as="textarea" rows="1" value={props.facebook} onChange={(event) => props.onFacebookPageChange(event.target.value)}/>
            </Form.Group>

            <label className="form-label">Last opp bilder</label>
            <ImageUploade images={props.images} setImages={props.setImages} spotName={props.name} />

            {props.images.length > 0 && <label className="form-label">Velg hovedbilde</label>}
            <ImageSelector images={props.images} mainImage={props.mainImage} setMainImage={props.setMainImage} onDeleteImage={props.onDeleteImage}/>

            <Button variant="primary" type='submit' className="saveSpotButton" onClick={props.onSubmit} >
                {props.isEdit ? "Lagre spot" : "Legg til spot"}
            </Button>
        </div>
    )
}

export default AddSpotForm;