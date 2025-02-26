'use client'
import { useEffect, useState } from 'react'
import { setDefaults, fromAddress } from 'react-geocode'
import Map, { Marker, Source, Layer } from 'react-map-gl/mapbox'
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

  // State for user's current location and the fetched route
  const [userLocation, setUserLocation] = useState(null)
  const [routeGeoJSON, setRouteGeoJSON] = useState(null)
  const [directions, setDirections] = useState([])
  const [showDirections, setShowDirections] = useState(false)

  // Defaults for react-geocode
  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: 'en',
    region: 'us',
  })

  // Fetch customer's coordinates based on their address
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
  }, [customer])

  // Get the user's current location using the browser's Geolocation API
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords
  //         setUserLocation({ latitude, longitude })
  //       },
  //       (error) => {
  //         console.error('Error getting user location:', error)
  //       }
  //     )
  //   }
  // }, [])

  // Once we have both userLocation and the destination, fetch directions from Mapbox Directions API
  // useEffect(() => {
  //   const fetchRoute = async () => {
  //     if (!userLocation || !lat || !lng) return

  //     // Request driving directions with steps enabled
  //     const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.longitude},${userLocation.latitude};${lng},${lat}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&geometries=geojson&steps=true&overview=full`
  //     try {
  //       const response = await fetch(url)
  //       const data = await response.json()
  //       if (data.routes && data.routes.length > 0) {
  //         setRouteGeoJSON(data.routes[0].geometry)
  //         // Extract step-by-step instructions from the first leg of the route
  //         const steps = data.routes[0].legs[0].steps || []
  //         setDirections(steps)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching route:', error)
  //     }
  //   }
  //   fetchRoute()
  // }, [userLocation, lat, lng])

  // Toggle directions on button click.
  const toggleDirections = () => {
    if (!showDirections) {
      if (!routeGeoJSON) {
        fetchRoute()
      }
      setShowDirections(true)
    } else {
      setShowDirections(false)
    }
  }

  if (loading) return <Spinner />

  if (geocodeError) return <div className='text-xl'>No Location Data Found</div>

  return (
    !loading && (
      <div>
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
          {/* Render the route only if the user clicked the button */}
          {showDirections && routeGeoJSON && (
            <Source
              id='route'
              type='geojson'
              data={{
                type: 'Feature',
                properties: {},
                geometry: routeGeoJSON,
              }}
            >
              <Layer
                id='routeLayer'
                type='line'
                layout={{
                  'line-join': 'round',
                  'line-cap': 'round',
                }}
                paint={{
                  'line-color': '#3887be',
                  'line-width': 5,
                  'line-opacity': 0.75,
                }}
              />
            </Source>
          )}
          <Marker longitude={lng} latitude={lat} anchor='bottom'>
            <Image src={pin} alt={location} width={30} height={30} />
          </Marker>
        </Map>

        {/* Button in top right to toggle directions */}
        {/* <button
          onClick={toggleDirections}
          className='absolute top-4 right-4 z-50 border border-blue-400 rounded-md text-xs text-blue-500 p-2 hover:text-blue-400 hover:border-blue-500 hover:bg-white'
        >
          {showDirections ? 'Hide Directions' : 'Show Directions'}
        </button> */}

        {/* Render driving directions below the map when toggled on */}
        {showDirections && directions.length > 0 && (
          <div className='mt-4 p-4 bg-white rounded shadow'>
            <h3 className='text-lg font-bold mb-2'>Driving Directions</h3>
            <ol className='list-decimal list-inside'>
              {directions.map((step, idx) => (
                <li key={idx} className='mb-1'>
                  {step.maneuver.instruction}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    )
  )
}

export default CustomerMap
