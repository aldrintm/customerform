'use server'
import connectDB from '@/config/db'
import Customer from '@/models/Customer'
import { getSessionUser } from '@/utils/getSession'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// this action is added to the form to perform tasks
async function addCustomer(formData) {
  // connect to DB
  await connectDB()

  // lets check for user session
  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required')
  }

  // lets get the userId then
  const { userId } = sessionUser

  const customerData = {
    firstName: formData.get('firstName')?.toLowerCase() || '',
    lastName: formData.get('lastName')?.toLowerCase() || '',
    phone: formData.get('phone') || '',
    email: formData.get('email') || '',
    address: {
      street: formData.get('street') || '',
      city: formData.get('city') || '',
      state: formData.get('state') || '',
      zipcode: formData.get('zipcode') || '',
    },
    contractorName: formData.get('contractorName') || '',
    contractorPhone: formData.get('contractorPhone') || '',
    notes: formData.get('notes') || '',
  }

  // lets check the server to see all items uploaded to the DB
  console.log(customerData)

  // lets plug all the date using the property model
  const newCustomer = new Customer(customerData)
  // save it in our DB
  await newCustomer.save()

  // this will clear cached data in the memory
  revalidatePath('/dashboard')

  // redirect to newly created thank you page details
  // redirect(`/customers/${newCustomer._id}`)

  // redirect to the main table
  redirect(`/dashboard/customers/${newCustomer.id}`)
}

export default addCustomer
