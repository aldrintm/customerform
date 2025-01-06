'use client'

import { signIn, useSession } from 'next-auth/react'
import LoginComponent from '@/components/LoginComponent'
import Spinner from '@/components/Spinner'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'

const HomePage = () => {
  // const handleLogin = () => {
  //   signIn('google', { callbackUrl: '/dashboard' })
  // }

  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      // Lets add a loading spinner component here later
      <div className='flex min-h-screen text-2xl'>
        <Spinner />
      </div>
    )
  }

  if (!session) {
    return <LoginComponent /> // Call LoginComponent
  }

  return redirect('/dashboard')
}

export default HomePage
