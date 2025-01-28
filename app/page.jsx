'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import LoginComponent from '@/components/LoginComponent'
import Spinner from '@/components/Spinner'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import Button from '@/components/Button'

const HomePage = () => {
  const { data: session, status } = useSession()

  const handleLogin = () => {
    signIn('google', { callbackUrl: '/' })
  }

  if (status === 'loading') {
    return (
      // Lets add a loading spinner component here later
      <div className='flex min-h-screen text-2xl'>
        <Spinner />
      </div>
    )
  }

  if (!session) {
    // return <LoginComponent /> // Call LoginComponent
    return <Button onClick={() => handleLogin()}> Google </Button>
  }

  return redirect('/dashboard')
}

export default HomePage
