const TotalCustomer = async ({ customers }) => {
  return (
    <section>
      <div className='bg-white flex justify-center'>
        <p className='text-xs lg:text-base font-semibold my-auto mx-auto text-gray-700 flex items-center'>
          Total Customers:{' '}
          <span className='text-xs lg:text-base font-semibold px-4'>
            {customers.length}
          </span>
        </p>
      </div>
    </section>
  )
}

export default TotalCustomer
