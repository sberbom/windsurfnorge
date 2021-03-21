import React, { useState, useCallback } from 'react';
import {storage} from '../firebase'
import sync from '../images/sync.png'
import checked from '../images/checked.png'
import close from '../images/close.png'
import imageCompression from 'browser-image-compression';
import {getRandomInt} from '../utils'
import {useDropzone} from 'react-dropzone'
import '../styles/imageUploade.css'

const ImageUploade = ({ spotName, setImages, images}) =>  {

    const [isUploading, setIsUploading] = useState(false);
    const [isUploadeCompleted, setIsUploadeCompleted] = useState(false);
    const [isError, setIsError] = useState(false);

    const onDrop = useCallback( async (files) => {
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

        const handleFirebaseUploade = async (imageAsFile, bigImageAsFile, smallImageAsFile, bigImageName, smallImageName) => {
            for(let image in imageAsFile) {
                if(image === '') {
                    console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
                    setIsError(true)
                    return;
                }
            }
            setIsError(false)
            setIsUploadeCompleted(false)
            console.log('start of uploade')
            setIsUploading(true);
            
            const numberOfImages = bigImageName.length
            let newImages = []
    
            for(let i = 0; i < numberOfImages; i++){
    
                try{
                    await storage.ref(`/images/${bigImageName[i]}`).put(bigImageAsFile[i])
                    const newBigImageUrl = await storage.ref('images').child(bigImageName[i]).getDownloadURL()
                    if(i+1 === numberOfImages) {
                        console.log("big completed")
                    }
                
                    await storage.ref(`/images/${smallImageName[i]}`).put(smallImageAsFile[i])
                    const newSmallImageUrl = await storage.ref('images').child(smallImageName[i]).getDownloadURL()
                    if(i+1 === numberOfImages) {
                        console.log("Small completed")
                        setIsUploadeCompleted(true);
                        setIsUploading(false);
                    } 

                    const newImage = {
                        big_image: newBigImageUrl,
                        small_image: newSmallImageUrl
                    }

                    newImages.push(newImage)

                }
                catch(error){
                    console.error("Could not uploade image", error)
                }
            }

            setImages(images.concat(newImages))

        }
        
        const imageAsFile = []
        const bigImageAsFile = []
        const smallImageAsFile = []
        const bigImageName = []
        const smallImageName = []
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
        handleFirebaseUploade(imageAsFile, bigImageAsFile, smallImageAsFile, bigImageName, smallImageName)    
      }, [spotName, images, setImages])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
    return(
        <div className="imageUploade-container">
            <div {...getRootProps()} className="input-field">
                <input
                    {...getInputProps()}
                />
                {
                    isDragActive ?
                    <p>Slipp bildene her ...</p> :
                    <p>Dra og slipp bilder her, eller klikk for å laste opp bilder</p>
                }
            </div>
            {isUploading && <img src={sync} alt="sync" />}
            {isUploadeCompleted && <img src={checked} alt="checked" />}
            {isError && <img src={close} alt="close" />}
        </div>
        
    )
}

export default ImageUploade;