'use server'

import connectDB from '@/config/db'
import Message from '@/models/Message'
import { getSessionUser } from '@/utils/getSession'
import { revalidatePath } from 'next/cache'

async function markMessageAsRead(messageId) {
  await connectDB()
  const sessionUser = await getSessionUser()
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User Id is Required')
  }

  const { userId } = sessionUser

  const message = await Message.findById(messageId)

  if (!message) throw new Error('Message Not Found')

  //Verify ownership
  if (message.recipient.toString() !== userId) {
    throw new Error('You are NOT Authorized')
  }

  message.read = !message.read

  revalidatePath('/dashboard/message', 'page')

  await message.save()

  return message.read
}

export default markMessageAsRead
