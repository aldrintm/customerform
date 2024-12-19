'use client'

import { ClipLoader } from 'react-spinners'

const override = {
  display: 'block',
  margin: '100px auto',
}

const LoadingPage = () => {
  return (
    <ClipLoader
      color='#99f6e4'
      cssOverride={override}
      size={150}
      aria-label='loading spinner'
    />
  )
}

export default LoadingPage
