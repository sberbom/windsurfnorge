import React from 'react';
import ImageGallery from 'react-image-gallery';
import '../styles/imageGallery.css'
import "react-image-gallery/styles/css/image-gallery.css";



const SBImageGallery = ({images, smallImages}) => {
    
    const imageObjects = images.map((image, i) =>{
        return {
            original: image,
            thumbnail: smallImages[i]
        }
    })
        
    return (
        <ImageGallery 
            items={imageObjects} 
            showFullscreenButton={false} 
            showPlayButton={false}
            showNav={true}
            showBullets={true}
            thumbnailPosition={"bottom"}
        />
    );
}

export default SBImageGallery;