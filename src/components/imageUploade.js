import React, { useState } from 'react';
import {storage} from '../firebase'
import sync from '../images/sync.png'
import checked from '../images/checked.png'
import close from '../images/close.png'
import imageCompression from 'browser-image-compression';
import {getRandomInt} from '../utils'
import '../styles/imageUploade.css'

const ImageUploade = ({ bigImageAsUrl, smallImageAsUrl, setSmallImageAsUrl, setBigImageAsUrl, spotName}) =>  {

    const [isUploading, setIsUploading] = useState(false);
    const [isUploadeCompleted, setIsUploadeCompleted] = useState(false);
    const [isError, setIsError] = useState(false);
    const imageAsFile = [];
    const bigImageAsFile = [];
    const smallImageAsFile = [];
    const bigImageName = [];
    const smallImageName = [];

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
        console.log(event.target.files)
        console.log(event.target.files[0])
        const files = event.target.files
        console.log(files.length)
        for(let i = 0; i< files.length; i++) {
            const image = files[i]
            const compressedFileBig = await imageCompression(image, optionsBigImage);
            const compressedFileSmall = await imageCompression(image, optionsSmallImage);
            const randint = getRandomInt()
            bigImageName.push(spotName + randint + i + 'big.jpg')
            smallImageName.push(spotName + randint + 'small.jpg')
            bigImageAsFile.push(compressedFileBig)
            smallImageAsFile.push(compressedFileSmall)
            imageAsFile.push(image)
        }
        handleFirebaseUploade()    
    } 

    const handleFirebaseUploade = async () => {
        console.log('start of uploade')
        for(let image in imageAsFile) {
            if(image === '') {
                console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
                setIsError(true)
                return;
            }
        }
        setIsError(false)
        setIsUploadeCompleted(false)
        setIsUploading(true);
        
        let newBigImageUrl = []
        let newSmallImageUrl = []
        const numberOfImages = bigImageName.length

        for(let i = 0; i < numberOfImages; i++){

            await storage.ref(`/images/${bigImageName[i]}`).put(bigImageAsFile[i])
            let fireBaseUrl = await storage.ref('images').child(bigImageName[i]).getDownloadURL()
            newBigImageUrl.push(fireBaseUrl)
            if(newBigImageUrl.length === numberOfImages) {
                setBigImageAsUrl(bigImageAsUrl.concat(newBigImageUrl))
                console.log("big completed")
                
            }
        
            await storage.ref(`/images/${smallImageName[i]}`).put(smallImageAsFile[i])
            fireBaseUrl = await storage.ref('images').child(smallImageName[i]).getDownloadURL()
            newSmallImageUrl.push(fireBaseUrl)
            if(newSmallImageUrl.length === numberOfImages) {
                setSmallImageAsUrl(smallImageAsUrl.concat(newSmallImageUrl))
                console.log("Small completed")
                setIsUploadeCompleted(true);
                setIsUploading(false);
            } 
        }
    }
 
    
    return(
        <div className="imageUploade-container">
            <div>
                <input
                    type={"file"}
                    onChange={handleImageAsFile}
                    multiple
                />
                {isUploading && <img src={sync} alt="sync" />}
                {isUploadeCompleted && <img src={checked} alt="checked" />}
                {isError && <img src={close} alt="close" />}
            </div>
        </div>
        
    )
}

export default ImageUploade;