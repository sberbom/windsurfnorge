import React from 'react';
import { Button, Form } from 'react-bootstrap';
import '../styles/addSpotForm.css';

function AddSpotForm(props) {
    // const allInputs = {imgUrl: ''}
    // const [imageAsFile, setImageAsFile] = useState('')
    // const [imageAsUrl, setImageAsUrl] = useState(allInputs)

    // const handleImageAsFile = (e) => {
    //     const image = e.target.files[0]
    //     console.log(image)
    //     setImageAsFile(imageFile => (image))
    // }

    return (
        <div className="spotInfo-container">
            <Form>
                <h2>Navn</h2>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Spottens navn</Form.Label>
                    <Form.Control as="textarea" rows="1" ref={props.nameRef} />
                </Form.Group>
                <h2>Beskrivelse</h2>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Her kan man skrive litt om spotten</Form.Label>
                    <Form.Control as="textarea" rows="4" ref={props.aboutRef} />
                </Form.Group>
                <h2>Annkomst</h2>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Hvordan kommer man seg til spotten? Parkering?</Form.Label>
                    <Form.Control as="textarea" rows="3" ref={props.approachRef} />
                </Form.Group>
                <h2>Addresse</h2>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea" rows="1" placeholder={props.address} readOnly/>
                </Form.Group>
                <h2>Bilde</h2>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Vi støtter kun opplastning av ett bilde</Form.Label>
                    <input className='fileUploade' accept="image/*" type='file' onChange={props.handleImageAsFile}/>
                </Form.Group>
                <h2>Facebook</h2>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Finnes det en facebook side hvor du kan snakke med andre som surfer på denne spotten?</Form.Label>
                    <Form.Control as="textarea" rows="1" ref={props.facebookPageRef}/>
                </Form.Group>
                <Button variant="primary" /*type="submit"*/ onClick={props.onSubmit} >
                    Legg til spot
                </Button>
            </Form>
        </div>
    )
}

export default AddSpotForm;