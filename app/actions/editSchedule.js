'use server'
import connectDB from '@/config/db'
import Project from '@/models/Project'
import Schedule from '@/models/Schedule'
import User from '@/models/User'
import Customer from '@/models/Customer'
import { getSessionUser } from '@/utils/getSession'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// this action is added to the form to perform tasks
async function editSchedule(formData) {
  // connect to DB
  await connectDB()

  // Check for user session
  const sessionUser = await getSessionUser()
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required')
  }
  // Find userId using email
  const userEmail = sessionUser?.user?.email
  const user = await User.findOne({ email: userEmail })
  if (!user) {
    throw new Error('User Not Found')
  }
  const userId = user._id

  // Retrieve customer ID and schedule ID from form
  const customerId = formData.get('customer')
  const scheduleId = formData.get('scheduleId')
  if (!customerId) {
    throw new Error('Customer ID is missing')
  }
  if (!scheduleId) {
    throw new Error('Schedule ID is missing')
  }

  // Retrieve Selected Project Id from ScheduleEditForm
  const projectId = formData.get('project')
  if (!projectId) {
    throw new Error('Project ID is mising')
  }

  // Verify the project exists and belongs to the customer
  const project = await Project.findOne({
    _id: projectId,
    customer: customerId,
  })
  if (!project) {
    throw new Error(
      'Invalid Project Id or Project does not belong to this customer'
    )
  }

  // Verify the schedule exist
  const existingSchedule = await Schedule.findById(scheduleId)
  if (!existingSchedule) {
    throw new Error('Schedule Not Found')
  }

  console.log('Customer ID:', customerId)
  console.log('Project ID:', projectId)
  console.log('Schedule ID:', scheduleId)
  console.log('User:', userId)

  const scheduleData = {
    user: userId,
    customer: customerId,
    project: projectId,
    measureDescription: formData.get('measureDescription'),
    measureDate: formData.get('measureDate'),
    measureTime: formData.get('measureTime'),
    measureBy: formData.get('measureBy'),
    measureNotes: formData.get('measureNotes'),
    installDescription: formData.get('installDescription'),
    installDate: formData.get('installDate'),
    installTime: formData.get('installTime'),
    installBy: formData.get('installBy'),
    installNotes: formData.get('installNotes'),
  }

  // lets check the server to see all items uploaded to the DB
  console.log('Schedule Data:', scheduleData)

  // Update the existing schedule
  const updatedSchedule = await Schedule.findByIdAndUpdate(
    scheduleId,
    { $set: scheduleData }, // we use $set to update fields without limits - like null is null
    { new: true, runValidators: true } // return updated doc, run schema validators
  )
  if (!updatedSchedule) {
    throw new Error('Failed to update schedule')
  }

  // check for success
  console.log('Updated Schedule:', updatedSchedule)

  // Handle project change if projectId changed
  if (existingSchedule.project.toString() !== projectId) {
    // Remove Schedule from old project
    await Project.findById(
      existingSchedule.project,
      { $pull: { schedules: scheduleId } },
      { new: true }
    )
    // Add Schedule to new project
    await Project.findByIdAndUpdate(
      projectId,
      { $addToSet: { schedules: scheduleId } },
      { new: true }
    )
    console.log(`Moved schedule to ${scheduleId} to project ${projectId}`)
  }

  // Optionally, revalidate the customer’s page and redirect
  // this will clear cached data in our form/memory
  revalidatePath('/dashboard/customers/${customerId}')

  // redirect to newly created thank you page details
  // redirect(`/customers/${newCustomer._id}`)

  // redirect to the main table
  redirect(`/dashboard/customers/${customerId}`)
}

export default editSchedule
