'use client'

const OpenMapButton = () => {
  // Function to handle the button click
  const openMapApp = () => {
    const latitude = 37.7749 // Example latitude (San Francisco)
    const longitude = -122.4194 // Example longitude (San Francisco)

    // Construct the Apple Maps URL
    const url = `https://www.google.com/maps/@37.2426738,-121.8019328,14zmaps:0,0?q=${latitude},${longitude}`

    // Open the Maps app using the URL
    window.location.href = url
  }

  return <button onClick={openMapApp}>Open Map</button>
}

export default OpenMapButton

{
  /* to handle multiple platforms */
}
// 'use client';

// import React from 'react';

// const OpenMapButton = () => {
//   const openMapApp = () => {
//     const latitude = 37.7749;
//     const longitude = -122.4194;

//     const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
//     const isAndroid = /Android/.test(navigator.userAgent);

//     let url = '';

//     if (isIOS) {
//       // Apple Maps URL for iOS
//       url = `maps:0,0?q=${latitude},${longitude}`;
//     } else if (isAndroid) {
//       // Google Maps URL for Android
//       url = `geo:0,0?q=${latitude},${longitude}`;
//     }

//     window.location.href = url;
//   };

//   return (
//     <button onClick={openMapApp}>
//       Open Map
//     </button>
//   );
// };

// export default OpenMapButton;
