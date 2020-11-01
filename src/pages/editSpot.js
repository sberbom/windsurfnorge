import React, {useState, useEffect} from 'react';
import '../styles/editSpot.css'

function EditSpot() {
    
    const [spot, setSpot] = useState(null)

    useEffect(() => {
        const fetchSpot = async () => {
            const spotName = queryString.parse(window.location.search).spotName
            const spot = await dbService.getSpot(spotName);
            console.log(spot)
            setSpot(spot);
        }
        fetchSpot();
    }, [])

    return(
        <div className="">
          
        </div>
    )
}

export default EditSpot;