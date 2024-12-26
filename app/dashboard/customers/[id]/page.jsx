import connectDB from '@/config/db'
import Customer from '@/models/Customer'
import CustomerDetails from '@/components/CustomerDetails'

const CustomerPage = async ({ params }) => {
  await connectDB()
  const customer = await Customer.findById(params.id).lean()
  return (
    <>
      <div className='flex min-h-screen w-full flex-col'>
        <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14'>
          <CustomerDetails customer={customer} />
        </main>
      </div>
    </>
  )
}

export default CustomerPage
