import React from 'react';
import '../styles/footer.css'

function Footer(props) {
    return(
        <div className="footer-container">
            <div className="footer-left">
                <p>
                    Windsurf Norge er et nettsted laget for å lære webutvikling. Nettsted vedlikeholdes etter ønske. 
                    Dersom du har tilbakemeldinger eller ønsker å bidra kan du ta kontakt på sberbom@gmail.com
                    Håper du får nytte av nettstedet!
                </p>
            </div>
            <div className="footer-center">
                Copyright - Windsurf Norge
            </div>
            <div className="footer-right">
                <p>
                    Kontakt: <br/>
                    Sigmund Berbom <br/>
                    <a href="https://sberbom.com" target="_blank" rel="noopener noreferrer">sberbom.com</a>
                </p>

            </div>
        </div>
    )
}

export default Footer;