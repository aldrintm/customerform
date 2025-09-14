'use server'

import connectDB from '@/config/db'
import Customer from '@/models/Customer'
import User from '@/models/User'
import { getSessionUser } from '@/utils/getSession'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// this action is deletes the customer from the database
async function deleteCustomer(customerId) {
  try {
    // connect to DB
    await connectDB()

    // lets check for user session
    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.userId) {
      throw new Error('User ID is required')
    }

    // Debug logging for session and email parameter
    // console.log('Session user:', sessionUser)
    // console.log('Session User Email:', sessionUser.user.email)
    // console.log('Email parameter passed:', email)
    // console.log('Email type:', typeof email)

    // Find the user by email (correct syntax with object)
    const user = await User.findOne(
      sessionUser.user.email
        ? { email: sessionUser.user.email }
        : { _id: sessionUser.userId }
    )

    // More debug logging
    // console.log('User query result:', user)

    // if (!user) {
    //   Let's also try to find the user by userId from session
    //   const userBySessionId = await User.findById(sessionUser.userId)
    //   console.log('User found by session ID:', userBySessionId)
    //   throw new Error('User not found with ID')
    // }

    if (!user) {
      throw new Error('User not found')
    }

    // Debug logging
    console.log('User found:', user.email)
    console.log('User isAdmin:', user.isAdmin)

    // verify admin authorization
    if (!user.isAdmin) {
      console.log('User is not Admin, returning error response')
      return {
        success: false,
        error:
          'You are not authorized to delete this customer - Admin access required',
      }
    }

    // Find and delete the customer by ID
    const deletedCustomer = await Customer.findByIdAndDelete(customerId)

    if (!deletedCustomer) throw new Error('Customer Not Found')

    console.log('Deleted customer:', deletedCustomer._id)

    // this will clear cached data in our form/memory
    revalidatePath('/dashboard/customers')
    revalidatePath('/dashboard')

    return { success: true }
  } catch (error) {
    console.error('Error deleting customer:', error)

    return {
      success: false,
      error: error.message,
    }
  }

  // Removed redirect from here - let the client handle the UI update
  // Only redirect if deletion was successful (outside try-catch)
  // redirect('/dashboard/customers')
}

export default deleteCustomer
