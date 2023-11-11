import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import CountriesList from './components/CountriesList'

function App() {
  const [searchValue, setSearchValue] = useState('')
  const [countries, setCountries] = useState(null)
  const [countriesToShow, setCountriesToShow] = useState(null)


  useEffect(() => {
    countriesService.fetchCountries().then(responseData => setCountries(responseData))
  }, [])

  useEffect(() => {
    if (!searchValue) {
      setCountriesToShow(null)
    } else {
      const selectedCountries = countries.filter((country => country.name.common.toLowerCase().includes(searchValue.toLowerCase())))
      setCountriesToShow(selectedCountries)
    } 
  }, [countries, searchValue])
  
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }


  return (
    <div>
      <label>Find Countries
        <input type='text' value={searchValue} onChange={handleSearchChange}></input>
      </label>
      {countriesToShow && <CountriesList countries={countriesToShow} />}
    </div>
  )
}

export default App
