import React from 'react';
import { Button, Form } from 'react-bootstrap';
import '../styles/addSpotForm.css';

function AddSpotForm(props) {
    return (
        <div className="spotInfo-container">
            <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Navn</Form.Label>
                    <Form.Control as="textarea" rows="1" ref={props.nameRef}/>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Beskrivelse</Form.Label>
                    <Form.Control as="textarea" rows="4" ref={props.aboutRef} />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Annkomst</Form.Label>
                    <Form.Control as="textarea" rows="3" ref={props.approachRef} />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Addresse</Form.Label>
                    <Form.Control as="textarea" rows="1" placeholder={props.address} readOnly/>
                </Form.Group>

                {/* <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Bilde</Form.Label>
                    <input className='fileUploade' accept="image/*" type='file' onChange={props.handleImageAsFile}/>
                </Form.Group> */}

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Facbook side</Form.Label>
                    <Form.Control as="textarea" rows="1" ref={props.facebookPageRef}/>
                </Form.Group>
                
                <Button variant="primary" type='submit' onClick={props.onSubmit} >
                    Legg til spot
                </Button>
            </Form>
        </div>
    )
}

export default AddSpotForm;