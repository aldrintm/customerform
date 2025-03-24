import TotalCustomer from './TotalCustomer'
import TableComponentPage from './TableComponent'
import DashboardTable from './DashboardTable'
import { Calendar, Users } from 'lucide-react'
import WeatherNow from './WeatherNow'
import DashboardTemplateSchedule from './DashboardTemplateSchedule.jsx'
import DashboardBookmarkPage from './DashboardBookmarkPage'
import DashboardScheduleDisplay from './DashboardScheduleDisplay'
import DashboardInstallScheduleDisplay from './DashboardInstallScheduleDisplay'
import { format, isSameDay, parseISO, startOfDay } from 'date-fns'
import Greeting from './Greeting'
import { formatDate } from '@/utils/formatDate'

const Dashboard = ({ customers, sessionUser, bookmarks }) => {
  const currentDate = format(new Date(), 'EEEE, MMMM dd, yyyy')

  // Get all schedules with customer information
  const processedSchedules = customers.flatMap(
    (customer) =>
      customer.projects
        ?.filter((project) => project.schedules?.length > 0)
        ?.flatMap((project) =>
          project.schedules.map((schedule) => {
            // Parse MongoDB UTC date and keep it as UTC
            const measureDate = new Date(schedule.measureDate)

            return {
              ...schedule,
              customerName: `${customer.firstName} ${customer.lastName}`,
              customerAddress: customer.address,
              customerPhone: customer.phone,
              customerEmail: customer.email,
              customerType: project.customerType,
              measureDate: measureDate, // Keep as UTC Date object
              measureBy: schedule.measureBy || 'Unassigned',
              measureTime: schedule.measureTime || 'Unassigned',
              // installDate: schedule.installDate
              //   ? new Date(schedule.installDate)
              //   : null,
              // installBy: schedule.installBy || 'Unassigned',
              // installTime: schedule.installTime || 'No time set',
            }
          })
        ) || []
  )

  // Get today's date in local timezone
  const today = startOfDay(new Date())

  // Get today's date normalized to UTC midnight
  const todayUTC = new Date(
    Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate()
    )
  )

  const todayMeasureSchedules = processedSchedules.filter((schedule) => {
    try {
      // Get schedule date as UTC midnight
      const scheduleDayUTC = new Date(
        Date.UTC(
          schedule.measureDate.getUTCFullYear(),
          schedule.measureDate.getUTCMonth(),
          schedule.measureDate.getUTCDate()
        )
      )
      // const scheduleDay = startOfDay(schedule.measureDate)
      // const isToday = isSameDay(scheduleDayUTC, todayUTC)

      // Avoid using startOfDay as it might apply local timezone
      const isToday = scheduleDayUTC.getTime() === todayUTC.getTime()

      // Debug logging with UTC formatting
      // console.log('Comparing dates:', {
      //   scheduleDay: format(scheduleDayUTC, 'yyyy-MM-dd'),
      //   today: format(todayUTC, 'yyyy-MM-dd'),
      //   isToday,
      //   originalDate: format(schedule.measureDate, 'yyyy-MM-dd'),
      //   rawMongoMeasureDate: schedule.measureDate.toISOString(),
      //   systemDate: new Date().toISOString(),
      // })

      // Debug logging with explicit UTC formatting
      console.log('Comparing dates:', {
        scheduleDay: scheduleDayUTC.toISOString().split('T')[0], // Extract date in UTC
        today: todayUTC.toISOString().split('T')[0], // Extract date in UTC
        isToday,
        originalDate: schedule.measureDate.toISOString().split('T')[0], // Extract date in UTC
        rawMongoMeasureDate: schedule.measureDate.toISOString(),
        systemDate: new Date().toISOString(),
      })

      return isToday
    } catch (error) {
      console.error('Date comparison error:', error)
      return false
    }
  })

  // console.log("Today's Schedules:", todayMeasureSchedules)

  return (
    <>
      <div className='md:container w-full mx-auto grid grid-flow-row'>
        <div className='md:container w-full text-left px-15 pl-2'>
          <div className='container text-left pl-1 py-2 text-md md:text-md text-blue-500 font-semibold'>
            {/* <span className='text-md inline-flex mr-2'>
              <Greeting /> <span className='ml-2'>{sessionUser.user.name}</span>
            </span> */}
            <h1>Welcome to Plamar USA</h1>
          </div>
        </div>
        {/* Main Components Starts Here */}
        <div className='grid lg:grid-cols-1 xl:grid-cols-12 lg:gap-6'>
          <div className='container xl:col-span-7 md:gap-4 space-y-6'>
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
            <div className='container grid grid-cols-1 md:gap-1 '>
              <div className='md:container w-full text-left px-15 pl-2'>
                <div className='container text-left pl-1 py-2 text-md md:text-md text-blue-500 font-semibold'>
                  Bookmarks
                </div>
              </div>
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
          <div className='container xl:col-span-5 space-y-6'>
            {/* <DashboardTemplateSchedule customers={customers} /> */}
            <DashboardScheduleDisplay schedules={todayMeasureSchedules} />
          </div>
        </div>
      </div>
    </>
  )
}
export default Dashboard
