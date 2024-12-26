'use client'

// Next-Auth suggest we do this in Layout Page but I want to keep that at server side and SessionProvider is on client side so we are making this as a component to achieve that.
import { SessionProvider } from 'next-auth/react'

const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider
