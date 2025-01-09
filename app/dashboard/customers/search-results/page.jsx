import Link from 'next/link'
import CustomerSearchForm from '@/components/CustomerSearchForm'
import Header from '@/components/Header'
import SideNavbar from '@/components/SideNavbar'
import Button from '@/components/Button'
import connectDB from '@/config/db'
import Customer from '@/models/Customer'
import { convertToSerializeableObject } from '@/utils/convertToObject'
import { CircleArrowLeft, Undo2 } from 'lucide-react'
import Card from '@/components/Card'

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

  // console.log(customerQueryResults)
  const customers = customerQueryResults.map(convertToSerializeableObject)

  console.log(customers)

  const customersArray = Array.isArray(customers) ? customers : []

  // console.log(customersArray)

  return (
    <>
      <div className='flex min-h-screen w-full flex-col'>
        <Header />
        <SideNavbar />
        <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14'>
          <div className='max-w-7xl px-4 flex flex-col items-start sm:px-6 lg:px-8'>
            <Link href='/dashboard/customers' className='p-4'>
              <Button
                icon={
                  <CircleArrowLeft className='h-4 w-4 text-xs hover:text-white' />
                }
              >
                Back
              </Button>
            </Link>

            <div className='container flex items-center justify-between px-2 py-2 text-md md:text-md text-blue-500 font-semibold'>
              <h1>Search Results</h1>
            </div>
            {customers.length === 0 ? (
              <p>No Search Results</p>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {customers.map((customer) => (
                  <Card key={customer._id} customer={customer} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}

export default SearchResults
