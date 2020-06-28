import React from 'react';
import Geocode from "react-geocode";
import { withRouter } from 'react-router-dom';
import { googleKey } from '../api';
import AddSpotForm from '../components/addSpotForm';
import Header from '../components/header';
import Map from '../components/map';
import { storage } from '../firebase';
import '../styles/addSpot.css';
import '../styles/spot.css';


class AddSpot extends React.Component {
    constructor(props){
        super(props)
        this.addSpotFormContainerRef = React.createRef()
        this.mapRef = React.createRef()
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
        Geocode.setApiKey(googleKey);
    }

    componentDidMount() {
        console.log(this.addSpotFormContainerRef.current.clientHeight)
        this.setState({height: this.addSpotFormContainerRef.current.clientHeight})
    }

    handleImageAsFile = (e) => {
        const image = e.target.files[0]
        console.log(image)
        this.setState({imageAsFile: image})
    }

    getAddress = (lat, lng) => {
        Geocode.fromLatLng(lat, lng).then(
            response => {
              const address = response.results[0].formatted_address;
              this.setState({address: address})
            },
            error => {
              console.error(error);
            }
          );
    }

    dragEnd = (t, map, coord) => {
        const {latLng} = coord; 
        const lat = latLng.lat();
        const lng = latLng.lng();
        this.getAddress(lat, lng);
        this.setState({latLng: {lat: lat, lng: lng}})
      }

    isUrl(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    }

    handleFirebaseUpload = e => {
        e.preventDefault();
        console.log('start of uplaod')
        if(this.state.imageAsFile === '') {
            console.error(`not an image, the image file is a ${typeof(this.state.imageAsFile)}`)
          }
        const uploadTask = storage.ref(`/images/${this.state.imageAsFile.name}`).put(this.state.imageAsFile)
        uploadTask.on('state_changed', 
        (snapShot) => {
            console.log(snapShot)
            }, (err) => {
            console.log(err)
            }, () => {
            storage.ref('images').child(this.state.imageAsFile.name).getDownloadURL()
            .then(fireBaseUrl => {
                this.setState( {imageAsUrl: {...this.state.imageAsUrl, imgUrl: fireBaseUrl}})
                //Må legge til fireBseUrl som lenke til bilde i DB
            })
            })
        }

    onSubmit = (e) => {
        console.log("clicked")
        console.log(this.aboutRef.current.value)
        console.log(this.approachRef.current.value)
        console.log(this.facebookPageRef.current.value)
        console.log(this.isUrl(this.facebookPageRef.current.value))
        console.log(this.state.imageAsUrl)
        this.handleFirebaseUpload(e)
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