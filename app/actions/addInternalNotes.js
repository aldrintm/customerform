'use server'
import connectDB from '@/config/db'
import Customer from '@/models/Customer'
import Note from '@/models/Note'
import User from '@/models/User'
import { getSessionUser } from '@/utils/getSession'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// this action is added to the form to perform tasks
async function addInternalNotes(formData) {
  // connect to DB
  await connectDB()

  // lets check for user session
  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required')
  }

  console.log(sessionUser.user.email)

  // lets get the userId then
  const user = await User.findOne({ email: sessionUser.user.email })
  const userId = user._id

  const customerId = formData.get('customerId')

  const internalNotesData = {
    staff: userId,
    customer: customerId,
    noteDate: formData.get('noteDate') || '',
    note: formData.get('note') || '',
  }

  // lets check the server to see all items uploaded to the DB
  console.log(internalNotesData)

  // lets plug all the date using the property model
  const newInternalNotes = new Note(internalNotesData)
  // save it in our DB
  await newInternalNotes.save()

  // this will clear cached data in our form/memory
  revalidatePath('/dashboard/customers/${customerId}')

  // redirect to newly created thank you page details
  // redirect(`/customers/${newCustomer._id}`)

  // redirect to the main table
  redirect(`/dashboard/customers/${customerId}`)
}

export default addInternalNotes
