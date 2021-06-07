import 'react-alice-carousel/lib/alice-carousel.css';
import '../styles/cardCarousel.css'

import AliceCarousel from 'react-alice-carousel';
import Card from './card'
import {ISpot} from '../types/types'
import React from 'react';
import Skeleton from 'react-loading-skeleton';

interface props {
    spots: ISpot[];
}
 
const CardCarousel = ({spots}:props) => {
    const handleDragStart = (e: Event): void => e.preventDefault();

    let cards = [];
    
    if(spots.length === 0) {
        for(let i=0; i < 4; i++){
            cards.push(<div className="card-skeleton-container"><Skeleton width={"18rem"} height={400}/></div>)
        }
    }
    else{
        cards = spots.sort((spot1, spot2) => spot2.views - spot1.views).map((spot, i) => {
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
                    onDragStart={handleDragStart}
                    image={image}
                    rating={spot.rating}
                />
            )}
            
        )  
    }
    

    const responsive = {
        0: { items: 1 },
        750: { items: 2 },
        1150: { items: 3 },
        1530: {items: 4}
    };

    return (
        <AliceCarousel mouseTracking items={cards} responsive={responsive} autoPlay={true} autoPlayInterval={12000} disableDotsControls={true}/>
    );
}

export default CardCarousel;