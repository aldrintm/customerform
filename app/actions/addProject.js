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

  // Dynamic Purchase Orders Processing
  const purchaseOrders = []
  let poIndex = 1

  // Keep checking for purchase orders until we don't find any more
  while (true) {
    const poNumber = formData.get(`purchaseOrderNumber${poIndex}`)
    const poDateStr = formData.get(`purchaseOrderDate${poIndex}`)
    const squareFeet = formData.get(`squareFeet${poIndex}`)
    const poAmount = formData.get(`purchaseOrderAmount${poIndex}`)

    // If we don't find a PO number for this index, break the loop
    if (!poNumber && !poDateStr && !squareFeet && !poAmount) {
      break
    }

    // Only add the PO if at least one field has data
    if (poNumber || poDateStr || squareFeet || poAmount) {
      console.log(`Processing PO ${poIndex}:`, {
        poNumber,
        poDateStr,
        squareFeet,
        poAmount,
      })

      // Convert date string to Date object and validate
      let poDate = null
      if (poDateStr) {
        const dateObj = new Date(poDateStr)
        if (!isNaN(dateObj.getTime())) {
          poDate = dateObj
        } else {
          console.error(
            `Invalid date for purchaseOrderDate${poIndex}:`,
            poDateStr
          )
        }
      }

      // Add the purchase order to our array
      purchaseOrders.push({
        purchaseOrderNumber: poNumber?.trim() || '',
        purchaseOrderDate: poDate,
        squareFeet: squareFeet ? Number(squareFeet) : 0,
        purchaseOrderAmount: poAmount ? Number(poAmount) : 0,
      })
    }

    poIndex++
  }

  console.log('All Purchase Orders:', purchaseOrders)

  const projectData = {
    customer: customerId,
    customerType: formData.get('storeName')?.trim() || '',
    storeId: formData.get('storeId')?.trim() || '',
    status: formData.get('status')?.trim() || 'pending',
    purchaseOrders: purchaseOrders, // Use our dynamic array
    description: formData.get('description')?.trim() || '',
    materialType: formData.get('materialType')?.trim() || '',
    materialNote: formData.get('materialNote')?.trim() || '',
    materialThickness: formData.get('materialThickness')?.trim() || '',
    materialBrand: formData.get('materialBrand')?.trim() || '',
    materialColor: formData.get('materialColor')?.trim() || '',
    materialFinish: formData.get('materialFinish')?.trim() || '',
    edge: formData.getAll('edge').map((edge) => edge?.trim() || ''),
    sinkType: formData.get('sinkType')?.trim() || '',
    sinkQuantity: formData.get('sinkQuantity')
      ? Number(formData.get('sinkQuantity'))
      : 0,
    sinkLocation: formData.get('sinkLocation')?.trim() || '',
    sinkInfo: formData.get('sinkInfo')?.trim() || '',
    stove: formData.has('stove'),
    splash: formData.getAll('splash').map((splash) => splash?.trim() || ''),
    cooktop: formData.has('cooktop'),
    demo: formData.has('demo'),
    demoNote: formData.get('demoNote')?.trim() || '',
    plumbing: formData.has('plumbing'),
    plumbingNote: formData.get('plumbingNote')?.trim() || '',
    notes: formData.get('notes')?.trim() || '',
  }

  // lets check the server to see all items uploaded to the DB
  console.log('Final Project Data:', projectData)

  // lets plug all the data using the property model
  const newProject = new Project(projectData)
  // save it in our DB
  await newProject.save()
  console.log('New Project Saved:', newProject)

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

  // Optionally, revalidate the customer's page and redirect
  // this will clear cached data in our form/memory
  revalidatePath(`/dashboard/customers/${customerId}`)

  // redirect to newly created thank you page details
  // redirect(`/customers/${newCustomer._id}`)

  // redirect to the main table
  redirect(`/dashboard/customers/${customerId}`)
}

export default addProject
