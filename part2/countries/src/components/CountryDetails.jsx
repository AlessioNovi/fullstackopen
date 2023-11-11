/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import getWeather from "../services/weather"
import WeatherDetails from "./WeatherDetails"

const CountryDetails = ({ name, capital, area, languages ,flags, lat, lng}) => {
  const [weatherDetails, setWeatherDetails] = useState(null)


  useEffect(() => {
    getWeather(lat, lng)
      .then(response => setWeatherDetails(response))
  }, [])


  return (
    <div>
      <h2>{name}</h2>
      <p>Capital {capital}</p>
      <p>Area {area}</p>

      <p style={{fontWeight: 'bold'}}>languages</p>
      <ul>
        {Object.keys(languages).map(key => <li key={key}>{languages[key]}</li>)}
      </ul>
      <img src={flags.png} alt={flags.alt}></img>
      {weatherDetails && <WeatherDetails weather={weatherDetails} capital={capital} />}
    </div>
  )
}

export default CountryDetails