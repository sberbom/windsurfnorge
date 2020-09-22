import React from 'react';
import '../styles/cardList.css';
import Card from './card';

function CardList({spots}) {
    
    return(
        <div className="cardList-container">
            <div className="cardList">
                {spots.map((spot, i) => 
                    <Card
                        key={i}
                        title={spot.name}
                        text={spot.about}
                        button="Se mer"
                    />
                )}
            </div>
        </div>
    )
}

export default CardList;