import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../styles/imageCarousel.css'

const ImageCarousel = ({images}) => {
    const handleDragStart = (e) => e.preventDefault();

    console.log(images)

    const imageObjects = images.map((image, i) =>
        <div className="image-container">
            <img
                className="imageCarousel-image"
                key={i}
                src={image}
                alt={image}
                onDragStart={handleDragStart}
            />
        </div> 
    )
        

    // const responsive = {
    //     0: { items: 1 },
    //     770: { items: 2 },
    //     1150: { items: 3 },
    //     1530: {items: 4}
    // };

    return (
        <AliceCarousel 
            mouseTracking 
            items={imageObjects} 
            autoPlay={true} 
            autoPlayInterval={3000} 
            disableDotsControls={true}
            autoHeight  
            />
    );
}

export default ImageCarousel;