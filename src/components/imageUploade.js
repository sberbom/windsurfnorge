import React, { useState } from 'react';
import {storage} from '../firebase'
import {Button} from 'react-bootstrap'
import sync from '../images/sync.png'
import checked from '../images/checked.png'
import close from '../images/close.png'
import imageCompression from 'browser-image-compression';
import {getRandomInt} from '../utils'
import '../styles/imageUploade.css'

const ImageUploade = ({setBigImageAsUrl, bigImageAsUrl, smallImageAsUrl, setSmallImageAsUrl, spotName}) =>  {

    const [imageAsFile, setImageAsFile] = useState('');
    const [bigImageAsFile, setBigImageAsFile] = useState('');
    const [smallImageAsFile, setSmallImageAsFile] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isUploadeCompleted, setIsUploadeCompleted] = useState(false);
    const [isError, setIsError] = useState(false);
    const [bigImageName, setBigImageName] = useState('')
    const [smallImageName, setSmallImageName] = useState('')

    const optionsBigImage = {
        maxSizeMB: 5, 
        maxWidthOrHeight: 1920,
        useWebWorker: true
    }

    const optionsSmallImage = {
        maxSizeMB: 2, 
        maxWidthOrHeight: 286,
        useWebWorker: true
    }

    const handleImageAsFile = async (event) => {
        const image = event.target.files[0]
        const compressedFileBig = await imageCompression(image, optionsBigImage);
        const compressedFileSmall = await imageCompression(image, optionsSmallImage);
        const randint = getRandomInt()
        setBigImageName(spotName + randint + 'big.jpg')
        setSmallImageName(spotName + randint + 'small.jpg')
        setBigImageAsFile(compressedFileBig)
        setSmallImageAsFile(compressedFileSmall)
        setImageAsFile(image)
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

        const bigImageUploade = storage.ref(`/images/${bigImageName}`).put(bigImageAsFile)
        const smallImageUploade = storage.ref(`/images/${smallImageName}`).put(smallImageAsFile)

        bigImageUploade.on('state_changed', 
        (snapShot) => {
            console.log(snapShot)
        }, (err) => {
            console.log(err)
            setIsError(true)
            setIsUploading(false)
        }, () => {
            storage.ref('images').child(bigImageName).getDownloadURL()
                .then(fireBaseUrl => {
                    setBigImageAsUrl(bigImageAsUrl.concat(fireBaseUrl))
            })
        })

        smallImageUploade.on('state_changed', 
        (snapShot) => {
            console.log(snapShot)
        }, (err) => {
            console.log(err)
            setIsError(true)
            setIsUploading(false)
        }, () => {
            storage.ref('images').child(smallImageName).getDownloadURL()
                .then(fireBaseUrl => {
                    setSmallImageAsUrl(smallImageAsUrl.concat(fireBaseUrl))
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