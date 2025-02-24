import SideNavbar from '@/components/SideNavbar'
import Header from '@/components/Header'
import Card from '@/components/Card'
import connectDB from '@/config/db'
import Customer from '@/models/OldCustomer'

const InventoryPage = async () => {
  await connectDB()
  const customers = await Customer.find({}).lean()
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <SideNavbar />
      <Header />
      <section className='bg-white p-4'>
        <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14'>
          <div className='mx-auto max-w-lg text-center'>
            <h1 className='text-2xl font-bold sm:text-3xl'>Inventory Page</h1>

            <p className='mt-4 text-gray-500'>(need to work on this)</p>
          </div>
          <div className='grid grid-cols-4 gap-6'>
            {customers.map((customer) => (
              <Card key={customer._id} customer={customer} />
            ))}
          </div>
        </main>
      </section>
    </div>
  )
}

export default InventoryPage
