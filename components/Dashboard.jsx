import TotalCustomer from './TotalCustomer'
import DateAndTime from './DateAndTime'
import TableComponentPage from './TableComponent'

const Dashboard = () => {
  return (
    <>
      <div className='container mx-auto grid grid-flow-row'>
        <div className='md:container max-w-4xl text-left px-15 pl-2'>
          <div className='container text-left pl-1 py-2 text-md md:text-md text-blue-500 font-semibold'>
            Main Dashboard
          </div>
        </div>

        <div className='hidden md:grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-4'>
          <DateAndTime />
          <div className='bg-white grid grid-cols-1 h-20 border border-gray-300 rounded-lg p-4 m-2'>
            <p className='text-sm my-auto mx-auto'>Put Current Weather Here</p>
          </div>

          <TotalCustomer />
        </div>
        <div className='hidden md:grid grid-cols-1 gap-4 lg:gap-4 py-4'>
          <div className='bg-white border border-gray-300 rounded-lg p-4 m-2'>
            <p className='text-sm my-auto mx-auto grid grid-cols-4 text-center'>
              <span className='py-auto'>Create +</span>
              <span className='py-auto'>Button</span>
              <span className='py-auto'>Button</span>
              <span className='py-auto'>Button</span>
            </p>
          </div>
        </div>
        <TableComponentPage />
      </div>
    </>
  )
}
export default Dashboard
