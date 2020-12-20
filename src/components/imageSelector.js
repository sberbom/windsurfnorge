import React from 'react';
import '../styles/imageSelector.css'

const ImageSelector = ({images, mainImage, setMainImage}) => {

        
    return (
        <div className="image-selector-container">
            {images.map((image, index) => 
                <img 
                    src={image} 
                    alt="spotImage" 
                    key={index} 
                    className={`image-selector-image ${index===mainImage ? "selected" : ""}`}
                    onClick={() => setMainImage(index)}
                    /> 
            )}
        </div>
        
    );
}

export default ImageSelector;