'use server'
import connectDB from '@/config/db'
import Customer from '@/models/Customer'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// this action is added to the form to perform tasks
async function addCustomer(formData) {
  // connect to DB
  //   await connectDB()

  const customerData = {
    firstName: formData.get('firstName'),
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

  // lets check the server to see all items uploaded to the DB

  // lets plug all the date using the property model
  const newCustomer = new Customer(customerData)
  // save it in our DB
  //await newCustomer.save()

  console.log(newCustomer)

  // this will clear cached data in our form/memory
  revalidatePath('/', 'layout')

  // redirect to newly created thank you page details
  redirect(`/customer`)
}

export default addCustomer
