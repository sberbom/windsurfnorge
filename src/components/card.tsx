import React from 'react';
import {Card, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import '../styles/card.css'
import Rating from 'react-rating'
import star from '../images/star.png'
import star_empty from '../images/star_empty.png'

interface props {
    title: string;
    text: string;
    button: string;
    image: string;
    rating: number;
    onDragStart?: (e: Event) => void;
}

function SBCard({title, text, button, image, rating}:props) {
    return(
        <div className="card-container">
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image} alt="image of spot" />
            <Card.Body>
                <Card.Title className="no-overflow">{title}</Card.Title>
                <Card.Text>
                    <Rating
                        emptySymbol={<img src={star_empty} className="icon rating-img-card" alt="emptyStar"/>}
                        fullSymbol={<img src={star} className="icon rating-img-card" alt="filledStar"/>}
                        fractions={2}
                        initialRating={rating ? rating : 0}
                        readonly
                    />
                    <br/>
                    {text}
                </Card.Text>
                <Link to={`/spot?spotName=${title}`} ><Button variant="primary">{button}</Button></Link>
            </Card.Body>
            </Card>
        </div>
    )
}

export default SBCard;