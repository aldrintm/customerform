const TotalCustomer = async ({ customers }) => {
  return (
    <section>
      <div className='bg-white flex justify-center'>
        <p className='text-lg my-auto mx-auto text-gray-700 flex items-center'>
          Total Customers:{' '}
          <span className='font-md text-xl px-4'>{customers.length}</span>
        </p>
      </div>
    </section>
  )
}

export default TotalCustomer
