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
                        image={spot.images && spot.images[0] ? spot.images[0] : "https://fiskesnakk.files.wordpress.com/2010/09/img_8242-3.jpg"}
                    />
                )}
            </div>
        </div>
    )
}

export default CardList;