/* eslint-disable react/prop-types */
const WeatherDetails = ({weather, capital}) => {
  console.log(weather)
  return (
    <div>
      <h2>Current weather in {capital}</h2>
      <p>Temperature {weather.data.current.temp} F</p>
      <img src={`https://openweathermap.org/img/wn/${weather.data.current.weather[0].icon}.png`}></img>
      <p>Wind {weather.data.wind_speed}</p>
    </div>
  )
}

export default WeatherDetails