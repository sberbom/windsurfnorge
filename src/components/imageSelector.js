import React, {useState} from 'react';
import '../styles/imageSelector.css'
import close from '../images/close.png'
import ConfirmDeleteModal from './confirmDeleteModal'

const ImageSelector = ({images, mainImage, setMainImage, onDeleteImage}) => {

    const [imageToDelete, setImageToDelete] = useState();
    const [imageToDeleteId, setImageToDeleteId] = useState(0);
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false)

    const onShowDeleteModal = (image) => {
        setImageToDelete(image.big_image)
        setImageToDeleteId(image.id)
        setShowConfirmDeleteModal(true)
    }

    const onDelete = () => {
        onDeleteImage(imageToDeleteId);
        setShowConfirmDeleteModal(false);
    }
        
    return (
        <div className="image-selector-container">
            {images.map((image, index) => 
                <div className="select-image-container" key={index+"container"}>
                    <img src={close} alt="close" className="delete" onClick={() => onShowDeleteModal(image)} key={index+"close"}/>
                    <img 
                        src={image.small_image} 
                        alt="spotImage" 
                        key={index} 
                        className={`image-selector-image ${image.id===mainImage ? "selected" : ""}`}
                        onClick={() => setMainImage(image.id)}
                        /> 
                </div>
            )}
            <ConfirmDeleteModal show={showConfirmDeleteModal} deleteImage={onDelete} img={imageToDelete} onHide={() => setShowConfirmDeleteModal(false)}/>
        </div>
        
    );
}

export default ImageSelector;