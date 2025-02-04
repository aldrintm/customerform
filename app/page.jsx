'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

// Dynamically load components to reduce initial bundle size
const LoginComponent = dynamic(() => import('@/components/LoginComponent'), {
  ssr: false,
})
const Spinner = dynamic(() => import('@/components/Spinner'), { ssr: false })

const HomePage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Prefetch the dashboard page to speed up redirection
  useEffect(() => {
    router.prefetch('/dashboard')
  }, [router])

  // When session is detected, redirect to the dashboard
  useEffect(() => {
    if (session) {
      router.replace('/dashboard')
    }
  }, [session, router])

  // Show a spinner while authentication is loading
  if (status === 'loading') {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Spinner />
      </div>
    )
  }

  // If there is no session, render the login component
  if (!session) {
    return <LoginComponent />
  }

  // Once session is available, the redirection effect will run,
  // so we render nothing here.
  return null
}

export default HomePage

// 'use client'

// import { signIn, useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import LoginComponent from '@/components/LoginComponent'
// import Spinner from '@/components/Spinner'
// import { useEffect } from 'react'
// import { redirect } from 'next/navigation'
// import Button from '@/components/Button'

// const HomePage = () => {
//   const { data: session, status } = useSession()

//   // const handleLogin = () => {
//   //   signIn('google', { callbackUrl: '/' })
//   // }

//   if (status === 'loading') {
//     return (
//       // Lets add a loading spinner component here later
//       <div className='flex min-h-screen text-2xl'>
//         <Spinner />
//       </div>
//     )
//   }

//   if (!session) {
//     return <LoginComponent /> // Call LoginComponent
//   }

//   return redirect('/dashboard')
// }

// export default HomePage
