import React, { useEffect, useState } from 'react';
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import '../styles/header.css'
import background from '../images/background.jpg'

function Header({title, link, button, image}) {

    const [backgroundImage, setBackgroundImage] = useState(background)

    useEffect(() => {
        if(image) {
            setBackgroundImage(image)
        }
    }, [image])
    

    return(
        <div className='header-container' style={{backgroundImage: backgroundImage}}>
            <div className='header-info'>
                <h1>{title}</h1>
                {button && <Link to={link}><Button>{button}</Button></Link>}
            </div>
            <img src={backgroundImage} alt="header" className="background" />
        </div>
    )
}

export default Header;