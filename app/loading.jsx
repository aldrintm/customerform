'use client'

import { ClipLoader } from 'react-spinners'

const LoadingPage = () => {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <ClipLoader color='#99f6e4' size={150} aria-label='loading spinner' />
    </div>
  )
}

export default LoadingPage

// const override = {
//   display: 'block',
//   margin: '100px auto',
// }

// const LoadingPage = () => {
//   return (

//     <ClipLoader
//       color='#99f6e4'
//       cssOverride={override}
//       size={150}
//       aria-label='loading spinner'
//     />
//   )
// }

// export default LoadingPage
