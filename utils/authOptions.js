import GoogleProvider from 'next-auth/providers/google'
import connectDB from '@/config/db'
import User from '@/models/User'
import { redirect } from 'next/navigation'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          // redirect_uri: process.env.NEXTAUTH_URL + '/api/auth/callback/google',
        },
      },
    }),
    // ...we can add more providers here in the future
  ],
  callbacks: {
    //Invoked on successful signins
    async signIn({ profile }) {
      // 1. connect to the database
      await connectDB()
      // 2. check if user exists
      let user = await User.findOne({ email: profile.email })
      // 3. if not, add the user in the db manually through the dashboard by the admin user only
      if (!user) {
        // Option A: Block Sign in
        // return false
        // or
        // redirect('/')

        // Option B: Create a new user (not sure if we should)
        // if we need to create below - Truncate username if  too long
        // const username = profile.name.slice(0, 20)
        await User.create({
          email: profile.email,
          username: profile.name.slice(0, 20),
          image: profile.picture,
        })
      }
      // 4. Sign in is allowed - return true to proceed with the authentication flow
      return true
    },

    // Use the JWT callback to attach user information on first sign in.
    async jwt({ token, user }) {
      if (user) {
        // Use user._id if available, otherwise try user.id.
        token.id = user._id ? user._id.toString() : user.id
      }
      return token
    },

    // Session callback function that modifies the session object
    // async session({ session }) {
    //   // 1. get user from database
    //   const user = await User.findOne({ email: session.user.email })
    //   // 2. assign user id from the session
    //   session.user.id = user._id.toString()
    //   // 3. return session
    //   return session
    // },

    // The session callback now retrieves the user id from the token rather than querying the DB.
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
      }
      return session
    },
  },
}
