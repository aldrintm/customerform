import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import SideNavbar from '@/components/SideNavbar'
import ScheduleEditForm from '@/components/ScheduleEditForm'
import Schedule from '@/models/Schedule'
import connectDB from '@/config/db'
import Customer from '@/models/Customer'
import { convertToSerializeableObject } from '@/utils/convertToObject'

const ScheduleEditPage = async ({ params, searchParams }) => {
  const { id } = await params
  const { scheduleId } = await searchParams

  console.log('Customer ID from params:', id)
  console.log('Schedule ID from searchParams:', scheduleId)

  await connectDB()

  const customerDocs = await Customer.findById(id).populate('projects').lean()

  const scheduleDocs = await Schedule.findById(scheduleId).lean()
  if (!scheduleDocs || scheduleDocs.customer.toString() !== id) notFound()

  const customer = convertToSerializeableObject(customerDocs)
  const schedule = convertToSerializeableObject(scheduleDocs)

  if (!customer) {
    return (
      <>
        <div className='flex min-h-screen w-full flex-col'>
          <Header />
          <SideNavbar />
          <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14'>
            <h1 className='text-center text-2xl font-bold mt-10'>
              Schedule Not Found or There's not created project
            </h1>
          </main>
        </div>
      </>
    )
  }

  return (
    <>
      <div className='flex min-h-screen w-full flex-col'>
        <Header />
        <SideNavbar />
        <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14'>
          <ScheduleEditForm
            customer={customer}
            projects={customer.projects}
            schedule={schedule}
          />
        </main>
      </div>
    </>
  )
}

export default ScheduleEditPage
