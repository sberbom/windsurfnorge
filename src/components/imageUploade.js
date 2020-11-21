import React, { useState } from 'react';
import {storage} from '../firebase'
import {Button} from 'react-bootstrap'
import sync from '../images/sync.png'
import checked from '../images/checked.png'
import close from '../images/close.png'
import imageCompression from 'browser-image-compression';
import {getRandomInt} from '../utils'
import '../styles/imageUploade.css'

const ImageUploade = ({setImageAsUrl, imageAsUrl, spotName}) =>  {

    const [imageAsFile, setImageAsFile] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isUploadeCompleted, setIsUploadeCompleted] = useState(false);
    const [isError, setIsError] = useState(false);
    const [imageName, setImageName] = useState('')

    const options = {
        maxSizeMB: 1, 
        maxWidthOrHeight: 1920,
        useWebWorker: true
    }

    const handleImageAsFile = async (event) => {
        const image = event.target.files[0]
        const compressedFile = await imageCompression(image, options);
        setImageName(spotName + getRandomInt())
        setImageAsFile(compressedFile)
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
        const uploadTask = storage.ref(`/images/${imageName}`).put(imageAsFile)
        uploadTask.on('state_changed', 
        (snapShot) => {
            console.log(snapShot)
        }, (err) => {
            console.log(err)
            setIsError(true)
            setIsUploading(false)
        }, () => {
            storage.ref('images').child(imageName).getDownloadURL()
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