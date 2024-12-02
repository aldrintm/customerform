import connectDB from '@/config/db'
import Customer from '@/models/Customer'

const TotalCustomer = async () => {
  await connectDB()
  const newCustomer = await Customer.find({}).lean()

  return (
    <section>
      <div className='bg-white grid grid-cols-1 h-20 border border-gray-300 rounded-lg p-4 m-2'>
        <p className='text-sm my-auto mx-auto text-gray-700 flex items-center'>
          Total Customers:{' '}
          <span className='font-md text-xl px-4'>{newCustomer.length}</span>
        </p>
      </div>
    </section>
  )
}

export default TotalCustomer
