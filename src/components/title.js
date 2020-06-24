import React from 'react';
import '../styles/title.css'

function Title(props) {
    return(
        <div className="title-container">
            <h2>{props.title}</h2>
        </div>
    )
}

export default Title;