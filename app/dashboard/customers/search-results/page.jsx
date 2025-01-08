import Header from '@/components/Header'
import SideNavbar from '@/components/SideNavbar'
import connectDB from '@/config/db'
import Customer from '@/models/Customer'
import { convertToSerializeableObject } from '@/utils/convertToObject'

const SearchResults = async ({ searchParams: { search } }) => {
  await connectDB()

  const customerPattern = new RegExp(search, 'i')

  let query = {
    $or: [
      { firstName: customerPattern },
      { lastName: customerPattern },
      { phone: customerPattern },
      { email: customerPattern },
      { 'address.street': customerPattern },
      { purchaseOrderNumber: customerPattern },
    ],
  }

  const customerQueryResults = await Customer.find(query).lean()
  const customer = convertToSerializeableObject(customerQueryResults)

  console.log(customer)

  return (
    <>
      <div className='flex min-h-screen w-full flex-col'>
        <Header />
        <SideNavbar />
        <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14'>
          <h1 className='text-center text-2xl font-bold mt-10'>
            Search Results Page Goes here
          </h1>
        </main>
      </div>
    </>
  )
}

export default SearchResults
