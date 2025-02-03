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

  const existingCustomer = await Project.findById(projectId)
  console.log(existingCustomer)

  const project = existingCustomer

  if (!project) {
    throw new Error('Project not found')
  }

  // verify ownership - we do not need this?
  // if (existingCustomer.owner.toString() !== userId) {
  //   throw new Error('Current user is not allowed to edit this customer')
  // }

  // Extracting the form data and structuring the purchaseOrder as an array of objects
  const purchaseOrders = [
    {
      purchaseOrderNumber: formData.get('purchaseOrderNumber'),
      purchaseOrderDate: formData.get('purchaseOrderDate'),
      squareFeet: formData.get('squareFeet'),
      purchaseOrderAmount: formData.get('purchaseOrderAmount'),
    },
  ]

  const projectData = {
    purchaseOrders,
    storeId: formData.get('storeId'),
    purchaseOrderDate: formData.get('purchaseOrderDate'),
    purchaseOrderAmount: formData.get('purchaseOrderAmount'),
    squareFeet: formData.get('squareFeet'),
    materialType: formData.get('materialType'),
    materialThickness: formData.get('materialThickness'),
    materialBrand: formData.get('materialBrand'),
    materialColor: formData.get('materialColor'),
    orderNotes: formData.get('orderNotes'),
  }

  // lets allocate the data above to the customerId in this profile and update it.
  const updatedCustomer = await Project.findByIdAndUpdate(
    projectId,
    projectData
  )

  console.log(updatedCustomer)

  // this will clear cached data in our form/memory
  revalidatePath('/', 'layout')

  // redirect to newly created thank you page details
  // redirect(`/customers/${newCustomer._id}`)

  // redirect to the main table
  redirect(`/dashboard/customers/${updatedCustomer._id}`)
}

export default updateProject
