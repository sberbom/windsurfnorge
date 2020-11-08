import React, {useState, useEffect, useContext} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom'
import LogInModal from './logInModal'
import '../styles/navbar.css'
import {UserContext} from '../providers/userProvider';

const SBNavbar = () =>  {
    const [navBackground, setNavBackground] = useState({backgroundColor: "rgba(0, 0, 0, 0)"})
    const [showLogInModal, setShowLogInModal] = useState(false);
    const user = useContext(UserContext)

    useEffect(() => { 
        const getNavBackground = () => {
            document.addEventListener("scroll", () => {
                const backgroundcolor = window.scrollY < 100 ? {backgroundColor: "rgba(0, 0, 0, 0)"} : {backgroundColor: "rgba(0, 0, 0, 0.7)"}
                setNavBackground(backgroundcolor)
            });
        }
        getNavBackground();
    }, [])
    
    return(
        <div>
            <Navbar expand="lg" className="sbnavbar" style={navBackground}>
                <Navbar.Brand style={{color: "white"}}><Link to='home' className='navbar-brand' style={{color: "white"}}>Windsurf Norge</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/home" className="nav-link" style={{color: "white"}} >Hjem</Link>
                        <Link to="/map" className="nav-link" style={{color: "white"}}>Kart</Link>
                        <Link to="/allSpots" className="nav-link" style={{color: "white"}}>Steder å windsurfe</Link>
                        <Link to="/addSpot" className="nav-link" style={{color: "white"}}>Legg til spot</Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className='justify-content-end'>
                    <Nav>
                        {user ? 
                            <Link to="/mypage" className="nav-link" style={{color: "white"}}>{user.email}</Link>
                            :                        
                            <div onClick={() => setShowLogInModal(true)} className="nav-link link-text" style={{color: "white"}}>Logg inn</div>
                    }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <LogInModal show={showLogInModal} onHide={() => setShowLogInModal(false)}/>
        </div>
    )
}

export default withRouter(SBNavbar);