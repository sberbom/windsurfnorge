import React from 'react';
import {withRouter} from 'react-router-dom';
import Header from '../components/header'
import Map from '../components/map'
import SpotInfo from '../components/spotInfo'
import '../styles/spot.css'

function Spot(props) {
    return(
        <div>
            <Header
                title="Halden Brygge"
            />
            <div className="spot-container">
                <div className="spot-map-container">
                    <Map />
                </div>
                <div className="spot-spotInfo-container">
                    <SpotInfo/>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Spot);