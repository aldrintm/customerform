import Link from 'next/link'
import CustomerSearchForm from '@/components/CustomerSearchForm'
import Header from '@/components/Header'
import SideNavbar from '@/components/SideNavbar'
import Button from '@/components/Button'
import connectDB from '@/config/db'
import Customer from '@/models/OldCustomer'
import { convertToSerializeableObject } from '@/utils/convertToObject'
import { CircleArrowLeft, Undo2 } from 'lucide-react'
import Card from '@/components/Card'

import formatPhoneNumber from '@/app/actions/formatPhoneNumber'
import customerWithCapitalizedNames from '@/app/actions/customerWithCapitalizedNames'

const SearchResults = async ({ searchParams: { search } }) => {
  await connectDB()

  const customerPattern = new RegExp(search, 'i')

  // Query for Customer collection
  let query = {
    $or: [
      { firstName: customerPattern },
      { lastName: customerPattern },
      { phone: customerPattern },
      { email: customerPattern },
      { 'address.street': customerPattern },
      { purchaseOrderNumber: customerPattern },
      { status: customerPattern },
    ],
  }

  const customerQueryResults = await Customer.find(query).lean()

  // console.log(customerQueryResults)
  const customers = customerQueryResults.map(convertToSerializeableObject)

  console.log(customers)

  const customersArray = Array.isArray(customers) ? customers : []

  // console.log(customersArray) <-- this isnt used because we already got an array with customers.

  return (
    <>
      <div className='flex min-h-screen w-full flex-col'>
        <Header />
        <SideNavbar />
        <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14'>
          <div className='max-w-full px-4 flex flex-col items-start sm:px-6 lg:px-8'>
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
              <div className='grid grid-cols-1 gap-6'>
                {/* Break for New Table Search Results */}
                <table className='w-full divide-y-2 divide-gray-200 bg-white text-sm'>
                  <thead className='text-left'>
                    <tr>
                      <th className='whitespace-nowrap px-4 py-3 text-sm text-gray-600 font-semibold'>
                        Customer
                      </th>
                      <th className='whitespace-nowrap px-4 py-3 font-sm text-gray-600'>
                        Status
                      </th>
                      <th className='whitespace-nowrap px-4 py-3 text-center font-sm text-gray-600'>
                        Address
                      </th>

                      <th className='whitespace-nowrap px-4 py-3 pl-8 font-sm text-gray-600'>
                        Phone/Email
                      </th>

                      <th className='whitespace-nowrap px-4 py-3 font-sm text-gray-600'>
                        Store
                      </th>

                      <th className='whitespace-nowrap px-4 py-3 font-sm text-gray-600'>
                        View
                      </th>
                      <th className='whitespace-nowrap px-4 py-3 font-sm text-gray-600'>
                        PO#'s'
                      </th>
                      <th className='whitespace-nowrap px-4 py-3 font-sm text-gray-600'>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    {customers.map((customer) => (
                      <tr key={customer._id}>
                        <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                          {customerWithCapitalizedNames(customer.lastName)}{' '}
                          {customerWithCapitalizedNames(customer.firstName)}
                        </td>

                        <td className='whitespace-nowrap px-0 py-0 text-sm'>
                          {customer.status === 'will call' ? (
                            <div className='px-0 py-1 text-center md:text-sm bg-green-100 text-green-500 rounded-full'>
                              will call
                            </div>
                          ) : customer.status === 'for template' ? (
                            <div className='px-0 py-1 text-center md:text-sm bg-blue-100 text-blue-500 rounded-full'>
                              for template
                            </div>
                          ) : customer.status === 'pending' ? (
                            <div className='px-0 py-1 text-center md:text-sm bg-rose-100 text-rose-500 rounded-full'>
                              pending
                            </div>
                          ) : customer.status === 'for install' ? (
                            <div className='px-0 py-1 text-center md:text-sm bg-orange-100 text-orange-500 rounded-full'>
                              for install
                            </div>
                          ) : customer.status === 'service' ? (
                            <div className='px-0 py-1 text-center md:text-sm bg-indigo-100 text-indigo-500 rounded-full'>
                              service
                            </div>
                          ) : customer.status === 'completed' ? (
                            <div className='px-0 py-1 text-center md:text-sm bg-cyan-100 text-cyan-500 rounded-full'>
                              completed
                            </div>
                          ) : null}
                        </td>

                        <td className='whitespace-nowrap px-4 py-2 pl-8 text-sm text-gray-700'>
                          <div className='grid grid-rows-2'>
                            <p>{customer.address.street}</p>
                            <p>
                              {customer.address.city} {customer.address.state}{' '}
                              {customer.address.zipcode}
                            </p>
                          </div>
                        </td>
                        <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                          <div className='grid grid-rows-2'>
                            <p>{customer.email}</p>
                            <p>{formatPhoneNumber(customer.phone)}</p>
                          </div>
                        </td>

                        <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                          {customer.storeName} {customer.storeId}
                        </td>

                        <td className='whitespace-nowrap px-4 py-2 text-sm'>
                          <Link
                            href={`/dashboard/customers/${customer._id}`}
                            className='inline-block rounded-full p-1 text-sm text-sky-500 border hover:ring-2 hover:ring-blue-400 hover:text-sky-500 focus:outline-none focus:ring active:text-sky-500'
                          >
                            <span className='text-xs font-sm'>
                              <svg
                                className='size-5 rtl:rotate-180'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='1.5'
                                  d='M17 8l4 4m0 0l-4 4m4-4H3'
                                />
                              </svg>
                              {/* <Eye className='h-4 w-4 text-xs text-blue-500 text-bold' /> */}
                            </span>
                          </Link>
                        </td>
                        <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                          <div className='grid grid-flow-row'>
                            <p>{customer.purchaseOrderNumber}</p>
                          </div>
                        </td>
                        <td className='whitespace-nowrap px-4 py-2 text-sm'>
                          <div className='flex gap-3'>
                            <Link
                              href={`/dashboard/customers/${customer._id}/edit`}
                            >
                              <Button>Edit</Button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}

export default SearchResults
