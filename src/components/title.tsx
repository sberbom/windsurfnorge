import '../styles/title.css'

import React from 'react';

interface IProps {
    title: string;
}

const Title = ({title}: IProps) => {
    return(
        <div className="title-container">
            <h2>{title}</h2>
        </div>
    )
}

export default Title;