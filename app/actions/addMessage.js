'use server'
import connectDB from '@/config/db'
import Message from '@/models/Message'
import { getSessionUser } from '@/utils/getSession'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// this function is used to add a message to the database
// it takes the form data as an argument
// and returns the result of the operation
// it also checks if the user is logged in
// and if the recipient is not the same as the sender
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

  const sender = sessionUser.user.email
  if (!sender) {
    throw new Error('Sender not found')
  }

  const recipient = formData.get('recipient')

  if (sender === recipient) {
    return { error: 'You cannot send a message to yourself' }
  }

  // gather formData
  const newMessage = new Message({
    sender,
    recipient,
    customer: formData.get('customer'),
    message: formData.get('message'),
  })

  // save a new message in our DB
  await newMessage.save()

  revalidatePath('/profile')

  return { submitted: true }
}

export default addMessage
