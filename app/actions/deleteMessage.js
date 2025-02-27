'use server'

import connectDB from '@/config/db'
import Message from '@/models/Message'
import { getSessionUser } from '@/utils/getSession'
import { revalidatePath } from 'next/cache'

// this action is added to the form to perform tasks
async function deleteMessage(messageId) {
  // lets check for user session
  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required')
  }

  // lets get the userId then
  const { userId } = sessionUser

  const message = await Message.findById(messageId)

  if (message.recipient.toString() !== userId) {
    throw new Error('Unauthorized')
  }

  await message.deleteOne()

  // this will clear cached data in our form/memory
  revalidatePath(`/dashboard/message`, 'page')

  // redirect to newly created thank you page details
  // redirect(`/customers/${newCustomer._id}`)

  // redirect to the main table
  // redirect(`/dashboard/message`)
}

export default deleteMessage
