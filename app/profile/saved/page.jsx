import Header from '@/components/Header'
import SideNavbar from '@/components/SideNavbar'
import connectDB from '@/config/db'
import User from '@/models/User'
import { getSessionUser } from '@/utils/getSession'
import BookmarkedCard from '@/components/BookmarkedCard'

const SavedCustomersPage = async () => {
  await connectDB()
  const sessionUser = await getSessionUser()

  const { bookmarks } = await User.findOne({
    email: sessionUser.user.email,
  }).populate('bookmarks')

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
          <div className='container mx-auto p-2'>
            <div className='text-md pl-2 md:text-md text-blue-500 font-semibold mb-4'>
              Saved Customer for {sessionUser.user.name}
            </div>

            <BookmarkedCard bookmarks={bookmarks} sessionUser={sessionUser} />
          </div>
        )}
      </main>
    </div>
  )
}

export default SavedCustomersPage
