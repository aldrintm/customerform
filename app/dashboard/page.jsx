import connectDB from '@/config/db'
import Customer from '@/models/Customer'
import SideNavbar from '@/components/SideNavbar'
import Header from '@/components/Header'
import Dashboard from '@/components/Dashboard'
import { convertToSerializeableObject } from '@/utils/convertToObject'

const DashboardPage = async () => {
  await connectDB()

  const customerDocs = await Customer.find({})
    .sort({ createdAt: -1 })
    .limit(10)
    .lean()

  const customers = customerDocs.map(convertToSerializeableObject)

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <SideNavbar />
      <Header />
      <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14'>
        <Dashboard customers={customers} />
      </main>
    </div>
  )
}

export default DashboardPage
