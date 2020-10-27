import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import Card from './card'
import 'react-alice-carousel/lib/alice-carousel.css';
import '../styles/cardCarousel.css'
 
 
//const handleDragStart = (e) => e.preventDefault();
 
// const items = [
//   <img src="path-to-img" onDragStart={handleDragStart} className="yours-custom-class" />,
//   <img src="path-to-img" onDragStart={handleDragStart} className="yours-custom-class" />,
//   <img src="path-to-img" onDragStart={handleDragStart} className="yours-custom-class" />,
// ];
 
const CardCarousel = ({spots}) => {
    const handleDragStart = (e) => e.preventDefault();

    const cards = spots.map((spot, i) => 
        <Card
            key={i}
            title={spot.name}
            text={spot.about}
            button="Se mer"
            onDragStart={handleDragStart}
        />
    )  

    const responsive = {
        0: { items: 1 },
        770: { items: 2 },
        1150: { items: 3 },
        1530: {items: 4}
    };

    return (
        <AliceCarousel mouseTracking items={cards} responsive={responsive} autoPlay={true} autoPlayInterval={3000} disableDotsControls={true}/>
    );
}

export default CardCarousel;