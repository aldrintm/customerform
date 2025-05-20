'use server'

import connectDB from '@/config/db'
import Fleet from '@/models/Fleet'
import User from '@/models/User'
import { getSessionUser } from '@/utils/getSession'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import mongoose from 'mongoose'

async function deleteVehicle(vehicleId) {
  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required')
  }

  const { userId, email } = sessionUser

  if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
    throw new Error('Invalid vehicle ID')
  }

  await connectDB()

  const vehicle = await Fleet.findById(vehicleId)
  const user = await User.findOne({ email })

  if (!vehicle) throw new Error('Vehicle Not Found')

  // if (!user.isAdmin) {
  //   throw new Error('Unauthorized')
  // }

  await vehicle.deleteOne()

  revalidatePath('/dashboard/company', 'page')
  revalidatePath('/dashboard/company/fleet', 'page')

  redirect(`/dashboard/company`)
}

export default deleteVehicle
