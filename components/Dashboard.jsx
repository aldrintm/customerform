import TotalCustomer from './TotalCustomer'
import DateAndTime from './DateAndTime'
import TableComponentPage from './TableComponent'
import DashboardTable from './DashboardTable'
import { format } from 'date-fns'
import { Calendar, Users } from 'lucide-react'
import WeatherNow from './WeatherNow'
import DashboardTemplateSchedule from './DashboardTemplateSchedule.jsx'
import DashboardBookmarkPage from './DashboardBookmarkPage'

const Dashboard = ({ customers, sessionUser, bookmarks }) => {
  const currentDate = format(new Date(), 'EEEE, MMMM dd, yyyy')

  console.log(currentDate)

  return (
    <>
      <div className='container mx-auto grid grid-flow-row'>
        <div className='md:container max-w-4xl text-left px-15 pl-2'>
          <div className='container text-left pl-1 py-2 text-md md:text-md text-blue-500 font-semibold'>
            Main Dashboard
          </div>
        </div>
        {/* Main Components Starts Here */}
        <div className='hidden md:grid xl:grid-cols-12 lg:gap-4'>
          <div className='container col-span-8 md:gap-4 space-y-6'>
            {/* Date + Weather + Total Customers */}
            <div className='container px-2 grid grid-cols-3 lg:gap-6'>
              <div className='flex justify-center items-center gap-2 bg-white border border-gray-300 rounded-lg'>
                <Calendar className='w-6 h-6 text-blue-500' />
                <span className='text-md font-semibold text-gray-700'>
                  {currentDate}
                </span>
              </div>
              <div className='flex justify-center items-center gap-2 bg-white border border-gray-300 rounded-lg'>
                <WeatherNow />
              </div>
              <div className='flex justify-center items-center gap-2 bg-white border border-gray-300 rounded-lg'>
                <Users className='w-6 h-6 text-blue-500' />
                <TotalCustomer customers={customers} />
              </div>
            </div>

            {/* Feature Box Here - Problem Customers */}
            <div className='container px-2 grid grid-cols-1 md:gap-6 '>
              <div className='flex justify-center items-center gap-2 md:gap-4'>
                <DashboardBookmarkPage
                  bookmarks={bookmarks}
                  sessionUser={sessionUser}
                />
              </div>
            </div>
            {/* Customer Dashboard Table Here - Snapshot */}
            <div className='lg:gap-4'>
              <div className='container px-2 col-span-8'>
                <DashboardTable customers={customers} />
              </div>
            </div>
          </div>
          <div className='container col-span-4 space-y-6'>
            {/* <DashboardTemplateSchedule customers={customers} /> */}
            <div className='border border-gray-300 rounded-lg p-4 h-96 flex items-center justify-center bg-emerald-100'>
              Logic Error :(
            </div>
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
