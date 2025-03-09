import connectDB from '@/config/db'
import Customer from '@/models/Customer'
import Note from '@/models/Note'
import Project from '@/models/Project'
import User from '@/models/User'
import Schedule from '@/models/Schedule'
import SideNavbar from '@/components/SideNavbar'
import Header from '@/components/Header'
import CustomerDetails from '@/components/CustomerDetails'
import { convertToSerializeableObject } from '@/utils/convertToObject'
import { notFound } from 'next/navigation'

const CustomerPage = async ({ params }) => {
  const awaitedParams = await params // await params object
  const { id } = awaitedParams

  // const customer = await fetchCustomer(id)

  await connectDB()

  // Populate the projects array (this assumes your Customer model's projects field
  // is defined as an array of ObjectIds referencing 'Project')
  const customerDoc = await Customer.findById(id)
    .populate({
      path: 'projects',
      populate: { path: 'schedules' },
    })
    .populate({
      path: 'officeNotes',
      populate: {
        path: 'staff',
        select: 'username', // only fetch the username (and _id)
      },
    })
    .lean()

  const customer = convertToSerializeableObject(customerDoc)

  // Extract schedules from all projects into a flat array
  const schedules = customer.projects
    ? customer.projects.flatMap((project) => project.schedules || [])
    : []

  console.log('Customer:', customer)
  console.log('Schedules:', schedules)

  if (!customer) {
    notFound() // Returns a 404 page if no customer is found
  }
  return (
    <>
      <div className='flex min-h-screen w-full flex-col'>
        <Header />
        <SideNavbar />
        <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14 print:pl-0'>
          <CustomerDetails customer={customer} schedules={schedules} />
        </main>
      </div>
    </>
  )
}

export default CustomerPage
