import connectDB from '@/config/db'
import Customer from '@/models/Customer'
import Note from '@/models/Note'
import Project from '@/models/Project'
import SideNavbar from '@/components/SideNavbar'
import Header from '@/components/Header'
import CustomerDetails from '@/components/CustomerDetails'
import { convertToSerializeableObject } from '@/utils/convertToObject'
import { notFound } from 'next/navigation'
import mongoose from 'mongoose'
import { cache } from 'react'

// const fetchCustomer = cache(async (id) => {
//   if (!mongoose.Types.ObjectId.isValid(id)) return null // Prevents errors

//   await connectDB()
//   const customerDocs = await Customer.findById(id).lean()
//   return customerDocs ? convertToSerializeableObject(customerDocs) : null
// })

const CustomerPage = async ({ params }) => {
  const awaitedParams = await params // await params object
  const { id } = awaitedParams

  // const customer = await fetchCustomer(id)

  await connectDB()

  // Populate the projects array (this assumes your Customer model's projects field
  // is defined as an array of ObjectIds referencing 'Project')
  const customerDoc = await Customer.findById(id)
    .populate('projects')
    .populate('officeNotes')
    .lean()

  const customer = convertToSerializeableObject(customerDoc)

  if (!customer) {
    notFound() // Returns a 404 page if no customer is found
  }
  return (
    <>
      <div className='flex min-h-screen w-full flex-col'>
        <Header />
        <SideNavbar />
        <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14 print:pl-0'>
          <CustomerDetails customer={customer} />
        </main>
      </div>
    </>
  )
}

export default CustomerPage
