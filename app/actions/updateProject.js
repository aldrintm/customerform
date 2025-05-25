'use server'
import connectDB from '@/config/db'
import Customer from '@/models/Customer'
import Project from '@/models/Project'
import { getSessionUser } from '@/utils/getSession'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// this action is added to the form to perform tasks
async function updateProject(customerId, projectId, formData) {
  // connect to DB
  await connectDB()

  // lets check for user session
  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required')
  }

  // lets get the userId then
  const { userId } = sessionUser

  const project = await Project.findById(projectId)

  if (!project) {
    throw new Error('Project not found')
  }

  // verify ownership - we do not need this?
  // if (existingCustomer.owner.toString() !== userId) {
  //   throw new Error('Current user is not allowed to edit this customer')
  // }

  // Dynamic Purchase Orders Processing (same logic as addProject)
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

  console.log('All Purchase Orders for Update:', purchaseOrders)

  const projectData = {
    purchaseOrders: purchaseOrders, // Use our dynamic array
    customerType: formData.get('storeName')?.trim() || '',
    storeId: formData.get('storeId')?.trim() || '',
    status: formData.get('status')?.trim() || '',
    description: formData.get('description')?.trim() || '',
    materialNote: formData.get('materialNote')?.trim() || '',
    materialType: formData.get('materialType')?.trim() || '',
    materialThickness: formData.get('materialThickness')?.trim() || '',
    materialBrand: formData.get('materialBrand')?.trim() || '',
    materialColor: formData.get('materialColor')?.trim() || '',
    materialFinish: formData.get('materialFinish')?.trim() || '',
    edge: formData.getAll('edge').map((edge) => edge?.trim() || ''),
    sinkQuantity: formData.get('sinkQuantity')
      ? Number(formData.get('sinkQuantity'))
      : 0,
    sinkType: formData.get('sinkType')?.trim() || '',
    sinkLocation: formData.get('sinkLocation')?.trim() || '',
    sinkInfo: formData.get('sinkInfo')?.trim() || '',
    stove: formData.has('stove'),
    cooktop: formData.has('cooktop'),
    demo: formData.has('demo'),
    demoNote: formData.get('demoNote')?.trim() || '',
    plumbing: formData.has('plumbing'),
    plumbingNote: formData.get('plumbingNote')?.trim() || '',
    splash: formData.getAll('splash').map((splash) => splash?.trim() || ''),
    notes: formData.get('notes')?.trim() || '',
  }

  console.log('Final Project Update Data:', projectData)

  // lets allocate the data above to the customerId in this profile and update it.
  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    projectData,
    { new: true }
  )

  console.log('Updated Project:', updatedProject)

  console.log('formData.has("demo"):', formData.has('demo'))
  console.log('formData.has("plumbing"):', formData.has('plumbing'))

  // this will clear cached data in our form/memory
  revalidatePath('/', 'layout')

  // redirect to newly created thank you page details
  // redirect(`/customers/${newCustomer._id}`)

  // redirect to the main table
  redirect(`/dashboard/customers/${customerId}`)
}

export default updateProject
