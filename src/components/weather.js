import React, {useEffect, useState} from 'react';
import WeatherCard from './weatherCard'
import '../styles/weather.css'
import AliceCarousel from 'react-alice-carousel';



const Weather = ({latLng}) => {

    const [weather, setWeather] = useState(null)
    const [filteredWeather, setFilteredWeather] = useState(null)
    const lat = Number((latLng.lat).toFixed(4));
    const lng = Number((latLng.lng).toFixed(4));

    useEffect(() => {
        if(weather === null){
            fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lng}`)
            .then(response => response.json())
            .then(data => {
                setWeather(data)
                setFilteredWeather(getFilteredWeater(data))
            })
        }
    }, [weather, lat, lng])


    const getFilteredWeater = (weather) => {
        const date = new Date(weather.properties.timeseries[0].time.slice(0,-1))
        date.setHours(13)
        date.setDate(date.getDate()+1)
        const days = [weather.properties.timeseries[0]];
        weather.properties.timeseries.forEach(element => {
            const elementDate = new Date(element.time)
            if(elementDate.toISOString() === date.toISOString()){
                date.setDate(date.getDate()+1)
                days.push(element)
            }
        });
        return days
    }

    const responsive = {
        0: { items: 2 },
        770: { items: 4 },
        1150: { items: 6 },
        1530: {items: 8}
    };

    const cards = filteredWeather ? filteredWeather.map((weather, index) => <div className="center-weather"><WeatherCard weatherData={weather} key={index}/></div>) : []

    return (
        <div className="weather-container">
            <AliceCarousel mouseTracking items={cards} responsive={responsive} disableButtonsControls={true}/>
            <a className="btn btn-primary yr-btn" href={`https://www.yr.no/`} target="_blank"  rel="noopener noreferrer">Se værmelding på yr.no</a>
        </div>
    )
}

export default Weather;