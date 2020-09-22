import React from 'react';
import '../styles/spotInfo.css'

function SpotInfo({spot}) {
    return(
        <div className="spotInfo-container">
            <h2>Beskrivelse</h2>
            <p>{spot.about}</p>
            <h2>Annokmst</h2>
            <p>{spot.approach}</p>
            <h2>Facebook</h2>
            <p>{spot.facebook}</p>
        </div>
    )
}

export default SpotInfo;