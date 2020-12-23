import React from 'react';
import Header from '../components/header'
import '../styles/notFound.css'

const NotFound = () => {

    document.title = `Windsurf Norge`

    return (
        <div>
            <Header
                title={"Siden finnes ikke"}
                button="Hjem"
                link="/home"
            />
            <div className="notFound-filler">

            </div>
        </div>
    )
}

export default NotFound;