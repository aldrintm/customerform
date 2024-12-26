// middleware.js
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './utils/authOptions'

// Middleware to check for authentication before accessing /dashboard
export async function middleware(req) {
  // Get the session for the incoming request
  const session = await getSession()

  const pathname = req.nextUrl?.pathname

  //If the user is authenticated, allow the request to continue
  if (session) {
    return NextResponse.next()
  }

  // Check if the requested path is /dashboard or any nested path under /dashboard
  if (pathname.startsWith('/dashboard') && !session) {
    // Redirect to login page if not authenticated
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Allow request to continue if authenticated
  return NextResponse.next()
}

// Apply middleware to /dashboard and nested routes
export const config = {
  matcher: ['/dashboard:path*'], // Protects /dashboard and any sub-paths
}
