'use client'
import { useEffect, useState } from 'react'
import { setDefaults, fromAddress } from 'react-geocode'

const CustomerMap = ({ customer }) => {
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [viewport, setViewport] = useState({
    latitude: 0,
    longtitude: 0,
    zoom: 12,
    width: '100%',
    height: '500px',
  })
  const [loading, setLoading] = useState(true)
  const [geocodeError, setGeocodeError] = useState(false)

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: 'en',
    region: 'us',
  })

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${customer.address.street} ${customer.address.city} ${customer.address.state} ${customer.address.zipcode}`
        )

        console.log('no error here')

        // check Geocode results
        if (res.results.length === 0) {
          setGeocodeError(true)
          return
        }

        const { lat, lng } = res.results[0].geometry.location
        console.log(lat, lng)
      } catch (error) {
        console.log(error)
        setGeocodeError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchCoords()
  }, [])

  return <div>Map</div>
}

export default CustomerMap
