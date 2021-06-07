import '../styles/addSpotForm.css';

import { Button, Form } from 'react-bootstrap';
import { IImage, IWindDirections } from '../types/types';

import ImageSelector from './imageSelector';
import ImageUploade from './imageUploade'
import React from 'react';
import WindDirectionSelecter from './windDirectionSelecter';

interface props {
    name: string;
    about: string;
    approach: string;
    address: string;
    facebook: string;
    windsensor: string;
    setImages: any;
    mainImage: any;
    images: IImage[];
    windDirections: IWindDirections
    isEdit: boolean;
    setMainImage: any;
    onDeleteImage: any;
    onSubmit: any;
    onNameChange: (name: string)=>void;
    onAboutChange: (about: string) => void;
    onApproachChange: (approach: string) => void;
    onFacebookPageChange: (facebookPage: string) => void;
    onWindsensorChange: (windsensor: string) => void;
    onWindDirectionsChange: (windDirections: IWindDirections) => void;
}

function AddSpotForm(props:props) {
    return (
        <div className="spotInfo-container">
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Navn</Form.Label>
                <Form.Control as="textarea" rows={1} value={props.name} onChange={(event) => props.onNameChange(event.target.value)}/>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea2">
                <Form.Label>Beskrivelse</Form.Label>
                <Form.Control as="textarea" rows={4} value={props.about} onChange={(event) => props.onAboutChange(event.target.value)} />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea3">
                <Form.Label>Adkomst</Form.Label>
                <Form.Control as="textarea" rows={3} value={props.approach} onChange={(event) => props.onApproachChange(event.target.value)} />
            </Form.Group>

            <label className="form-label">Beste vindrentinger:</label>
            <WindDirectionSelecter onWindDirectionsChange={props.onWindDirectionsChange} windDirections={props.windDirections}/> 

            <Form.Group controlId="exampleForm.ControlTextarea4">
                <Form.Label>Addresse</Form.Label>
                <Form.Control as="textarea" rows={1} value={props.address} placeholder={props.address} readOnly/>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea6">
                <Form.Label>Facbook side</Form.Label>
                <Form.Control as="textarea" rows={1} value={props.facebook} onChange={(event) => props.onFacebookPageChange(event.target.value)}/>
            </Form.Group>
            
            <Form.Group controlId="exampleForm.ControlTextarea6">
                <Form.Label>Link til vindmåler</Form.Label>
                <Form.Control as="textarea" rows={1} value={props.windsensor} onChange={(event) => props.onWindsensorChange(event.target.value)}/>
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