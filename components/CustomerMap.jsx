'use client'
import { useEffect, useState } from 'react'
import { setDefaults, fromAddress } from 'react-geocode'
import Map, { Marker } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import Image from 'next/image'
import pin from '@/assets/images/pin.svg'
import Spinner from './Spinner'

const CustomerMap = ({ customer }) => {
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 10,
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
        // console.log(lat, lng)
        setLat(lat)
        setLng(lng)
        setViewport({ ...viewport, latitude: lat, longtitude: lng })
      } catch (error) {
        console.log(error)
        setGeocodeError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchCoords()
  }, [])

  if (loading) return <Spinner />

  if (geocodeError) return <div className='text-xl'>No Location Data Found</div>

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 12,
        }}
        style={{ width: '100%', height: 400 }}
        mapStyle='mapbox://styles/mapbox/streets-v12'
      >
        <Marker longitude={lng} latitude={lat} anchor='bottom'>
          <Image src={pin} alt={location} width={30} height={30} />
        </Marker>
      </Map>
    )
  )
}

export default CustomerMap
