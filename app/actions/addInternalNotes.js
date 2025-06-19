// action for creating notes

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

  // lets get the userId then
  const user = await User.findOne({ email: sessionUser.user.email })
  const userId = user._id

  // gather formData
  const customerId = formData.get('customerId')
  const noteDate = formData.get('noteDate') || ''
  const noteText = formData.get('note') || ''

  const internalNotesData = {
    staff: userId,
    customer: customerId,
    noteDate: noteDate,
    note: noteText,
  }

  // lets plug all the date using the Note model
  const newInternalNote = new Note(internalNotesData)
  // save a new note in our DB
  await newInternalNote.save()

  // push the note._id into the customers officeNotes array
  await Customer.findByIdAndUpdate(
    customerId,
    { $push: { officeNotes: newInternalNote._id } },
    { new: false } // optional: returns the updated doc if you need it
  )

  revalidatePath(`/dashboard/customers/${customerId}`)
  // redirect to newly created thank you page details
  // redirect(`/customers/${newCustomer._id}`)

  // // redirect to the main table
  // redirect(`/dashboard/customers/${customerId}`)

  redirect(`/dashboard/customers/${customerId}`)
  return { success: true } // Optional: return a response
}

export default addInternalNotes
