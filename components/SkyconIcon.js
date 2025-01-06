// components/SkyconIcon.js

import React, { useEffect, useRef } from 'react'

const SkyconIcon = ({ iconType }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Dynamically load Skycons if not available (from CDN or local file)
    if (typeof Skycons === 'undefined') {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/skycons@0.1.0/skycons.js' // Use local if cloned
      script.async = true
      document.body.appendChild(script)
      script.onload = initializeSkycons
    } else {
      initializeSkycons()
    }

    function initializeSkycons() {
      const skycons = new Skycons({ color: 'black' })
      const canvas = canvasRef.current
      skycons.add(canvas, iconType)
      skycons.play()

      // Cleanup on unmount
      return () => skycons.remove(canvas)
    }
  }, [iconType])

  return <canvas ref={canvasRef} width='64' height='64'></canvas>
}

export default SkyconIcon
