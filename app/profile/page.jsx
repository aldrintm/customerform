import Header from '@/components/Header'
import SideNavbar from '@/components/SideNavbar'
import connectDB from '@/config/db'
import User from '@/models/User'
import { getSessionUser } from '@/utils/getSession'
import Image from 'next/image'
import { connect } from 'mongoose'
import profile from '@/app/profile.png'
import MessageCard from '@/components/MessageCard'

const ProfilePage = async () => {
  await connectDB()
  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User Id is Required')
  }

  const user = await User.findOne({ email: sessionUser.user.email })

  console.log(user)

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
            <div className='grid grid-cols-1 sm:grid-cols-4 sm:gap-6'>
              <div className='border rounded-xl p-4 col-span-1'>
                <div className='flex flex-col md:flex-row'>
                  <div className='flex mx-auto'>
                    <div className='mb-4'>
                      <Image
                        className='h-15 w-15 md:h-30 md:w-30 rounded-full mx-auto md:mx-0'
                        src={sessionUser.user.image || profile}
                        width={100}
                        height={100}
                        alt='User'
                      />
                    </div>
                  </div>
                </div>
                <div className='text-center font-semibold text-gray-500 underline text-lg'>
                  {sessionUser.user.name}
                </div>
              </div>

              <div className='text-left border rounded-xl p-4 col-span-2'>
                <div>
                  <p className='font-semibold text-gray-500 underline text-lg'>
                    Private Messages
                  </p>
                </div>

                <MessageCard />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProfilePage
