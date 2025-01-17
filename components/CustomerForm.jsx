import addCustomer from '@/app/actions/addCustomer'
import Link from 'next/link'

const NewCustomerForm = () => {
  return (
    <section className='bg-white'>
      <div className='container max-w-4xl mx-auto px-15 md:rounded-2xl'>
        <div className='mx-auto text-left py-2 pl-1 text-sm md:text-md text-blue-500 font-bold'>
          New Customer Details
        </div>

        <div className='isolate px-4 sm:pb-2 lg:px-0'>
          {/* Form Starts Here */}
          <form
            action={addCustomer}
            className='container mx-auto my-4 justify-center'
          >
            <div className='grid grid-cols-1 gap-4 lg:gap-6 pb-2'>
              {/* Left Side of Form Column */}

              <div className='grid grid-cols-1 gap-4 lg:row-auto lg:gap-4 bg-white p-4 md:border border-gray-300 md:rounded-md'>
                {/* First Name and Last Name */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 px-4 lg:gap-x-6'>
                  {/* First Name */}
                  <div>
                    <label
                      htmlFor='First Name'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      First Name
                    </label>

                    <input
                      type='text'
                      id='firstName'
                      name='firstName'
                      required
                      placeholder='First name'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      htmlFor='Last Name'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Last Name
                    </label>

                    <input
                      type='text'
                      id='lastName'
                      name='lastName'
                      required
                      placeholder='Last name'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                </div>

                {/* Phone and Email */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 px-4 lg:gap-x-6'>
                  {/* Phone */}
                  <div>
                    <label
                      htmlFor='Phone'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Phone
                    </label>

                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      required
                      placeholder='(408) xxx xxxx'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor='Email'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Email
                    </label>

                    <input
                      type='email'
                      id='email'
                      name='email'
                      required
                      placeholder='Email'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                </div>

                {/* Address */}
                <div className='grid grid-cols-1 gap-4 px-4 lg:gap-x-6'>
                  {/* Street Address */}
                  <div>
                    <label
                      htmlFor='Street Address'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Street Address
                    </label>

                    <input
                      type='text'
                      id='street'
                      name='street'
                      required
                      placeholder='Example: 33100 Transit Ave.'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                </div>

                {/* City + State + Zipcode */}
                <div className='grid grid-cols-1 gap-4 md:gap-x-4 md:grid-cols-8 px-4 lg:gap-x-6'>
                  {/* City */}
                  <div className='md:col-span-5'>
                    <label
                      htmlFor='City'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      City
                    </label>

                    <input
                      type='text'
                      id='city'
                      name='city'
                      required
                      placeholder='City'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>

                  {/* State */}
                  <div className='md:col-span-1'>
                    <label
                      htmlFor='State'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      State
                    </label>

                    <input
                      type='text'
                      id='state'
                      name='state'
                      defaultValue='CA'
                      readOnly
                      className='mt-1 w-full rounded-md border-gray-200 text-gray-500 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>

                  {/* Zipcode */}
                  <div className='md:col-span-2'>
                    <label
                      htmlFor='Zipcode'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Zipcode
                    </label>

                    <input
                      type='number'
                      id='zipcode'
                      name='zipcode'
                      required
                      placeholder='Zipcode'
                      className='block mt-1 w-full rounded-md border-gray-200 focus-bg-white shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                </div>

                {/* Contractor Info */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-4 lg:gap-x-6'>
                  {/* Contractor Name */}
                  <div>
                    <label
                      htmlFor='Contractor Name'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Contractor Name
                    </label>

                    <input
                      type='text'
                      id='contractorName'
                      name='contractorName'
                      placeholder='Name of contractor or on-site contact'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>

                  {/* Contractor Phone */}
                  <div>
                    <label
                      htmlFor='contractorPhone'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Contractor Phone
                    </label>

                    <input
                      type='tel'
                      id='contractorPhone'
                      name='contractorPhone'
                      placeholder='Contractor or on-site contact'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                  <div className='lg:col-span-2 content-end pb-2'>
                    <span className=''>
                      <button
                        className='w-full items-center gap-2 rounded-lg border border-blue-600 bg-blue-600 px-8 py-2 text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'
                        type='submit'
                      >
                        Submit
                      </button>
                    </span>
                  </div>
                </div>
              </div>

              {/* Break */}
              {/* Break */}
              {/* Break */}
            </div>

            {/* Break */}
            {/* Break */}
            {/* Break */}
          </form>
        </div>
      </div>
    </section>
  )
}
export default NewCustomerForm
