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

  // Extracting the form data and structuring the purchaseOrder as an array of objects
  const purchaseOrders = [
    {
      purchaseOrderNumber: formData.get('purchaseOrderNumber1'),
      purchaseOrderDate: formData.get('purchaseOrderDate1'),
      squareFeet: formData.get('squareFeet1'),
      purchaseOrderAmount: formData.get('purchaseOrderAmount1'),
    },
    {
      purchaseOrderNumber: formData.get('purchaseOrderNumber2'),
      purchaseOrderDate: formData.get('purchaseOrderDate2'),
      squareFeet: formData.get('squareFeet2'),
      purchaseOrderAmount: formData.get('purchaseOrderAmount2'),
    },
    {
      purchaseOrderNumber: formData.get('purchaseOrderNumber3'),
      purchaseOrderDate: formData.get('purchaseOrderDate3'),
      squareFeet: formData.get('squareFeet3'),
      purchaseOrderAmount: formData.get('purchaseOrderAmount3'),
    },
  ]

  const projectData = {
    purchaseOrders,
    description: formData.get('description'),
    customerType: formData.get('storeName')?.trim() || '',
    storeId: formData.get('storeId'),
    status: formData.get('status'),
    materialType: formData.get('materialType'),
    materialThickness: formData.get('materialThickness'),
    materialBrand: formData.get('materialBrand'),
    materialColor: formData.get('materialColor'),
    materialFinish: formData.get('materialFinish'),
    edge: formData.get('edge'),
    sinkQuantity: formData.get('sinkQuantity'),
    sinkType: formData.get('sinkType'),
    sinkLocation: formData.get('sinkLocation'),
    sinkInfo: formData.get('sinkInfo'),
    stove: formData.get('stove') ? true : false,
    cooktop: formData.get('cooktop') ? true : false,
    demo: Boolean(formData.get('demo')),
    plumbing: Boolean(formData.get('plumbing')),
    splash: formData.get('splash'),
    notes: formData.get('notes'),
  }

  // lets allocate the data above to the customerId in this profile and update it.
  const updatedProject = await Project.findByIdAndUpdate(projectId, projectData)

  console.log(updatedProject)

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
