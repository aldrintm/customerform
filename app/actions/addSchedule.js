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
  // lets get the userId then
  const userEmail = sessionUser?.user?.email

  const user = await User.find({ email: userEmail })

  const userId = user._id

  // Retrieve customer ID from hidden field in your form
  const customerId = formData.get('customer')
  if (!customerId) {
    throw new Error('Customer ID is missing')
  }
  // Retrieve project Id from ???
  const projects = await Project.findOne({ customer: customerId })
  if (!projects || projects.length === 0) {
    throw new Error(
      "You need to add a Project first - doesn't have to be complete"
    )
  }

  const projectId = projects[0]._id

  console.log('Customer ID:', customerId)
  console.log('Project ID:', projectId)
  console.log('User:', userId)

  //   // Extract the date string from the form
  //   const poDate1Str = formData.get('purchaseOrderDate1')
  //   const poDate2Str = formData.get('purchaseOrderDate2')
  //   const poDate3Str = formData.get('purchaseOrderDate3')
  //   console.log('Raw purchaseOrderDate1:', poDate1Str)
  //   console.log('Raw purchaseOrderDate1:', poDate2Str)
  //   console.log('Raw purchaseOrderDate1:', poDate3Str)

  //   // Convert to a Date object and validate
  //   const poDate1 = new Date(poDate1Str)
  //   if (!poDate1Str || isNaN(poDate1.getTime())) {
  //     console.error('Invalid date for purchaseOrderDate1:', poDate1Str)
  //     // Optionally, set it to null or throw an error
  //   }

  //   const poDate2 = new Date(poDate2Str)
  //   if (!poDate2Str || isNaN(poDate2.getTime())) {
  //     console.error('Invalid date for purchaseOrderDate2:', poDate2Str)
  //     // Optionally, set it to null or throw an error
  //   }

  //   const poDate3 = new Date(poDate3Str)
  //   if (!poDate3Str || isNaN(poDate3.getTime())) {:
  //     console.error('Invalid date for purchaseOrderDate3:', poDate3Str)
  //     // Optionally, set it to null or throw an error
  //   }

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
  console.log(scheduleData)

  // lets plug all the date using the property model
  const newSchedule = new Schedule(scheduleData)
  // save it in our DB
  await newSchedule.save()
  console.log('New Schedule Saved:', newSchedule)

  // update the customer with the new project’s _id into the projects array
  // const updatedCustomer = await Customer.findByIdAndUpdate(
  //   customerId,
  //   {
  //     $push: { projects: newProject._id },
  //   },
  //   { new: true }
  // ) // return the updated document for loggin)

  // if (!updatedCustomer) {
  //   console.error('Customer update failed. Customer not found or invalid ID.')
  // } else {
  //   console.log('Customer updated:', updatedCustomer)
  // }

  //Update the customer document by pushing the new project's _id
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $push: { schedules: newSchedule._id } },
      { new: true }
    )
    console.log('Schedule updated:', updatedProject)
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
