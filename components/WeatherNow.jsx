'use client'

import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Calendar, Sun, Cloud, CloudRain } from 'lucide-react'
import Skycons, { SkyconsType } from 'react-skycons'

const DateAndWeather = () => {
  const [weather, setWeather] = useState({
    temperature: '--',
    description: 'Loading...',
    icon: 'CLEAR_DAY', // Default Skycons icon
  })

  useEffect(() => {
    // Fetch weather data (replace with your API key and city)
    const fetchWeather = async () => {
      const WeatherAPI = process.env.NEXT_PUBLIC_API_KEY
      const city = process.env.NEXT_PUBLIC_WEATHER_DEFAULT_CITY

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${WeatherAPI}`

      if (!WeatherAPI) {
        console.error('API key is missing! Add it to your .env.local file.')
        return
      }

      try {
        const response = await fetch(url)
        const data = await response.json()
        const weatherCondition = data.weather[0].icon
        console.log(data)

        // Map OpenWeather condition to Skycons types
        const skyconMap = {
          Clear: 'CLEAR_DAY',
          '04d': 'PARTLY_CLOUDY_DAY',
          '02d': 'RAIN',
          Drizzle: 'SHOWERS_DAY',
          Thunderstorm: 'THUNDER_RAIN',
          Snow: 'SNOW',
          Mist: 'FOG',
          Haze: 'FOG',
          Smoke: 'FOG',
          Dust: 'FOG',
          Fog: 'FOG',
          Sand: 'FOG',
          Ash: 'FOG',
          Squall: 'WIND',
          Tornado: 'WIND',
        }

        const icon = skyconMap[weatherCondition] || 'CLEAR_DAY' // Default to CLEAR_DAY if not mapped

        // Map weather conditions to icons
        // const weatherIcon =
        //   weatherCondition === 'Clear'
        //     ? 'Sun'
        //     : weatherCondition === 'Clouds'
        //     ? 'Cloud'
        //     : 'CloudRain'

        setWeather({
          temperature: Math.round(data.main.temp),
          description: data.weather[0].description,
          icon,
        })
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    }

    fetchWeather()
  }, [])

  // Map icon string to Lucide icons
  // const WeatherIcon =
  //   weather.icon === 'Sun' ? Sun : weather.icon === 'Cloud' ? Cloud : CloudRain

  return (
    <div className='flex gap-6 items-center'>
      <div className='flex items-center gap-2 p-4 bg-white'>
        <Skycons
          type={weather.icon} // Pass the Skycons type
          color='gold'
          size={48} // Adjust size as needed
          animate={true}
        />

        {/* <WeatherIcon className='w-6 h-6 text-yellow-500' /> */}
        <span className='text-lg font-semibold text-gray-700'>
          {weather.temperature} °F
        </span>
        <div className='text-lg text-gray-700 capitalize'>
          {weather.description}
        </div>
      </div>
    </div>
  )
}

export default DateAndWeather
