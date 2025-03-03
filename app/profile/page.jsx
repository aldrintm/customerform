import Header from '@/components/Header'
import SideNavbar from '@/components/SideNavbar'
import User from '@/models/User'
import { getSessionUser } from '@/utils/getSession'

const ProfilePage = async () => {
  const sessionUser = await getSessionUser()

  console.log(sessionUser)

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Header />
      <SideNavbar />
      <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14'>
        <section>
          <div className='md:container max-w-4xl px-15 mx-auto md:rounded-2xl'>
            <div className='text-left text-md pl-1 text-blue-500 font-semibold mb-4'>
              Profile Page
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-4 text-left sm:gap-6'>
              <div className='border rounded-xl p-4 col-span-1'>
                <div>
                  <p className='font-semibold text-gray-500 underline text-lg'>
                    User Profile Page
                  </p>
                </div>
              </div>
              {/* <div className='border rounded-xl p-4'>
                <div>
                  <p className='font-semibold text-gray-500 underline text-lg'>
                    Saved Customers
                  </p>
                  <p className='py-4'>
                    This is the space for user saved customers or maybe their
                    main dashboard, let's put them here first and I will sort
                    out how to place them in each individual dashboard based on
                    user session, a bit hard but I will have to manage later on.
                  </p>
                </div>
              </div> */}
              <div className='text-left border rounded-xl p-4 col-span-2'>
                <div>
                  <p className='font-semibold text-gray-500 underline text-lg'>
                    Private Messages
                  </p>
                  <p className='py-4'>Messages here ...</p>
                  <p className='py-4'>
                    Now, this is the space for every personal message between
                    users, private gossip chart, one that can be deleted and
                    also they can send each other a message - not reply.
                  </p>
                  <p className='py-4'>
                    I'm also thinking that each message will be automatically
                    deleted every 15 or 30 days so its not saved in the database
                    for optimal space savings. But this might be too much logic
                    to think about.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProfilePage
