'use server'

import connectDB from '@/config/db'
import User from '@/models/User'
import { getSessionUser } from '@/utils/getSession'
import { revalidatePath } from 'next/cache'

async function checkBookmarkStatus(customerId) {
  await connectDB()

  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User Id is very Required')
  }

  const { userId } = sessionUser

  const user = await User.findOne({ email: sessionUser.user.email })

  let isBookmarked = user.bookmarks.includes(customerId)

  console.log(isBookmarked)

  return { isBookmarked }
}

export default checkBookmarkStatus
