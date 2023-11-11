/* eslint-disable react/prop-types */
import { useState } from "react"
import CountryDetails from "./CountryDetails"

const Country = ({country}) => {
  const [showCountryDetails, setShowCountryDetails] = useState(false)

  const handleShowToggle = () => {
    setShowCountryDetails(!showCountryDetails)
  }

  return (
    <div>
      <p>{country.name.common} <button onClick={handleShowToggle}>Show</button></p>
      {showCountryDetails && 
        <CountryDetails 
          name={country.name.common} 
          capital={country.capital[0]} 
          area={country.area}
          languages={country.languages}
          flags={country.flags}
          lat={country.latlng[0]}
          lng={country.latlng[1]}
        />
      }
    </div>
  )
}

export default Country