// components/Weather.js

import React, { useState, useEffect } from 'react'
import SkyconIcon from './SkyconIcon'

const Weather = () => {
  const [weatherCondition, setWeatherCondition] = useState('CLEAR_DAY') // Default example

  useEffect(() => {
    // Here you can fetch real weather data (e.g., from OpenWeather or any weather API)
    // For demonstration, we'll simulate the weather condition change

    setTimeout(() => {
      setWeatherCondition('RAIN') // Change to a different condition after 3 seconds
    }, 3000)
  }, [])

  return (
    <div>
      <h1>Current Weather</h1>
      <SkyconIcon iconType={mapWeatherToSkycon(weatherCondition)} />
    </div>
  )
}

// Mapping weather conditions to Skycons icon types
const mapWeatherToSkycon = (weatherCondition) => {
  switch (weatherCondition) {
    case 'CLEAR_DAY':
      return 'CLEAR_DAY'
    case 'PARTLY_CLOUDY_DAY':
      return 'PARTLY_CLOUDY_DAY'
    case 'CLOUDY':
      return 'CLOUDY'
    case 'RAIN':
      return 'RAIN'
    case 'SNOW':
      return 'SNOW'
    case 'WIND':
      return 'WIND'
    default:
      return 'CLEAR_DAY' // Default to clear day
  }
}

export default Weather
