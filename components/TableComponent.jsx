import connectDB from '@/config/db'
import Customer from '@/models/Customer'
import Link from 'next/link'
import formatPhoneNumber from '@/app/actions/formatPhoneNumber'
import customerWithCapitalizedNames from '@/app/actions/customerWithCapitalizedNames'
import { Eye } from 'lucide-react'

const TableComponentPage = async ({ params }) => {
  await connectDB()
  const customers = await Customer.find({}).lean()

  return (
    <section>
      <div className='md:container max-w-4xl text-left px-15 mx-auto md:rounded-2xl'>
        <div className='container text-left pl-2 py-2 text-md md:text-md text-blue-500 font-semibold'>
          Customers List
        </div>
        <div className='container mx-auto px-4 m-6 border border-gray-300 rounded-lg'>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
              <thead className='text-left'>
                <tr>
                  <th className='whitespace-nowrap px-4 py-2 text-sm text-gray-700 font-semibold'>
                    First Name
                  </th>
                  <th className='whitespace-nowrap px-4 py-2 font-sm text-gray-700'>
                    Last Name
                  </th>
                  <th className='whitespace-nowrap px-4 py-2 text-center font-sm text-gray-700'>
                    Status
                  </th>

                  <th className='whitespace-nowrap px-4 py-2 pl-8 font-sm text-gray-700'>
                    Address
                  </th>
                  <th className='whitespace-nowrap px-4 py-2 font-sm text-gray-700'>
                    Phone
                  </th>
                  {/* <th className='whitespace-nowrap px-4 py-2 font-sm text-gray-700'>
                    Email
                  </th> */}

                  <th className='whitespace-nowrap px-4 py-2 font-sm text-gray-700'>
                    Store
                  </th>

                  <th className='px-4 py-2'>View</th>
                </tr>
              </thead>

              <tbody className='divide-y divide-gray-200'>
                {customers.map((customer) => (
                  <tr key={customer._id}>
                    <td className='whitespace-nowrap px-4 py-2 text-xs font-sm text-gray-700'>
                      {customerWithCapitalizedNames(customer.firstName)}
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-xs font-sm text-gray-700'>
                      {customerWithCapitalizedNames(customer.lastName)}
                    </td>
                    <td className='whitespace-nowrap px-0 py-0 text-xs font-sm'>
                      {customer.status === 'will call' ? (
                        <div className='px-0 py-2 text-center md:text-sm bg-green-100 text-green-400 rounded-full'>
                          will call
                        </div>
                      ) : customer.status === 'templated' ? (
                        <div className='px-0 py-2 text-center md:text-sm bg-blue-100 text-blue-400 rounded-full'>
                          templated
                        </div>
                      ) : customer.status === 'pending' ? (
                        <div className='px-0 py-2 text-center md:text-sm bg-rose-100 text-rose-400 rounded-full'>
                          pending
                        </div>
                      ) : customer.status === 'for install' ? (
                        <div className='px-0 py-2 text-center md:text-sm bg-orange-100 text-orange-400 rounded-full'>
                          for install
                        </div>
                      ) : null}
                    </td>

                    <td className='whitespace-nowrap px-4 py-2 pl-8 text-xs font-sm text-gray-700'>
                      <div className='grid grid-rows-2'>
                        <p>{customer.address.street}</p>
                        <p>
                          {customer.address.city} {customer.address.state}{' '}
                          {customer.address.zipcode}
                        </p>
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-xs font-sm text-gray-700'>
                      <div className='grid grid-rows-2'>
                        <p>{customer.email}</p>
                        <p>{formatPhoneNumber(customer.phone)}</p>
                      </div>
                    </td>

                    {/* <td className='whitespace-nowrap px-4 py-2 text-xs font-sm text-gray-700'>
                      {customer.email}
                    </td> */}
                    <td className='whitespace-nowrap px-4 py-2 text-xs font-sm text-gray-700'>
                      {customer.storeId}
                    </td>

                    <td className='whitespace-nowrap px-4 py-2 text-xs font-sm'>
                      <Link
                        href={`/customers/${customer._id}`}
                        className='inline-block rounded-md px-2 py-1 text-xs text-white border hover:border hover:border-blue-400 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'
                      >
                        <span className='text-xs font-sm'>
                          {/* <svg
                            className='size-5 rtl:rotate-180'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1'
                              d='M17 8l4 4m0 0l-4 4m4-4H3'
                            />
                          </svg> */}
                          <Eye className='h-4 w-4 text-xs text-blue-500 text-bold' />
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TableComponentPage
