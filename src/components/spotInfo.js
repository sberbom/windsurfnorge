import React from 'react';
import '../styles/spotInfo.css'

function SpotInfo(props) {
    return(
        <div className="spotInfo-container">
            <h2>Beskrivelse</h2>
            <p>Her kan man gjeren skrive litt om spotten</p>
            <h2>Annokmst</h2>
            <p>Hvordan kommer man seg til spotten? Parkering?</p>
            <h2>Facebook</h2>
            <p>Finnes det en facebook side hvor du kan snakke med andre som surfer på denne spotten</p>
        </div>
    )
}

export default SpotInfo;