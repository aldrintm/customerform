'use server'
import TableComponentPage from '@/components/TableComponent'
import SideNavbar from '@/components/SideNavbar'
import Header from '@/components/Header'
import connectDB from '@/config/db'
import Customer from '@/models/Customer'
import Project from '@/models/Project'
import { convertToSerializeableObject } from '@/utils/convertToObject'

const newCustomerForm = async () => {
  await connectDB()

  const customerDocs = await Customer.find({})
    .populate('projects')
    .sort({ createdAt: -1 })
    .limit(30)
    .lean()

  const customers = customerDocs.map(convertToSerializeableObject)

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <SideNavbar />
      <Header />
      <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:ml-14'>
        <TableComponentPage customers={customers} />
      </main>
    </div>
  )
}

export default newCustomerForm
