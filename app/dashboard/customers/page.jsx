'use server'
import TableComponentPage from '@/components/TableComponent'
import SideNavbar from '@/components/SideNavbar'
import Header from '@/components/Header'
import connectDB from '@/config/db'
import Customer from '@/models/Customer'
import { convertToSerializeableObject } from '@/utils/convertToObject'

const newCustomerForm = async () => {
  await connectDB()

  const customerDocs = await Customer.find({})
    .sort({ createdAt: -1 })
    .limit(20)
    .lean()

  const customers = customerDocs.map(convertToSerializeableObject)

  console.log(customers)

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
