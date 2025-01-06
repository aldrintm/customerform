import connectDB from '@/config/db'
import Customer from '@/models/Customer'
import SideNavbar from '@/components/SideNavbar'
import Header from '@/components/Header'
import CustomerDetails from '@/components/CustomerDetails'
import { convertToSerializeableObject } from '@/utils/convertToObject'

const CustomerPage = async ({ params }) => {
  const { id } = await params

  await connectDB()
  const customerDocs = await Customer.findById(id).lean()
  const customer = convertToSerializeableObject(customerDocs)
  return (
    <>
      <div className='flex min-h-screen w-full flex-col'>
        <Header />
        <SideNavbar />
        <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14'>
          <CustomerDetails customer={customer} />
        </main>
      </div>
    </>
  )
}

export default CustomerPage
