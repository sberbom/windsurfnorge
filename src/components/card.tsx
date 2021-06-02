import '../styles/card.css'

import { Card } from 'react-bootstrap'
import Rating from 'react-rating'
import React from 'react';
import star from '../images/star.png'
import star_empty from '../images/star_empty.png'
import { useHistory } from "react-router-dom";

interface props {
    title: string;
    text: string;
    button: string;
    image: string;
    rating: number;
    onDragStart?: (e: Event) => void;
}

const  SBCard = ({title, text, image, rating}:props) => {

    const history = useHistory()
    
    const onCardClick = () => {
        history.push(`/spot?spotName=${title}`);
    }

    return(
        <div className="card-container">
            <Card style={{ width: '18rem' }} onClick={onCardClick}>
            <div className="card-image-container">
                <Card.Img variant="top" src={image} alt="image of spot" />
            </div>
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
            </Card.Body>
            </Card>
        </div>
    )
}

export default SBCard;