import axios from 'axios'

const fetchCountries = () => {
  const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
  return request.then(response => response.data)
}

const fetchCountryData = (queryString) => {
  const request = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${queryString}`)
  return request.then(response => response.data)
}

export default {fetchCountries, fetchCountryData}