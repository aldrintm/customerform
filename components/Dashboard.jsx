import TotalCustomer from './TotalCustomer'
import DateAndTime from './DateAndTime'
import TableComponentPage from './TableComponent'
import DashboardTable from './DashboardTable'
import { Calendar, Users } from 'lucide-react'
import WeatherNow from './WeatherNow'
import DashboardTemplateSchedule from './DashboardTemplateSchedule.jsx'
import DashboardBookmarkPage from './DashboardBookmarkPage'
import DashboardScheduleDisplay from './DashboardScheduleDisplay'
import { format, isSameDay, parseISO, startOfDay } from 'date-fns'

const Dashboard = ({ customers, sessionUser, bookmarks }) => {
  const currentDate = format(new Date(), 'EEEE, MMMM dd, yyyy')

  // Get customer with all schedules
  // const customerWithSchedules = customers.map((customer) => {
  //   const schedules =
  //     customer.projects?.flatMap((project) => project.schedules || []) || []
  //   return { ...customer, schedules }
  // })

  // Get all projects with schedules
  const projectWithSchedules = customers.flatMap(
    (customer) =>
      customer.projects?.filter((project) => project.schedules?.length > 0) ||
      []
  )

  // const processedSchedules = projectWithSchedules.map((project) => {
  //   const schedules = project.schedules.map((schedule) => ({
  //     ...schedule,
  //     customerName: `${project.customer.firstName} ${project.customer.lastName}`,
  //     customerAddress: project.customer.address,
  //     customerPhone: project.customer.phone,
  //     customerEmail: project.customer.email,
  //     scheduleDate: format(new Date(schedule.measureDate), 'MM/dd/yyyy'),
  //     measureBy: schedule.measureBy || 'Unassigned',
  //     measureTime: schedule.measureTime || 'Unassigned',
  //   }))
  //   return { ...project, schedules }
  //   console.log(schedules)
  // })

  // Get all schedules with customer information
  const processedSchedules = customers.flatMap(
    (customer) =>
      customer.projects
        ?.filter((project) => project.schedules?.length > 0)
        ?.flatMap((project) =>
          project.schedules.map((schedule) => ({
            ...schedule,
            customerName: `${customer.firstName} ${customer.lastName}`,
            customerAddress: customer.address,
            customerPhone: customer.phone,
            customerEmail: customer.email,
            customerType: project.customerType,
            scheduleDate: format(new Date(schedule.measureDate), 'MM/dd/yyyy'),
            measureBy: schedule.measureBy || 'Unassigned',
            measureTime: schedule.measureTime || 'Unassigned',
          }))
        ) || []
  )
  // Debug raw dates
  console.log(
    'Raw schedule dates:',
    processedSchedules.map((s) => s.measureDate)
  )

  // Filter schedules for current day with better date handling
  const today = startOfDay(new Date())
  console.log('Today is:', today)
  const todaySchedules = processedSchedules.filter((schedule) => {
    try {
      const scheduleDate = startOfDay(parseISO(schedule.measureDate))

      const isToday = isSameDay(scheduleDate, today)
      console.log('Comparing dates:', {
        scheduleDate,
        today,
        isToday,
      })
      return isToday
    } catch (error) {
      console.error('Date parsing error:', error)
      return false
    }
  })

  console.log("Today's Schedules:", todaySchedules)

  // Get all schedules with customer information
  // const processedSchedules = allSchedules.map((schedule) => {
  //   const customer = customers.find(
  //     (customer) => customer._id === schedule.customerId
  //   )
  //   return {
  //     ...schedule,
  //     customerName: customer
  //       ? `${customer.firstName} ${customer.lastName}`
  //       : '',
  //   }
  // })

  return (
    <>
      <div className='md:container w-full mx-auto grid grid-flow-row'>
        <div className='md:container w-full text-left px-15 pl-2'>
          <div className='container text-left pl-1 py-2 text-md md:text-md text-blue-500 font-semibold'>
            Main Dashboard
          </div>
        </div>
        {/* Main Components Starts Here */}
        <div className='grid lg:grid-cols-1 xl:grid-cols-12 lg:gap-6'>
          <div className='container xl:col-span-8 md:gap-4 space-y-6'>
            {/* Date + Weather + Total Customers */}
            <div className='hidden container sm:grid gap-4 sm:grid-cols-3 lg:gap-6'>
              <div className='flex justify-center items-center gap-2 px-2 bg-white border border-gray-300 rounded-lg'>
                <Calendar className='w-4 h-4 lg:w-6 lg:h-6 text-blue-500' />
                <span className='text-xs lg:text-base font-semibold text-gray-700'>
                  {currentDate}
                </span>
              </div>
              <div className='flex justify-center items-center gap-2 bg-white border border-gray-300 rounded-lg'>
                <WeatherNow />
              </div>
              <div className='flex justify-center items-center gap-2 px-2 bg-white border border-gray-300 rounded-lg'>
                <Users className='w-4 h-4 lg:w-6 lg:h-6 text-blue-500' />
                <TotalCustomer customers={customers} />
              </div>
            </div>

            {/* Feature Box Here - Problem Customers */}
            <div className='container grid grid-cols-1 md:gap-6 '>
              <div className='flex justify-center items-center gap-2 md:gap-4'>
                <DashboardBookmarkPage
                  bookmarks={bookmarks}
                  sessionUser={sessionUser}
                />
              </div>
            </div>
            {/* Customer Dashboard Table Here - Snapshot */}
            <div className='lg:gap-4'>
              <div className='container col-span-8'>
                <DashboardTable customers={customers} />
              </div>
            </div>
          </div>
          <div className='container xl:col-span-4 space-y-6'>
            {/* <DashboardTemplateSchedule customers={customers} /> */}
            <DashboardScheduleDisplay schedules={processedSchedules} />
            <div className='border border-gray-300 rounded-lg p-4 h-96 flex items-center justify-center bg-emerald-100'></div>
            <div className=' border border-gray-300 rounded-lg p-4 h-[27rem] flex items-center justify-center bg-teal-100'>
              Waiting for Codeblock Above
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Dashboard
