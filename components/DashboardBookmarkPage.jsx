import Link from 'next/link'
import formatPhoneNumber from '@/app/actions/formatPhoneNumber'
import customerWithCapitalizedNames from '@/app/actions/customerWithCapitalizedNames'

const DashboardBookmarkPage = ({ bookmarks, sessionUser }) => {
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

  const limitedBookmarks = bookmarks.slice(0, 3)

  return (
    <>
      {bookmarks.length === 0 ? (
        <div className='text-center text-gray-600'>
          There's no saved customers to show
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6 w-full'>
          {limitedBookmarks.map((customer) => (
            <div key={customer._id} className='w-full'>
              <Link
                href={`/dashboard/customers/${customer._id}`}
                className='block w-full h-full'
              >
                <div className='flex w-full h-full bg-white rounded-lg'>
                  <div className={`w-2 ${getRandomColor()} rounded-l-lg`}>
                    <span></span>
                  </div>

                  <div className='flex-1 bg-white md:px-3 md:py-2 border border-gray-300 rounded-r-lg transition-all duration-300 ease-in-out hover:shadow-md'>
                    <p className='text-xs font-semibold text-gray-700 md:text-sm'>
                      {customerWithCapitalizedNames(customer.firstName)}{' '}
                      {customerWithCapitalizedNames(customer.lastName)}
                    </p>
                    <p className='text-xs text-gray-600 md:text-xs'>
                      {customer.address.street}, {customer.address.city}
                    </p>
                    <p className='text-xs text-gray-600 md:text-xs'>
                      {formatPhoneNumber(customer.phone)}
                    </p>
                    <p className='text-xs text-gray-600 md:text-xs'>
                      {customer.email}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default DashboardBookmarkPage
