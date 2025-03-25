export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
}

// import { withAuth } from 'next-auth/middleware'
// import { NextResponse } from 'next/server'

// export default withAuth(
//   function middleware(req) {
//     // Get user token with role
//     const token = req.nextauth.token
//     const isAdmin = token?.role === 'admin'
//     const isUser = token?.role === 'user'
//     const isTechnician = token?.role === 'technician'
//     const path = req.nextUrl.pathname

//     // If user is not authenticated, let NextAuth handle the redirect
//     if (!token) {
//       return null
//     }

//     // Handle role-based redirects
//     if (path.startsWith('/technician')) {
//       // Only technicians can access technician routes
//       if (!isTechnician) {
//         return NextResponse.redirect(new URL('/', req.url))
//       }
//     }

//     // Role-based routing
//     if (path.startsWith('/dashboard')) {
//       // Only admins can access dashboard
//       if (!isAdmin) {
//         return NextResponse.redirect(new URL('/dashboard', req.url))
//       }
//     }

//     // Allow access to role-specific paths
//     return NextResponse.next()
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token, // Requires authentication
//     },
//     pages: {
//       signIn: '/', // Your home page with sign-in
//     },
//   }
// )

// export const config = {
//   matcher: [
//     '/dashboard/:path*',
//     '/profile/:path*',
//     '/technician/:path*',
//     '/((?!auth/.*|api/auth/.*).*)',
//   ],
// }
