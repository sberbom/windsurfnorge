import React from 'react';
import '../styles/imageSelector.css'
import close from '../images/close.png'

const ImageSelector = ({images, mainImage, setMainImage, onDeleteImage}) => {
        
    return (
        <div className="image-selector-container">
            {images.map((image, index) => 
                <div className="select-image-container" key={index+"container"}>
                    <img src={close} alt="close" className="close" onClick={() => onDeleteImage(index)} key={index+"close"}/>
                    <img 
                        src={image} 
                        alt="spotImage" 
                        key={index} 
                        className={`image-selector-image ${index===mainImage ? "selected" : ""}`}
                        onClick={() => setMainImage(index)}
                        /> 
                </div>
            )}
        </div>
        
    );
}

export default ImageSelector;