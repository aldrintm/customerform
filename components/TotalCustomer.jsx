const TotalCustomer = async ({ customers }) => {
  return (
    <section>
      <div className='bg-white flex justify-center'>
        <p className='text-md my-auto mx-auto text-gray-700 flex items-center'>
          Total Customers:{' '}
          <span className='text-md font-semibold px-4'>{customers.length}</span>
        </p>
      </div>
    </section>
  )
}

export default TotalCustomer
