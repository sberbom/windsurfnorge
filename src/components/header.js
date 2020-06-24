import React from 'react';
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import '../styles/header.css'

function Header(props) {
    return(
        <div className='header-container'>
            <div className='header-info'>
                <h1>{props.title}</h1>
                {props.button && <Link to={props.link}><Button>{props.button}</Button></Link>}
            </div>
        </div>
    )
}

export default Header;