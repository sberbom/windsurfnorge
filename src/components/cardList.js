import React from 'react';
import SBCard from './card'
import '../styles/cardList.css'

function CardList(props) {
    let spots = []
    for (var i = 0; i<props.cards; i++) {
        spots.push(
            <SBCard
                key={i}
                title="Spot navn"
                text="Her kan man legge inn den første informasjonen om spotten og hvordan den kommer til å se ut. Håper det blir kult!"
                button="Se mer"
            />
        )
    }
    return(
        <div className="cardList-container">
            <div className="cardList">
                {spots}
            </div>
        </div>
    )
}

export default CardList;