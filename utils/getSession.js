import { getServerSession } from 'next-auth'
import { authOptions } from './authOptions'

export const getSessionUser = async () => {
  // Deployment gave us error because of Try/Catch so lets set this aside for now
  // try {
  //     const session = await getServerSession(authOptions)

  //     if(!session || !session.user) {
  //         return null
  //     }

  //     return {
  //         user: session.user
  //         userId: session.user.id
  //     }

  // } catch (error) {
  //     console.error(error)
  //     return null
  // }

  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return null
  }

  return {
    user: session.user,
    userId: session.user.id,
  }
}
