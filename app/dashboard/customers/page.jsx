export const dynamic = 'force-dynamic' // 👈👈 ensures fresh fetch every page load. this disables static rendering/caching

import TableComponentPage from '@/components/TableComponent'
import SideNavbar from '@/components/SideNavbar'
import Header from '@/components/Header'
import connectDB from '@/config/db'
import Customer from '@/models/Customer'
import Project from '@/models/Project'
import { convertToSerializeableObject } from '@/utils/convertToObject'

const CustomerList = async ({ searchParams: { page = 1, pageSize = 450 } }) => {
  await connectDB()

  const skip = (page - 1) * pageSize
  const limit = parseInt(pageSize, 10)
  if (isNaN(limit) || limit <= 0) {
    throw new Error('Invalid pageSize parameter')
  }
  if (isNaN(page) || page <= 0) {
    throw new Error('Invalid page parameter')
  }
  const totalCustomers = await Customer.countDocuments({})
  const totalPages = Math.ceil(totalCustomers / limit)

  const customerDocs = await Customer.find({})
    .skip(skip)
    .sort({ createdAt: -1 })
    .populate('projects')
    .limit(pageSize)
    .lean()

  const customers = customerDocs.map(convertToSerializeableObject)

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <SideNavbar />
      <Header />
      <main className='flex flex-col sm:gap-4 sm:py-0 sm:ml-14 sm:px-2 md:px-4 lg:px-6 xl:px-8'>
        <TableComponentPage customers={customers} />
      </main>
    </div>
  )
}

export default CustomerList
