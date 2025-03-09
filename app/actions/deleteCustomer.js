'use server'

import connectDB from '@/config/db'
import Customer from '@/models/OldCustomer'
import User from '@/models/User'
import { getSessionUser } from '@/utils/getSession'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// this action is deletes the customer from the database
async function deleteCustomer(customerId, email) {
  // lets check for user session
  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required')
  }

  // lets get the userId then
  const { userId } = sessionUser

  // connect to DB
  await connectDB()

  const customer = await Customer.findById(customerId)
  const user = await User.findOne(email)

  console.log(user)

  if (!customer) throw new Error('Customer Not Found')

  // verify ownership
  if (!user.isAdmin) {
    throw new Error('Unauthorized')
  }

  await customer.deleteOne()

  // this will clear cached data in our form/memory
  revalidatePath('/dashboard/customers', 'page')

  // redirect to newly created thank you page details
  // redirect(`/customers/${newCustomer._id}`)

  // redirect to the main table
  redirect(`/dashboard/customers`)
}

export default deleteCustomer
