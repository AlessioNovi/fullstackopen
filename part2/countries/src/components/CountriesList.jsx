/* eslint-disable react/prop-types */
import Country from "./Country"
import CountryDetails from "./CountryDetails"
const CountriesList = ({countries}) => {
  if (countries.length > 10) {
    return <p>Too many Matches, specify another filter</p>
  }

  if (countries.length > 1 && countries.length <= 10) {
    return (
      <div>
        {countries.map(country => <Country key={country.name.common} country={country}/>)}
      </div>
    )
  }

  if (countries.length === 1) {
    const country = countries[0]
    return <CountryDetails 
      name={country.name.common} 
      capital={country.capital[0]} 
      area={country.area}
      languages={country.languages}
      flags={country.flags}
      lat={country.latlng[0]}
      lng={country.latlng[1]}
    />
  }
}


export default CountriesList