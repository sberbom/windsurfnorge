import React from 'react';
import '../styles/cardList.css';
import Card from './card';

function CardList({spots}) {
    return(
        <div className="cardList-container">
            <div className="cardList">
                {spots.map((spot, i) => {
                    let image = "https://images.unsplash.com/photo-1488278905738-514111aa236c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                    if(spot.small_image){
                        image = spot.small_image
                    }
                    return(
                        <Card
                        key={i}
                        title={spot.name}
                        text={spot.about}
                        button="Se mer"
                        image={image}
                        rating={spot.rating}
                    />)}
                )}
            </div>
        </div>
    )
}

export default CardList;