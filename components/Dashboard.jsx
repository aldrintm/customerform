import TotalCustomer from './TotalCustomer'
import DateAndTime from './DateAndTime'
import TableComponentPage from './TableComponent'
import DashboardTable from './DashboardTable'
import { format } from 'date-fns'
import { Calendar, Users } from 'lucide-react'
import WeatherNow from './WeatherNow'
import DashboardTemplateSchedule from './DashboardTemplateSchedule.jsx'

const Dashboard = ({ customers }) => {
  const currentDate = format(new Date(), 'EEEE, MMMM dd, yyyy')

  return (
    <>
      <div className='container mx-auto grid grid-flow-row'>
        <div className='md:container max-w-4xl text-left px-15 pl-2'>
          <div className='container text-left pl-1 py-2 text-md md:text-md text-blue-500 font-semibold'>
            Main Dashboard
          </div>
        </div>
        {/* Main Components Starts Here */}
        <div className='hidden md:grid md:grid-cols- xl:grid-cols-12 lg:gap-4'>
          <div className='container px-2 col-span-8'>
            {/* Date + Weather + Total Customers */}
            <div className='container px-2 grid grid-cols-3 lg:gap-6'>
              <div className='flex justify-center items-center gap-2 bg-white border border-gray-300 rounded-lg shadow-sm'>
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
            <div className='hidden md:grid md:grid-cols-1 py-4'>
              <div className='col-span-8 bg-white border border-gray-300 rounded-lg p-4 m-2'>
                <p className='text-sm my-auto mx-auto grid grid-cols-4 text-center'>
                  <span className='py-auto'>Create +</span>
                  <span className='py-auto'>Button</span>
                  <span className='py-auto'>Button</span>
                  <span className='py-auto'>Button</span>
                </p>
              </div>
            </div>
            {/* Customer Dashboard Table Here - Snapshot */}
            <div className='lg:gap-4'>
              <div className='container px-2 col-span-8'>
                <DashboardTable customers={customers} />
              </div>
            </div>
          </div>
          <div className='container px-2 col-span-4'>
            <DashboardTemplateSchedule customers={customers} />
          </div>
        </div>
      </div>
    </>
  )
}
export default Dashboard
