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
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6 text-left'>
          {limitedBookmarks.map((customer) => (
            <div key={customer._id}>
              <Link
                href={`/dashboard/customers/${customer._id}`}
                className='inline-flex items-center py-1.5 text-sm font-light text-white bg-white rounded-md transition-colors'
              >
                <div
                  key={customer._id}
                  className='flex w-full h-full bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow'
                >
                  <div className={`w-2 ${getRandomColor()} rounded-l-lg`}>
                    <span></span>
                  </div>

                  <div className='flex-1 px-5 py-3'>
                    <h3 className='text-xs font-semibold text-gray-700'>
                      {customerWithCapitalizedNames(customer.firstName)}{' '}
                      {customerWithCapitalizedNames(customer.lastName)}
                    </h3>
                    <p className='text-xs text-gray-600 md:text-xs'>
                      {customer.address.street}, {customer.address.city}{' '}
                      {customer.address.state} {customer.address.zipcode}
                    </p>
                    <p className='text-xs text-gray-600 md:text-sm'>
                      {formatPhoneNumber(customer.phone)}
                    </p>
                    <p className='text-xs text-gray-600 md:text-sm'>
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
