import React from 'react';
import {withRouter} from 'react-router-dom';
import Header from '../components/header'
import Map from '../components/map'
import AddSpotForm from '../components/addSpotForm';
import '../styles/addSpot.css'
import '../styles/spot.css'

class AddSpot extends React.Component {
    constructor(props){
        super(props)
        this.addSpotFormContainerRef = React.createRef()
        this.mapRef = React.createRef()
        this.aboutRef = React.createRef()
        this.approachRef = React.createRef()
        this.facebookPageRef = React.createRef()
        this.posRef = React.createRef()
        this.state = {
            height: 0,
            pos: null
        }
    }

    componentDidMount() {
        console.log(this.addSpotFormContainerRef.current.clientHeight)
        this.setState({height: this.addSpotFormContainerRef.current.clientHeight})
    }

    onDragEnd = (t, map, coord) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        console.log(t)
        console.log(map)
        console.log(coord)
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

    onSubmit = () => {
        console.log("clicked")
        console.log(this.aboutRef.current.value)
        console.log(this.approachRef.current.value)
        console.log(this.facebookPageRef.current.value)
        console.log(this.isUrl(this.facebookPageRef.current.value))
        console.log(this.posRef.current.props)
    }

    render(){
        return(
            <div>
                <Header
                    title="Legg til spot"
                />
                <div className="spot-container">
                    <div className="spot-map-container">
                        <Map />
                    </div>
                    <div className="addSpot-spotInfo" ref= {this.addSpotFormContainerRef}>
                        <AddSpotForm 
                            onSubmit={this.onSubmit} 
                            aboutRef={this.aboutRef}
                            approachRef={this.approachRef}
                            facebookPageRef = {this.facebookPageRef}
                        />
                    </div>
                </div>
            </div>
        )
    }
    
}

export default withRouter(AddSpot);