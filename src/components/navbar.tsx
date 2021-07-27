import '../styles/navbar.css'

import { Link, withRouter } from 'react-router-dom'
import {Nav, Navbar} from 'react-bootstrap';
import React, {useContext, useEffect, useState} from 'react';

import LogInModal from './logInModal'
import {UserContext} from '../providers/userProvider';
import userIcon from '../images/user.png'

//import {getUser} from '../api-service'

const SBNavbar = () =>  {
    const [navBackground, setNavBackground] = useState({backgroundColor: "rgba(0, 0, 0, 0)"})
    const [showLogInModal, setShowLogInModal] = useState(false);
    const user = useContext(UserContext)
//    const [dbUser, setDbUser] = useState(null)

    const [expanded, setExpanded] = useState(false);

    useEffect(() => { 
        const getNavBackground = () => {
            document.addEventListener("scroll", () => {
                const backgroundcolor = window.scrollY < 100 ? {backgroundColor: "rgba(0, 0, 0, 0)"} : {backgroundColor: "rgba(0, 0, 0, 0.7)"}
                setNavBackground(backgroundcolor)
                setExpanded(false)
            });
        }
        getNavBackground();
    }, [expanded])

   // useEffect(() => {
   //     const getDbUser = async (email : string) => {
   //         const user = await getUser(email);
   //         setDbUser(user);
   //     }
   //     if(user) {
   //         //getDbUser(user.email)
   //     }
   // }, [user])


    const onNavbarToggle = () => {
        if(window.scrollY < 100 && !expanded){
            setNavBackground({backgroundColor: "rgba(0, 0, 0, 0.7)"})
        }
        else if(window.scrollY < 100 && expanded){
            setNavBackground({backgroundColor: "rgba(0, 0, 0, 0)"})
        }
        setExpanded(!expanded)
    }

    const onLinkClick = () => {
        if(navBackground.backgroundColor === "rgba(0, 0, 0, 0.7)"){
            setNavBackground({backgroundColor: "rgba(0, 0, 0, 0)"})
        }
        setExpanded(false)
    }

    return(
        <div>
            <Navbar expand="lg" className="sbnavbar" style={navBackground} expanded={expanded}>
                <Navbar.Brand style={{color: "white"}}><Link to='home' className='navbar-brand' style={{color: "white"}}>Windsurf Norge</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={onNavbarToggle}/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/home" className="nav-link" style={{color: "white"}} onClick={onLinkClick}>Hjem</Link>
                        <Link to="/map" className="nav-link" style={{color: "white"}} onClick={onLinkClick}>Kart</Link>
                        <Link to="/allSpots" className="nav-link" style={{color: "white"}} onClick={onLinkClick}>Steder å windsurfe</Link>
                        <Link to="/addSpot" className="nav-link" style={{color: "white"}} onClick={onLinkClick}>Legg til spot</Link>
                        <Link to="/forum" className="nav-link" style={{color: "white"}} onClick={onLinkClick}>Forum</Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className='justify-content-end'>
                    <Nav>
                        {user.user ? 
                            // @ts-ignore: Object is possibly 'null'
                            // Fix the above problems
                            <Link to="/mypage" className="nav-link" style={{color: "white"}}>{user.user.displayName}{<img className="navbarIcon" src={userIcon} alt={"bruker ikon"}/>}</Link>
                            :     
                            <div onClick={() => setShowLogInModal(true)} className="nav-link link-text" style={{color: "white"}}>Logg inn</div>
                    }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {/**@ts-ignore */}
            <LogInModal show={showLogInModal} onHide={() => setShowLogInModal(false)}/>
        </div>
    )
}

export default withRouter(SBNavbar);