'use server'

import connectDB from '@/config/db'
import Customer from '@/models/Customer'
import SideNavbar from '@/components/SideNavbar'
import Project from '@/models/Project'
import Header from '@/components/Header'
import Dashboard from '@/components/Dashboard'
import User from '@/models/User'
import { getSessionUser } from '@/utils/getSession'
import { convertToSerializeableObject } from '@/utils/convertToObject'

const DashboardPage = async () => {
  await connectDB()

  const sessionUser = await getSessionUser()

  const customerDocs = await Customer.find({})
    .sort({ createdAt: -1 })
    .populate('projects')
    .lean()

  const { bookmarks } = await User.findOne({
    email: sessionUser.user.email,
  }).populate('bookmarks')

  const customers = customerDocs.map(convertToSerializeableObject)

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <SideNavbar />
      <Header />
      <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14'>
        <Dashboard
          customers={customers}
          sessionUser={sessionUser}
          bookmarks={bookmarks}
        />
      </main>
    </div>
  )
}

export default DashboardPage
