;('use server')

import connectDB from '@/config/db'
import Fleet from '@/models/Fleet'
import User from '@/models/User'
import { getSessionUser } from '@/utils/getSession'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

//this action is deletes the customer from the database
async function deleteVehicle(vehicleId) {
  // lets check for user session
  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required')
  }

  // lets get the userId then
  const { userId } = sessionUser

  // connect to DB
  await connectDB()

  const vehicle = await Fleet.findById(vehicleId)
  const user = await User.findOne(email)

  console.log(user)

  if (!vehicle) throw new Error('Vehicle Not Found')

  // verify ownership
  //   if (!user.isAdmin) {
  //     throw new Error('Unauthorized')
  //   }

  await vehicle.deleteOne()

  // this will clear cached data in our form/memory
  revalidatePath('/dashboard/company', 'page')
  revalidatePath('/dashboard/company/fleet', 'page')

  // redirect to newly created thank you page details
  // redirect(`/customers/${newCustomer._id}`)

  // redirect to the main table
  redirect(`/dashboard/company`)
}

export default deleteVehicle
