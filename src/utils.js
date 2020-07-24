import Geocode from "react-geocode";
import { googleKey } from './api';


Geocode.setApiKey(googleKey);

export const getAddress = async (lat, lng) => {
    try{
        const fetchedData = await Geocode.fromLatLng(lat, lng)
        return fetchedData.results[0].formatted_address
    }catch(error){
        console.log('Klarte ikke hente adresse', error)
    }
}