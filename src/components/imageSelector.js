import React, {useState} from 'react';
import '../styles/imageSelector.css'
import close from '../images/close.png'
import ConfirmDeleteModal from './confirmDeleteModal'

const ImageSelector = ({images, mainImage, setMainImage, onDeleteImage}) => {

    const [imageToDelete, setImageToDelete] = useState();
    const [imageToDeleteIndex, setImageToDeleteIndex] = useState(0);
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false)

    const onShowDeleteModal = (image, index) => {
        setImageToDelete(image)
        setImageToDeleteIndex(index)
        setShowConfirmDeleteModal(true)
    }

    const onDelete = () => {
        onDeleteImage(imageToDeleteIndex);
        setShowConfirmDeleteModal(false);
    }
        
    return (
        <div className="image-selector-container">
            {images.map((image, index) => 
                <div className="select-image-container" key={index+"container"}>
                    <img src={close} alt="close" className="delete" onClick={() => onShowDeleteModal(image, index)} key={index+"close"}/>
                    <img 
                        src={image} 
                        alt="spotImage" 
                        key={index} 
                        className={`image-selector-image ${index===mainImage ? "selected" : ""}`}
                        onClick={() => setMainImage(index)}
                        /> 
                </div>
            )}
            <ConfirmDeleteModal show={showConfirmDeleteModal} deleteImage={onDelete} img={imageToDelete} onHide={() => setShowConfirmDeleteModal(false)}/>
        </div>
        
    );
}

export default ImageSelector;