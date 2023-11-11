import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY
console.log(api_key)

const getWeather = (lat, lng) => {
  const request = axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=${api_key}`)
  return request.then(response => response)
}

export default getWeather