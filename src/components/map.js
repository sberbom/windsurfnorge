import React from "react"
import GoogleMapReact from 'google-map-react';
// import markerImage from '../images/marker.jpg'
import '../styles/map.css'

// const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Marker = () => <div>text<img src="https://w7.pngwing.com/pngs/731/25/png-transparent-location-icon-computer-icons-google-map-maker-marker-pen-cartodb-map-marker-heart-logo-color.png" alt='marker' /></div>

class SBMap extends React.Component {
    static defaultProps = {
      center: {
        lat: 61.123456,
        lng: 8.707806
      },
      zoom: 6
    };
  
    render() {
      return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }} className="map">
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyDLFNjSzsWzf-kaVS9vh5it3fQvE3STxdU' }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >

            <Marker
              lat={61.123456}
              lng={8.707806}
            />
            {/* <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            /> */}
          </GoogleMapReact>
        </div>
      );
    }
  }
  
  export default SBMap;
