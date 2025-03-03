import Header from '@/components/Header'
import SideNavbar from '@/components/SideNavbar'
import connectDB from '@/config/db'
import User from '@/models/User'
import { getSessionUser } from '@/utils/getSession'
import Link from 'next/link'
import Button from '@/components/Button'
import { EyeIcon } from 'lucide-react'
import formatPhoneNumber from '@/app/actions/formatPhoneNumber'
import customerWithCapitalizedNames from '@/app/actions/customerWithCapitalizedNames'

const SavedCustomersPage = async () => {
  await connectDB()
  const sessionUser = await getSessionUser()

  const { bookmarks } = await User.findOne({
    email: sessionUser.user.email,
  }).populate('bookmarks')

  // Predefined array of Tailwind color classes
  const dividerColors = [
    'bg-red-400',
    'bg-blue-400',
    'bg-green-400',
    'bg-yellow-400',
    'bg-purple-400',
    'bg-pink-400',
    'bg-teal-400',
    'bg-orange-400',
  ]

  // Function to get a random color from the array
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * dividerColors.length)
    return dividerColors[randomIndex]
  }

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Header />
      <SideNavbar />
      <main className='flex-1 sm:gap-4 sm:py-0 sm:px-0 sm:pl-14'>
        {bookmarks.length === 0 ? (
          <div className='text-center text-gray-600'>
            There's no saved customers to show
          </div>
        ) : (
          <>
            <div className='container mx-auto p-2'>
              <div className='text-md pl-2 md:text-md text-blue-500 font-semibold mb-4'>
                Saved Customer for {sessionUser.user.name}
              </div>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6'>
                {bookmarks.map((customer) => (
                  <div key={customer._id}>
                    <Link
                      href={`/dashboard/customers/${customer._id}`}
                      className='inline-flex items-center py-1.5 text-sm font-medium text-white bg-white rounded-md transition-colors'
                    >
                      <div
                        key={customer._id}
                        className='flex w-full h-full bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow'
                      >
                        <div className={`w-2 ${getRandomColor()} rounded-l-lg`}>
                          <span></span>
                        </div>

                        <div className='flex-1 px-4 py-3'>
                          <h3 className='text-lg font-semibold text-gray-700'>
                            {customerWithCapitalizedNames(customer.firstName)}{' '}
                            {customerWithCapitalizedNames(customer.lastName)}
                          </h3>
                          <p className='text-sm text-gray-600'>
                            {customer.address.street}, {customer.address.city}{' '}
                            {customer.address.state} {customer.address.zipcode}
                          </p>
                          <p className='text-sm text-gray-600'>
                            {formatPhoneNumber(customer.phone)}
                          </p>
                          <p className='text-sm text-gray-600'>
                            {customer.email}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default SavedCustomersPage
