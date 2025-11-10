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
async function addSchedule(formData) {
  // connect to DB
  await connectDB()

  // lets check for user session
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

  // Retrieve customer ID from hidden field in your form
  const customerId = formData.get('customer')
  if (!customerId) {
    throw new Error('Customer ID is missing')
  }
  // // Retrieve project Id from ???
  // const projects = await Project.findOne({ customer: customerId })
  // if (!projects || projects.length === 0) {
  //   throw new Error(
  //     "You need to add a Project first - doesn't have to be complete"
  //   )
  // }

  // Retrieve Selected Project Id from Schedule Form
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

  console.log('Customer ID:', customerId)
  console.log('Project ID:', projectId)
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
    demoDescription: formData.get('demoDescription'),
    demoDate: formData.get('demoDate'),
    demoTime: formData.get('demoTime'),
    demoBy: formData.get('demoBy'),
    demoNotes: formData.get('demoNotes'),
    installDescription: formData.get('installDescription'),
    installDate: formData.get('installDate'),
    installTime: formData.get('installTime'),
    installBy: formData.get('installBy'),
    installNotes: formData.get('installNotes'),
    serviceDescription: formData.get('serviceDescription'),
    serviceDate: formData.get('serviceDate'),
    serviceTime: formData.get('serviceTime'),
    serviceBy: formData.get('serviceBy'),
    serviceNotes: formData.get('serviceNotes'),
  }

  // lets check the server to see all items uploaded to the DB
  console.log('Schedule Data:', scheduleData)

  // lets plug all the date using the property model
  const newSchedule = new Schedule(scheduleData)
  // save it in our DB
  await newSchedule.save()
  console.log('New Schedule Saved:', newSchedule)

  //Update the project with the new scheduleId
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $push: { schedules: newSchedule._id } },
      { new: true }
    )
    if (!updatedProject) {
      console.error('Project Update Failed. Project Not Found or Invalid Id')
    } else {
      console.log('Project Updated with Schedule:', updatedProject)
    }
  } catch (error) {
    console.error('Error updating schedule:', error)
  }

  //   // Update the customer document using updateOne
  //   try {
  //     const updateResult = await Customer.updateOne(
  //       { _id: customerId },
  //       { $push: { projects: newProject._id } }
  //     )
  //     console.log('Update result:', updateResult)

  //     // Optionally fetch the updated customer document to verify:
  //     const updatedCustomer = await Customer.findById(customerId)
  //     console.log('Updated Customer:', updatedCustomer)
  //   } catch (error) {
  //     console.error('Error updating customer:', error)
  //   }

  // Optionally, revalidate the customer’s page and redirect
  // this will clear cached data in our form/memory
  revalidatePath('/dashboard/customers/${customerId}')

  // redirect to newly created thank you page details
  // redirect(`/customers/${newCustomer._id}`)

  // redirect to the main table
  redirect(`/dashboard/customers/${customerId}`)
}

export default addSchedule
