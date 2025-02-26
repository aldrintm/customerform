'use server'

import connectDB from '@/config/db'
import User from '@/models/User'
import { getSessionUser } from '@/utils/getSession'
import { revalidatePath } from 'next/cache'

async function bookmarkCustomer(customerId) {
  await connectDB()

  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User Id is Required')
  }

  const { userId } = sessionUser

  const user = await User.findOne({ email: sessionUser.user.email })

  let isBookmarked = user.bookmarks.includes(customerId)

  console.log(isBookmarked)
  let message

  if (isBookmarked) {
    // if already bookmarked, then remove from array
    user.bookmarks.pull(customerId)
    message = 'saved customer removed'
    isBookmarked = false
  } else {
    // if not bookmarked, then add to array
    user.bookmarks.push(customerId)
    message = 'customer is now added to list'
    isBookmarked = true
  }

  await user.save()
  revalidatePath(`/dashboard/customers/${customerId}`, 'page')

  return { message, isBookmarked }
}

export default bookmarkCustomer
