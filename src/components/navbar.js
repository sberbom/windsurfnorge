import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom'
import '../styles/navbar.css'

class SBNavbar extends React.Component {
    
    constructor(props){
        super(props)
        this.state ={
            navBackground: {backgroundcolor: "rgba(0, 0, 0, 1)"}
        }
    }

    componentDidMount() {
        document.addEventListener("scroll", () => {
            const backgroundcolor = window.scrollY < 100 ? {backgroundColor: "rgba(0, 0, 0, 0)"} : {backgroundColor: "rgba(0, 0, 0, 0.7)"}
            this.setState({ navBackground: backgroundcolor });
            console.log(window.location.pathname)
        });
      }
    
    render() {
        return(
            <Navbar expand="lg" className="sbnavbar" style={this.state.navBackground}>
                <Link to="/home"><Navbar.Brand style={{color: "white"}} href="#home">Windsurf Norge</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/home" className="nav-link" style={{color: "white"}} >Hjem</Link>
                        <Link to="/map" className="nav-link" style={{color: "white"}}>Kart</Link>
                        <Link to="/allSpots" className="nav-link" style={{color: "white"}}>Steder å windsurfe</Link>
                        <Link to="/addSpot" className="nav-link" style={{color: "white"}}>Legg til</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default withRouter(SBNavbar);