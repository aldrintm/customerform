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

  const sanitizeInput = (value) => {
    if (typeof value === 'string') {
      const trimmed = value.trim()
      return trimmed.length > 0 ? trimmed : undefined
    }
    return undefined
  }

  const customerData = {
    firstName: sanitizeInput(formData.get('firstName')?.toLowerCase()),
    lastName: sanitizeInput(formData.get('lastName')?.toLowerCase()),
    phone: sanitizeInput(formData.get('phone')),
    email: sanitizeInput(formData.get('email')),
    address: {
      street: sanitizeInput(formData.get('street')),
      city: sanitizeInput(formData.get('city')),
      state: sanitizeInput(formData.get('state')),
      zipcode: sanitizeInput(formData.get('zipcode')),
    },
    contractorName: sanitizeInput(formData.get('contractorName')),
    contractorPhone: sanitizeInput(formData.get('contractorPhone')),
    notes: sanitizeInput(formData.get('notes')),
  }

  // lets check the server to see all items uploaded to the DB
  console.log('contractorPhone raw:', formData.get('contractorPhone'))
  console.log('Final customer data:', customerData)

  // lets plug all the date using the property model
  const newCustomer = new Customer(customerData)
  // save it in our DB
  await newCustomer.save()

  // this will clear cached data in the memory
  revalidatePath('/dashboard')
  revalidatePath('/dashboard/customers')

  // redirect to newly created thank you page details
  // redirect(`/customers/${newCustomer._id}`)

  // redirect to the main table
  redirect(`/dashboard/customers/${newCustomer.id}`)
}

export default addCustomer
