import React from 'react';
import {Card, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import '../styles/card.css'

function SBCard({title, text, button}) {
    return(
        <div className="card-container">
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://fiskesnakk.files.wordpress.com/2010/09/img_8242-3.jpg" />
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