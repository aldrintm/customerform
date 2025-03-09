'use server'
import connectDB from '@/config/db'
import Project from '@/models/Project'
import Schedule from '@/models/Schedule'
import User from '@/models/User'
import { getSessionUser } from '@/utils/getSession'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Server action to delete a schedule and update the project
async function deleteSchedule(scheduleId, customerId) {
  // connect to DB
  await connectDB()

  // Check for authenticated user session
  const sessionUser = await getSessionUser()
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required')
  }
  // Verify user exists using email
  const userEmail = sessionUser?.user?.email
  const user = await User.findOne({ email: userEmail })
  if (!user) {
    throw new Error('User Not Found')
  }
  const userId = user._id

  //   // Retrieve ScheduleId from ScheduleEditForm using formData
  //   const scheduleId = formData.get('scheduleId')
  //   if (!scheduleId) {
  //     throw new Error('Schedule ID is mising')
  //   }

  // Find the schedule
  const schedule = await Schedule.findById(scheduleId)
  if (!schedule) {
    throw new Error('Schedule not found')
  }

  // Extract projectId and customerId from the schedule
  const projectId = schedule.project

  // Delete the schedule from the database
  await Schedule.findByIdAndDelete(scheduleId)

  // Update the project by removing the schedule ID from its schedules array
  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    { $pull: { schedules: scheduleId } },
    { new: true }
  )

  if (!updatedProject) {
    throw new Error('Failed to update project')
  }

  console.log('Customer ID:', customerId)
  console.log('Project ID:', projectId)
  console.log('Schedule ID:', scheduleId)
  console.log('User:', userId)

  // this will clear cached data in our form/memory
  revalidatePath(`/dashboard/customers/${customerId}`)
  revalidatePath('/dashboard')

  // wont need a redirect here; client will handle using router.push

  // Return sucess indicator with customerId
  return { success: true, customerId }
}

export default deleteSchedule
