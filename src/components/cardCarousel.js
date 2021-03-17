import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import Card from './card'
import 'react-alice-carousel/lib/alice-carousel.css';
import '../styles/cardCarousel.css'
import Skeleton from 'react-loading-skeleton';
 
 
//const handleDragStart = (e) => e.preventDefault();
 
// const items = [
//   <img src="path-to-img" onDragStart={handleDragStart} className="yours-custom-class" />,
//   <img src="path-to-img" onDragStart={handleDragStart} className="yours-custom-class" />,
//   <img src="path-to-img" onDragStart={handleDragStart} className="yours-custom-class" />,
// ];
 
const CardCarousel = ({spots}) => {
    const handleDragStart = (e) => e.preventDefault();

    let cards = [];
    
    if(spots.length === 0) {
        for(let i=0; i < 4; i++){
            cards.push(<div className="card-skeleton-container"><Skeleton width={"18rem"} height={400}/></div>)
        }
    }
    else{
        cards = spots.sort((spot1, spot2) => spot2.views - spot1.views).map((spot, i) => {
            let image = "https://images.unsplash.com/photo-1488278905738-514111aa236c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            if(spot.smallImages && spot.smallImages[spot.mainImage]){
                image = spot.smallImages[spot.mainImage]
            }
            else if(spot.images && spot.images[spot.mainImage]) {
                image = spot.images[spot.mainImage]
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
        770: { items: 2 },
        1150: { items: 3 },
        1530: {items: 4}
    };

    return (
        <AliceCarousel mouseTracking items={cards} responsive={responsive} autoPlay={true} autoPlayInterval={12000} disableDotsControls={true}/>
    );
}

export default CardCarousel;