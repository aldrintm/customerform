import connectDB from '@/config/db'
import Customer from '@/models/Customer'
import Link from 'next/link'

const TableComponentPage = async ({ params }) => {
  await connectDB()
  const customers = await Customer.find({}).lean()
  return (
    <section>
      <div className='container mx-auto p-6 m-6 border border-gray-300 rounded-lg'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
            <thead className='text-left'>
              <tr>
                <th className='whitespace-nowrap px-4 py-2 font-sm text-gray-900'>
                  First Name
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-sm text-gray-900'>
                  Last Name
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-sm text-gray-900'>
                  Address
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-sm text-gray-900'>
                  Phone
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-sm text-gray-900'>
                  Email
                </th>
                <th className='px-4 py-2'></th>
              </tr>
            </thead>

            <tbody className='divide-y divide-gray-200'>
              {customers.map((customer) => (
                <tr key={customer._id}>
                  <td className='whitespace-nowrap px-4 py-2 font-sm text-gray-900'>
                    {customer.firstName}
                  </td>
                  <td className='whitespace-nowrap px-4 py-2 font-sm text-gray-900'>
                    {customer.lastName}
                  </td>
                  <td className='whitespace-nowrap px-4 py-2 font-sm text-gray-700'>
                    {customer.address.street} {customer.address.city}{' '}
                    {customer.address.state} {customer.address.zipcode}
                  </td>
                  <td className='whitespace-nowrap px-4 py-2 font sm text-gray-700'>
                    {customer.phone}
                  </td>
                  <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                    {customer.email}
                  </td>
                  <td className='whitespace-nowrap px-4 py-2'>
                    <Link
                      href={`/customers/${customer._id}`}
                      className='inline-block rounded-md bg-blue-600 px-2 py-1 text-xs text-white border hover:border hover:border-blue-400 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'
                    >
                      <span className='text-sm font-medium'>
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
                            strokeWidth='1'
                            d='M17 8l4 4m0 0l-4 4m4-4H3'
                          />
                        </svg>
                      </span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default TableComponentPage
