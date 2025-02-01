'use server'
import connectDB from '@/config/db'
import Customer from '@/models/OldCustomer'
import { getSessionUser } from '@/utils/getSession'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// this action is added to the form to perform tasks
async function updateCustomer(customerId, formData) {
  // connect to DB
  await connectDB()

  // lets check for user session
  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required')
  }

  // lets get the userId then
  const { userId } = sessionUser

  const existingCustomer = await Customer.findById(customerId)
  console.log(existingCustomer)

  // verify ownership - we do not need this?
  // if (existingCustomer.owner.toString() !== userId) {
  //   throw new Error('Current user is not allowed to edit this customer')
  // }

  const customerData = {
    firstName: formData.get('firstName').toLowerCase(),
    lastName: formData.get('lastName'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    address: {
      street: formData.get('street'),
      city: formData.get('city'),
      state: formData.get('state'),
      zipcode: formData.get('zipcode'),
    },
    contractorName: formData.get('contractorName'),
    contractorPhone: formData.get('contractorPhone'),
    purchaseOrderNumber: formData.get('purchaseOrderNumber'),
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
  const updatedCustomer = await Customer.findByIdAndUpdate(
    customerId,
    customerData
  )

  console.log(updatedCustomer)

  // this will clear cached data in our form/memory
  revalidatePath('/', 'layout')

  // redirect to newly created thank you page details
  // redirect(`/customers/${newCustomer._id}`)

  // redirect to the main table
  redirect(`/dashboard/customers/${updatedCustomer._id}`)
}

export default updateCustomer
