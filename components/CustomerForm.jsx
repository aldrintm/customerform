const NewCustomerForm = () => {
  return (
    <section className='bg-white mx-auto px-2 h-screen'>
      <div className='md:container max-w-4xl mx-auto text-left mt-20 px-15 rounded-2xl'>
        <div className='mx-auto text-center pt-4 pb-4 text-2xl md:text-4xl text-blue-500 font-bold'>
          Customer Details
          <p className='text-center text-base md:text2xl px-2 text-gray-600 font-bold'>
            (fill out all the forms)
          </p>
        </div>

        {/* Divider to Form */}
        <span className='flex items-center px-8 pb-2'>
          <span className='h-px flex-1 bg-gray-500'></span>
        </span>

        <div className='isolate bg-white px-6 py-1 sm:py-1 lg:px-8'>
          <div
            aria-hidden='true'
            className='absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]'
          >
            <div
              hidden
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]'
            />
          </div>

          {/* Form Starts Here */}
          <form className='container mx-auto my-2 justify-center'>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-4 pb-2'>
              {/* Left Side of Form Column */}

              <div className='grid grid-cols-1 gap-4 lg:row-auto lg:gap-4 bg-white py-6 border rounded-md shadow-md'>
                {/* First Name and Last Name */}
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 px-4 lg:gap-x-6'>
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
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-[#F7FAFC]'
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
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 px-4 lg:gap-x-6'>
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
                      id='address'
                      name='address'
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
                      disabled
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
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
                      type='text'
                      id='email'
                      name='email'
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
                      id='contractor_name'
                      name='contractor_name'
                      placeholder='Name of contractor or on-site contact'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>

                  {/* Contractor Phone */}
                  <div>
                    <label
                      htmlFor='contractor_phone'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Contractor Phone
                    </label>

                    <input
                      type='text'
                      id='contractor_phone'
                      name='contractor_phone'
                      placeholder='Contractor or on-site contact'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                </div>
              </div>

              {/* Break */}
              {/* Break */}
              {/* Break */}

              {/* Right Side of the Form Column */}
              <div className='grid grid-cols-1 gap-4 lg:grid-rows-auto lg:gap-4 bg-white py-6 border rounded-md shadow-md'>
                {/* Purchase Order + Store ID */}
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 px-4 lg:gap-x-6'>
                  {/* Purchase Order */}
                  <div className='p-0'>
                    <label
                      htmlFor='purchaseOrder'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Purchase Order
                    </label>

                    <input
                      type='text'
                      id='purchaseOrder'
                      name='purchaseOrder'
                      placeholder='Purchase Order #'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>

                  {/* Store ID */}
                  <div>
                    <label
                      htmlFor='storeId'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      {' '}
                      Store Id{' '}
                    </label>

                    <select
                      name='storeId'
                      id='storeId'
                      className='mt-1 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                      defaultValue={'DEFAULT'}
                    >
                      <option value='DEFAULT' disabled>
                        Choose store name and id
                      </option>
                      <option value='Home Depot'>Home Depot</option>
                      <option value='HDI'>HDI</option>
                      <option value='Direct'>Direct</option>
                      <option value='Builder'>Builder</option>
                      <option value='KandB'>Kitchen and Bath</option>
                    </select>
                  </div>
                </div>

                {/* PO Date and Amount Paid */}
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-12 px-4 lg:gap-x-6'>
                  {/* Purchase Order Date */}
                  <div className='col-span-4'>
                    <label
                      htmlFor='purchaseOrderDate'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Date customer paid?
                    </label>

                    <input
                      type='date'
                      id='purchaseOrderDate'
                      name='purchaseOrderDate'
                      placeholder='Purchase order date'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>

                  {/* Purchase Order Amount */}
                  <div className='col-span-4'>
                    <label
                      htmlFor='purchaseOrderAmount'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Purchase Order Amount
                    </label>

                    <input
                      type='text'
                      name='purchaseOrderAmount'
                      id='purchaseOrderAmount'
                      placeholder='How much did the customer paid?'
                      className='mt-1 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                    />
                  </div>

                  {/* Square Feet */}
                  <div className='col-span-4'>
                    <label
                      htmlFor='squareFeet'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Paid Sq Ft.
                    </label>

                    <input
                      type='text'
                      id='squareFeet'
                      name='squareFeet'
                      placeholder='How many SqFt?'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                </div>

                {/* Purchase Order Info - Material Brand + Thickness + Color */}
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-12 px-4 lg:gap-x-6'>
                  {/* Material Type */}
                  <div className='col-span-3'>
                    <label
                      htmlFor='materialType'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Type
                    </label>

                    <select
                      id='materialType'
                      name='materialType'
                      defaultValue={'default'}
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    >
                      <option value='default' disabled>
                        ---
                      </option>
                      <option value='Quartz'>Quartz</option>
                      <option value='Granite'>Granite</option>
                      <option value='SolidSurface'>Solid Surface</option>
                      <option value='Porcelain'>Porcelain</option>
                      <option value='Marble'>Marble</option>
                      <option value='Limestone'>Limestone</option>
                      <option value='Travertine'>Travertine</option>
                      <option value='PreFab'>PreFab</option>
                      <option value='Other'>Other</option>
                    </select>
                  </div>

                  {/* Material Thickness */}
                  <div className='col-span-2'>
                    <label
                      htmlFor='thickness'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Thickness
                    </label>

                    <select
                      name='thickness'
                      id='thickness'
                      className='mt-1 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                      defaultValue={'default'}
                    >
                      <option value='default' disabled>
                        ---
                      </option>
                      <option value='2cm'>2cm</option>
                      <option value='3cm'>3cm</option>
                      <option value='.5inch'>1/2"</option>
                      <option value='12mm'>12mm</option>
                      <option value='Other'>Other</option>
                    </select>
                  </div>

                  {/* Material Brand */}
                  <div className='col-span-3'>
                    <label
                      htmlFor='materialBrand'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Brand
                    </label>

                    <select
                      name='materialBrand'
                      id='materialBrand'
                      className='mt-1 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                      defaultValue={'default'}
                    >
                      <option value='default' disabled>
                        ---
                      </option>
                      <option value='Daltile'>Daltile</option>
                      <option value='Dellaterra'>Arizona Tile</option>
                      <option value='MSI'>MSI</option>
                      <option value='Cambria'>Cambria</option>
                      <option value='Caesarstone'>Caesarstone</option>
                      <option value='Viatera'>Viatera</option>
                      <option value='Silestone'>Silestone</option>
                      <option value='Vadara'>Vadara</option>
                      <option value='Corianquartz'>Corian Quartz</option>
                      <option value='Wilsonartquartz'>Wilsonart Quartz</option>
                      <option value='Wilsonart'>Wilsonart Solid Surface</option>
                      <option value='Corian'>Corian Solid Surface</option>
                      <option value='Hi-macs'>LG Hi-Macs</option>
                      <option value='Neolith'>Neolith</option>
                      <option value='Dekton'>Dekton</option>
                      <option value='Other'>Other</option>
                    </select>
                  </div>

                  {/* Material Name */}
                  <div className='md:col-span-4'>
                    <label
                      htmlFor='materialColor'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Material Color
                    </label>

                    <input
                      type='text'
                      id='materialColor'
                      name='materialColor'
                      placeholder='Material color?'
                      className='block mt-1 w-full rounded-md border-gray-200 focus-bg-white shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                </div>

                {/* Textarea for Order Notes */}
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-6 px-4 lg:gap-x-6'>
                  {/* Text Area for Special Notes with Customer */}
                  <div className='col-span-4'>
                    <label
                      htmlFor='OrderNotes'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      {' '}
                      Order notes{' '}
                    </label>

                    <textarea
                      id='OrderNotes'
                      rows='5'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm'
                      placeholder='Enter any additional order notes...'
                    ></textarea>
                  </div>
                  {/* col-span-2 */}
                  <div className='col-span-2 my-auto'>
                    <div className='text-center'>
                      <button
                        className='items-center gap-2 rounded-lg border border-blue-600 bg-blue-600 px-8 py-2 text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'
                        type='submit'
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
