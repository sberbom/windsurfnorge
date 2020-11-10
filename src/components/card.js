import React from 'react';
import {Card, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import '../styles/card.css'

function SBCard({title, text, button, image}) {
    return(
        <div className="card-container">
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{text}</Card.Text>
                <Link to={`/spot?spotName=${title}`} ><Button variant="primary">{button}</Button></Link>
            </Card.Body>
            </Card>
        </div>
    )
}

export default SBCard;