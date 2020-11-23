import React from 'react';
import '../styles/cardList.css';
import Card from './card';

function CardList({spots}) {
    
    return(
        <div className="cardList-container">
            <div className="cardList">
                {spots.map((spot, i) => {
                    let image = "https://fiskesnakk.files.wordpress.com/2010/09/img_8242-3.jpg"
                    if(spot.smallImages && spot.smallImages[0]){
                        image = spot.smallImages[0]
                    }
                    else if(spot.images && spot.images[0]) {
                        image = spot.images[0]
                    }
                    return(
                        <Card
                        key={i}
                        title={spot.name}
                        text={spot.about}
                        button="Se mer"
                        image={image}
                    />)}
                )}
            </div>
        </div>
    )
}

export default CardList;