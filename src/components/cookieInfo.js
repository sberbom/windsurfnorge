import React, { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie'
import {Button} from 'react-bootstrap'
import '../styles/cookieInfo.css';

function CookieInfo() {

    const [cookies, setCookie] = useCookies(['consentCookie']);
    const [showCookieInfo, setShowCookieInfo] = useState(false)
    
    console.log(cookies.consentCookie)

    useEffect(() => {
        console.log(cookies.consentCookie)
        if(cookies.consentCookie !== "true") {
            setShowCookieInfo(true)
            setCookie('consentCookie', true)
        }
    }, [cookies.consentCookie, setCookie])


    if(showCookieInfo){
        return(
            <div className="cookieInfo-container">
                <p>Vi bruker cookies. Ved å bruke denne siden godtar du bruken av coookies. Les mer i <a href="/termsAndConditions" target="_blank">terms and conditions</a></p>
                <Button onClick={() => setShowCookieInfo(false)}>OK</Button>
            </div>
        )
    }

    return(<></>)
}

export default CookieInfo;