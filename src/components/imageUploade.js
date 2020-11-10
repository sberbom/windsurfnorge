import React, { useState } from 'react';
import {storage} from '../firebase'
import {Button} from 'react-bootstrap'
import sync from '../images/sync.png'
import checked from '../images/checked.png'
import close from '../images/close.png'
import '../styles/imageUploade.css'


const ImageUploade = ({setImageAsUrl, imageAsUrl}) =>  {

    const [imageAsFile, setImageAsFile] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isUploadeCompleted, setIsUploadeCompleted] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleImageAsFile = (event) => {
        const image = event.target.files[0]
        setImageAsFile(imageFile => (image))
    } 

    const handleFirebaseUploade = (event) => {
        event.preventDefault();
        console.log('start of uploade')
        if(imageAsFile === '') {
            console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
            setIsError(true)
            return;
        }
        setIsError(false)
        setIsUploadeCompleted(false)
        setIsUploading(true);
        const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
        uploadTask.on('state_changed', 
        (snapShot) => {
            console.log(snapShot)
        }, (err) => {
            console.log(err)
            setIsError(true)
            setIsUploading(false)
        }, () => {
            storage.ref('images').child(imageAsFile.name).getDownloadURL()
                .then(fireBaseUrl => {
                    setImageAsUrl(imageAsUrl.concat(fireBaseUrl))
                    setIsUploading(false)
                    setIsUploadeCompleted(true)
            })
        })
    }
 
    
    return(
        <div className="imageUploade-container">
            <div>
                <input
                    type={"file"}
                    onChange={handleImageAsFile}
                />
                {isUploading && <img src={sync} alt="sync" />}
                {isUploadeCompleted && <img src={checked} alt="checked" />}
                {isError && <img src={close} alt="close" />}
            </div>
            <Button onClick={handleFirebaseUploade}>Last opp</Button>
        </div>
        
    )
}

export default ImageUploade;