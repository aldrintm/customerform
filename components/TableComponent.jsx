import Link from 'next/link'
import formatPhoneNumber from '@/app/actions/formatPhoneNumber'
import customerWithCapitalizedNames from '@/app/actions/customerWithCapitalizedNames'
import connectDB from '@/config/db'
import Customer from '@/models/Customer'
import Button from './Button'
import { getSession } from 'next-auth/react'
import { Plus } from 'lucide-react'

const TableComponentPage = async ({}) => {
  await connectDB()
  const customers = await Customer.find({})
    .sort({ createdAt: -1 })
    .limit(10)
    .lean()

  return (
    <section>
      <div className='md:container max-w-4xl text-left px-15 mx-auto md:rounded-2xl'>
        <div className='container flex items-center justify-between px-2 py-2 text-md md:text-md text-blue-500 font-semibold'>
          <h1>Customers List</h1>
          <Link href={`/dashboard/customers/add`}>
            <Button
              icon={<Plus className='h-4 w-4 text-xs hover:text-white' />}
            >
              Create New
            </Button>
          </Link>
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
                        <div className='px-0 py-1 text-center font-normal md:text-sm bg-green-100 text-green-500 rounded-full'>
                          will call
                        </div>
                      ) : customer.status === 'templated' ? (
                        <div className='px-0 py-1 text-center md:text-sm bg-blue-100 text-blue-500 rounded-full'>
                          templated
                        </div>
                      ) : customer.status === 'pending' ? (
                        <div className='px-0 py-1 text-center md:text-sm bg-rose-100 text-rose-500 rounded-full'>
                          pending
                        </div>
                      ) : customer.status === 'for install' ? (
                        <div className='px-0 py-1 text-center md:text-sm bg-orange-100 text-orange-500 rounded-full'>
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
                      {customer.storeName} {customer.storeId}
                    </td>

                    <td className='whitespace-nowrap px-4 py-2 text-xs font-sm'>
                      <Link
                        href={`/dashboard/customers/${customer._id}`}
                        className='inline-block rounded-full p-1 text-xs text-sky-500 border hover:ring-2 hover:ring-blue-400 hover:text-sky-500 focus:outline-none focus:ring active:text-sky-500'
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
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='container m-auto border-t'>
              <Link href={'/dashboard/customers'}>
                <p className='flex p-6 justify-center text-xs md:text-sm'>
                  view more
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const getServerSideProps = async (context) => {
  // Check for user session
  const session = await getSession({ req: context.req })

  // If no session, redirect to the home page
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
}

export default TableComponentPage
