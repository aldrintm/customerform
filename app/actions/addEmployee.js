'use server'
import connectDB from '@/config/db'
import Employee from '@/models/Employee'
import { getSessionUser } from '@/utils/getSession'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// this action is added to the form to perform tasks
async function addEmployee(formData) {
  // connect to DB
  await connectDB()

  // lets check for user session
  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required')
  }

  // lets get the userId then
  const { userId } = sessionUser

  const employeeData = {
    employeeId: formData.get('employeeId')?.toLowerCase() || '',
    firstName: formData.get('firstName')?.toLowerCase() || '',
    lastName: formData.get('lastName')?.toLowerCase() || '',
    phone: formData.get('phone') || '',
    email: formData.get('email') || '',
    address: {
      street: formData.get('street') || '',
      city: formData.get('city') || '',
      state: formData.get('state') || '',
      zipcode: formData.get('zipcode') || '',
    },
    emergencyContact: formData.get('emergencyContact')?.toLowerCase() || '',
    emergencyPhone: formData.get('emergencyPhone') || '',
    status: formData.get('status') || '',
    department: formData.get('department') || '',
    position: formData.get('position') || '',
    hireDate: formData.get('hireDate') || '',
    terminationDate: formData.get('terminationDate') || '',
    notes: formData.get('notes')?.toLowerCase() || '',
  }

  // lets check the server to see all items uploaded to the DB
  console.log(employeeData)

  // lets plug all the date using the employee model
  const newEmployee = new Employee(employeeData)
  // save it in our DB
  await newEmployee.save()

  // this will clear cached data in the memory
  revalidatePath('/dashboard/company/employees')

  // redirect to newly created thank you page details
  // redirect(`/customers/${newCustomer._id}`)

  // redirect to the main table
  redirect(`/dashboard/company`)
}

export default addEmployee
