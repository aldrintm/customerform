'use server'
import connectDB from '@/config/db'
import Customer from '@/models/Customer'
import { getSessionUser } from '@/utils/getSession'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// this action is added to the form to perform tasks
async function addCustomer(formData) {
  let newCustomer

  try {
    // connect to DB
    await connectDB()

    // lets check for user session
    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.userId) {
      throw new Error('User ID is required')
    }

    // lets get the userId then - add this to the customer createdBy field later
    // const { userId } = sessionUser

    const sanitizeInput = (value) => {
      if (typeof value === 'string') {
        const trimmed = value.trim()
        return trimmed.length > 0 ? trimmed : null // Use null instead of undefined
      }
      return null
    }

    // Validate required fields before creating customerData
    const firstName = sanitizeInput(formData.get('firstName')?.toLowerCase())
    const lastName = sanitizeInput(formData.get('lastName')?.toLowerCase())
    const phone = sanitizeInput(formData.get('phone'))
    const email = sanitizeInput(formData.get('email')?.toLowerCase())
    const street = sanitizeInput(formData.get('street'))
    const city = sanitizeInput(formData.get('city'))
    const zipcode = sanitizeInput(formData.get('zipcode'))

    // Check for required fields
    if (!firstName || !lastName || !phone || !email) {
      throw new Error('First name, last name, phone, and email are required')
    }

    // Check if email already exists (since it has unique index)
    const existingCustomer = await Customer.findOne({ email })
    if (existingCustomer) {
      throw new Error(`Customer with email ${email} already exists`)
    }

    const customerData = {
      firstName,
      lastName,
      phone,
      email,
      address: {
        street,
        city,
        state: sanitizeInput(formData.get('state')) || 'CA', // Default to CA
        zipcode,
      },
      contractorName: sanitizeInput(formData.get('contractorName')),
      contractorPhone: sanitizeInput(formData.get('contractorPhone')),
      notes: sanitizeInput(formData.get('notes')),
    }

    // lets check the server to see all items uploaded to the DB
    console.log('contractorPhone raw:', formData.get('contractorPhone'))
    console.log('Final customer data:', customerData)

    // lets plug all the data using the property model
    newCustomer = new Customer(customerData)

    // save it in our DB
    await newCustomer.save()

    console.log('Customer saved successfully:', newCustomer._id)
  } catch (error) {
    console.error('Error saving customer:', error)

    // Handle specific MongoDB duplicate key error
    if (error.code === 11000) {
      if (error.keyPattern?.email) {
        throw new Error('A customer with this email address already exists')
      }
    }

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      )
      throw new Error(`Validation failed: ${validationErrors.join(', ')}`)
    }

    // Generic error handling
    throw new Error(`Failed to save customer: ${error.message}`)
  }

  // Only redirect if customer was successfully created
  if (newCustomer && newCustomer._id) {
    // this will clear cached data in the memory
    revalidatePath('/dashboard')
    revalidatePath('/dashboard/customers')

    // redirect to newly created customer details
    redirect(`/dashboard/customers/${newCustomer._id}`)
  } else {
    throw new Error('Customer was not created successfully')
  }
}

export default addCustomer
