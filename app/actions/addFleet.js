'use server'
import connectDB from '@/config/db'
import Fleet from '@/models/Fleet'
import { getSessionUser } from '@/utils/getSession'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// this action is added to the form to perform tasks
async function addFleet(formData) {
  // connect to DB
  await connectDB()

  // lets check for user session
  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required')
  }

  // lets get the userId then
  const { userId } = sessionUser

  const fleetData = {
    vin: formData.get('vin')?.toLowerCase() || '',
    year: formData.get('year')?.toLowerCase() || '',
    brand: formData.get('brand')?.toLowerCase() || '',
    model: formData.get('model') || '',
    license: formData.get('license') || '',
    department: formData.get('department') || '',
    driver: formData.get('driver')?.toLowerCase() || '',
    purchaseDate: formData.get('purchaseDate') || '',
    endDate: formData.get('endDate') || '',
    status: formData.get('status') || '',
    fasTrack: formData.get('fasTrack')?.toLowerCase() || '',
    other: formData.get('other')?.toLowerCase() || '',
    notes: formData.get('notes')?.toLowerCase() || '',
  }

  // lets check the server to see all items uploaded to the DB
  console.log(fleetData)

  // lets plug all the date using the employee model
  const newFleet = new Fleet(fleetData)
  // save it in our DB
  await newFleet.save()

  // this will clear cached data in the memory
  revalidatePath('/dashboard/company/fleet')

  // redirect to newly created thank you page details
  // redirect(`/customers/${newCustomer._id}`)

  // redirect to the main table
  redirect(`/dashboard/company/fleet`)
}

export default addFleet
