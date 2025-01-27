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
          redirect_uri: process.env.NEXTAUTH_URL + '/api/auth/callback/google',
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
      const userExists = await User.findOne({ email: profile.email })
      // 3. if not, add the user in the db manually through the dashboard by the admin user only
      if (!userExists) {
        redirect('/login')
        // if we need to create below - Truncate username if  too long
        // const username = profile.name.slice(0, 20)
        // await User.create({
        //   email: profile.email,
        //   username: profile.name.slice(0, 20),
        //   image: profile.picture,
        // })
      }
      // 4. return true to allow in the application
      return true
    },
    // Session callback function that modifies the session object
    async session({ session }) {
      // 1. get user from database
      const user = await User.findOne({ email: session.user.email })
      // 2. assign user id from the session
      session.user.id = user._id.toString()
      // 3. return session
      return session
    },
  },
}
