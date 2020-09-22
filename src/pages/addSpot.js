import React from 'react';
import { withRouter } from 'react-router-dom';
import AddSpotForm from '../components/addSpotForm';
import Header from '../components/header';
import Map from '../components/map';
import * as dbService from '../db-service';
import '../styles/addSpot.css';
import '../styles/spot.css';
import { getAddress } from '../utils';


class AddSpot extends React.Component {
    constructor(props){
        super(props)
        this.addSpotFormContainerRef = React.createRef()
        this.nameRef = React.createRef()
        this.aboutRef = React.createRef()
        this.approachRef = React.createRef()
        this.facebookPageRef = React.createRef()
        this.state = {
            height: 0,
            pos: null,
            latLng : {lat: 61.123456, lng: 8.707806},
            address: 'Dra markøren på kartet for å velge addresse',
            imageAsFile: '',
            imageAsUrl: {imageUrl: ''}
        }
    }

    componentDidMount() {
        this.setState({height: this.addSpotFormContainerRef.current.clientHeight})
    }

    handleImageAsFile = (e) => {
        const image = e.target.files[0]
        this.setState({imageAsFile: image})
    } 

    dragEnd = async (pos) => {
        console.log(pos)
        // const {latLng} = coord; 
        // const lat = latLng.lat();
        // const lng = latLng.lng();
        // const address = await getAddress(lat, lng)
        // this.setState({address: address});
        // this.setState({latLng: {lat: lat, lng: lng}})
      }


    checkValid = () => {
        if (this.nameRef.current.value === '' || this.state.latLng === {lat: 61.123456, lng: 8.707806}) {
            window.alert('Legg til navn og dra markøren til spottents posisjon');
            return false
        }
        return true
    }

    onSubmit = (event) => {
        const spot = {
            name: this.nameRef.current.value,
            about: this.aboutRef.current.value,
            approach: this.approachRef.current.value,
            facebook: this.facebookPageRef.current.value,
            latLng: this.state.latLng,
            imageAsFile: this.state.imageAsFile,
            imageAsUrl: this.state.imageAsUrl,
        }
        if(this.checkValid()){
            dbService.addSpot(event, spot)
        }
    }

    render(){
        return(
            <div>
                <Header
                    title="Legg til spot"
                />
                <div className="spot-container">
                    <div className="spot-map-container">
                        <Map draggable={true} onDragEnd={this.dragEnd} latLng={this.state.latLng}/>
                    </div>
                    <div className="addSpot-spotInfo" ref= {this.addSpotFormContainerRef}>
                        <AddSpotForm 
                            onSubmit={this.onSubmit} 
                            nameRef={this.nameRef}
                            aboutRef={this.aboutRef}
                            approachRef={this.approachRef}
                            facebookPageRef = {this.facebookPageRef}
                            address = {this.state.address}
                            handleImageAsFile={this.handleImageAsFile}
                        />
                    </div>
                </div>
            </div>
        )
    }
    
}

export default withRouter(AddSpot);