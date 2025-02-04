'use server'
import connectDB from '@/config/db'
import Customer from '@/models/Customer'
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
  const { userId } = sessionUser

  const internalNotesData = {
    firstName: formData.get('firstName')?.toLowerCase() || '',
    lastName: formData.get('lastName')?.toLowerCase() || '',
    phone: formData.get('phone') || '',
    email: formData.get('email') || '',
  }

  // lets check the server to see all items uploaded to the DB
  console.log(internalNotesData)

  // lets plug all the date using the property model
  const newInternalNotes = new InternalNotes(internalNotesData)
  // save it in our DB
  await newInteralNotes.save()

  // this will clear cached data in our form/memory
  revalidatePath('/dashboard/customers/${customerId}')

  // redirect to newly created thank you page details
  // redirect(`/customers/${newCustomer._id}`)

  // redirect to the main table
  redirect(`/dashboard/customers/${Customer.id}`)
}

export default addInternalNotes
