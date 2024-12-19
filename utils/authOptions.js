import GoogleProvider from 'next-auth/providers/google'

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
        },
      },
    }),
    // ...we can add more providers here
  ],
  callbacks: {
    //Invoked on successfull signins
    async signIn({ profile }) {
      // 1. connect to the database
      // 2. check if user exists
      // 3. if not, add the use in the db manually
      // 4. return true to allow in the application
    },
    // Session callback function that modifies the session object
    async session({ session }) {
      // 1. get user from database
      // 2. assign user id from the session
      // 3. return session
    },
  },
}
