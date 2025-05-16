'use server'
import connectDB from '@/config/db'
import Project from '@/models/Project'
import Customer from '@/models/Customer'
import { getSessionUser } from '@/utils/getSession'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// this action is added to the form to perform tasks
async function addProject(formData) {
  // connect to DB
  await connectDB()

  // lets check for user session
  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required')
  }

  // lets get the userId then
  const { userId } = sessionUser

  // Retrieve customer ID from hidden field in your form
  const customerId = formData.get('customer')
  if (!customerId) {
    throw new Error('Customer ID is missing')
  }

  console.log('Customer ID:', customerId)

  // Extract the date string from the form
  const poDate1Str = formData.get('purchaseOrderDate1')
  const poDate2Str = formData.get('purchaseOrderDate2')
  const poDate3Str = formData.get('purchaseOrderDate3')
  console.log('Raw purchaseOrderDate1:', poDate1Str)
  console.log('Raw purchaseOrderDate1:', poDate2Str)
  console.log('Raw purchaseOrderDate1:', poDate3Str)

  // Convert to a Date object and validate
  const poDate1 = new Date(poDate1Str)
  if (!poDate1Str || isNaN(poDate1.getTime())) {
    console.error('Invalid date for purchaseOrderDate1:', poDate1Str)
    // Optionally, set it to null or throw an error
  }

  const poDate2 = new Date(poDate2Str)
  if (!poDate2Str || isNaN(poDate2.getTime())) {
    console.error('Invalid date for purchaseOrderDate2:', poDate2Str)
    // Optionally, set it to null or throw an error
  }

  const poDate3 = new Date(poDate3Str)
  if (!poDate3Str || isNaN(poDate3.getTime())) {
    console.error('Invalid date for purchaseOrderDate3:', poDate3Str)
    // Optionally, set it to null or throw an error
  }

  const projectData = {
    customer: customerId,
    customerType: formData.get('storeName')?.trim() || '',
    storeId: formData.get('storeId')?.trim() || '',
    status: formData.get('status')?.trim() || 'pending',
    purchaseOrders: [
      {
        purchaseOrderNumber: formData.get('purchaseOrderNumber1')?.trim() || '',
        purchaseOrderDate:
          poDate1Str && !isNaN(poDate1.getTime()) ? poDate1 : null,
        squareFeet: formData.get('squareFeet1')?.trim() || '0',
        purchaseOrderAmount:
          formData.get('purchaseOrderAmount1')?.trim() || '0',
      },
      // ... repeat for purchaseOrders 2 and 3
    ],
    description: formData.get('description')?.trim() || '',
    materialType: formData.get('materialType')?.trim() || '',
    materialThickness: formData.get('materialThickness')?.trim() || '',
    materialBrand: formData.get('materialBrand')?.trim() || '',
    materialColor: formData.get('materialColor')?.trim() || '',
    materialFinish: formData.get('materialFinish')?.trim() || '',
    edge: formData.getAll('edge').map((edge) => edge?.trim() || ''),
    sinkType: formData.get('sinkType')?.trim() || '',
    sinkQuantity: formData.get('sinkQuantity')?.trim() || '0',
    sinkLocation: formData.get('sinkLocation')?.trim() || '',
    sinkInfo: formData.get('sinkInfo')?.trim() || '',
    stove: formData.has('stove'),
    splash: formData.getAll('splash').map((splash) => splash?.trim() || ''),
    cooktop: formData.has('cooktop'),
    demo: formData.has('demo'),
    plumbing: formData.has('plumbing'),
    notes: formData.get('notes')?.trim() || '',
  }

  // lets check the server to see all items uploaded to the DB
  console.log(projectData)

  // lets plug all the date using the property model
  const newProject = new Project(projectData)
  // save it in our DB
  await newProject.save()
  console.log('New Project Saved:', newProject)

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

  // Update the customer document by pushing the new project's _id
  // try {
  //   const updatedCustomer = await Customer.findByIdAndUpdate(
  //     customerId,
  //     { $push: { projects: newProject._id } },
  //     { new: true }
  //   )
  //   console.log('Customer updated:', updatedCustomer)
  // } catch (error) {
  //   console.error('Error updating customer:', error)
  // }

  // Update the customer document using updateOne
  try {
    const updateResult = await Customer.updateOne(
      { _id: customerId },
      { $push: { projects: newProject._id } }
    )
    console.log('Update result:', updateResult)

    // Optionally fetch the updated customer document to verify:
    const updatedCustomer = await Customer.findById(customerId)
    console.log('Updated Customer:', updatedCustomer)
  } catch (error) {
    console.error('Error updating customer:', error)
  }

  // Optionally, revalidate the customer’s page and redirect
  // this will clear cached data in our form/memory
  revalidatePath('/dashboard/customers/${customerId}')

  // redirect to newly created thank you page details
  // redirect(`/customers/${newCustomer._id}`)

  // redirect to the main table
  redirect(`/dashboard/customers/${customerId}`)
}

export default addProject
