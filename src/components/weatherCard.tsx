import React from 'react';
import '../styles/weatherCard.css'
// import '../styles/weather-icons.css'
import '../styles/weather-icons-wind.css'
import {getWeekDay} from '../utils'

interface IProps {
    weatherData: any;
}

function WeatherCard({weatherData}: IProps) {
    const temprature = weatherData.data.instant.details.air_temperature
    const windSpeed = weatherData.data.instant.details.wind_speed
    const windDirection = Math.round(weatherData.data.instant.details.wind_from_direction)+180
    const windDirectionIcon = `wi wi-wind wi-fw wind-icon`
    const weatherCode = weatherData.data.next_6_hours.summary.symbol_code
    const weatherIcon = `${process.env.PUBLIC_URL}/yrWeatherIcons/${weatherCode}.svg`
    const date = new Date(weatherData.time)
    const day  = getWeekDay(date)

    return(
        <div className="weather-card-container">
            <h4>{day}</h4>
            <p className="bold">{`${date.getDate()}.${date.getMonth()}`}</p>
            <img src={weatherIcon} alt="weathericon"></img>
            <p className="bold">{temprature} C</p>
            <i className={windDirectionIcon} style={{transform: `scale(2.5) rotate(${windDirection+180}deg)`}}></i>
            <p className="bold">{windSpeed} m/s</p>
        </div>
    )
}

export default WeatherCard;