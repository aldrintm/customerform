'use server'
import connectDB from '@/config/db'
import Customer from '@/models/OldCustomer'
import Message from '@/models/Message'
import { getSessionUser } from '@/utils/getSession'

// this action is added to the form to perform tasks
async function addMessage(formData) {
  // connect to DB
  await connectDB()

  // lets check for user session
  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required')
  }

  // lets get the userId then
  const { userId } = sessionUser

  const recipient = formData.get('recipient')

  if (userId === recipient) {
    return { error: 'You cannot send a message to yourself' }
  }

  const newMessage = new Message({
    sender: userId,
    recipient: recipient,
    message: formData.get('message'),
  })

  await newMessage.save()

  return { submitted: true }
}

export default addMessage
