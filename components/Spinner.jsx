'use client'
import { ClipLoader } from 'react-spinners'

const Spinner = () => {
  const override = {
    display: 'block',
    margin: '100px auto',
  }
  return (
    <ClipLoader
      color='#73a5e3'
      size={150}
      cssOverride={override}
      loading={true}
      speedMultiplier={1}
    />
  )
}

export default Spinner
