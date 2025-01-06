import updateCustomer from '@/app/actions/updateCustomer'
import Link from 'next/link'

const CustomerEditForm = ({ customer }) => {
  return (
    <section className='bg-white'>
      <div className='container mx-auto px-15 md:rounded-2xl'>
        <div className='mx-auto text-left py-2 pl-1 text-sm md:text-md text-blue-500 font-bold'>
          New Customer Details
        </div>

        <div className='isolate px-4 sm:pb-2 lg:px-0'>
          {/* Form Starts Here */}
          <form
            action={updateCustomer}
            className='container mx-auto my-4 justify-center'
          >
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 pb-2'>
              {/* Left Side of Form Column */}

              <div className='grid grid-cols-1 gap-4 lg:row-auto lg:gap-4 bg-white py-2 md:border border-gray-300 md:rounded-md'>
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
                </div>
              </div>

              {/* Break */}
              {/* Break */}
              {/* Break */}

              {/* Right Side of the Form Column */}
              <div className='grid grid-cols-1 gap-4 lg:grid-rows-auto lg:gap-4 bg-white py-6 md:border md:rounded-md border-gray-300'>
                {/* Purchase Order + Store ID */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-12 px-4 lg:gap-x-6'>
                  {/* Purchase Order */}
                  <div className='col-span-4'>
                    <label
                      htmlFor='purchaseOrderNumber'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Purchase Order No:
                    </label>

                    <input
                      type='text'
                      id='purchaseOrderNumber'
                      name='purchaseOrderNumber'
                      placeholder='Purchase Order #'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>

                  {/* Store ID */}
                  <div className='col-span-4'>
                    <label
                      htmlFor='storeName'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Store Name:
                    </label>

                    <select
                      name='storeName'
                      id='storeName'
                      className='mt-1 w-full rounded-md shadow-sm sm:text-sm text-gray-500 bg-sky-50 border-gray-200 focus-bg-white'
                      defaultValue={customer.storeName}
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
                  {/* Purchase Order */}
                  <div className='col-span-4'>
                    <label
                      htmlFor='storeId'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Store ID:
                    </label>

                    <input
                      type='text'
                      id='storeId'
                      name='storeId'
                      placeholder='Store Id'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                      defaultValue={customer.storeId}
                    />
                  </div>
                </div>

                {/* PO Date and Amount Paid */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-12 px-4 lg:gap-x-6'>
                  {/* Purchase Order Date */}
                  <div className='col-span-4'>
                    <label
                      htmlFor='purchaseOrderDate'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Date paid:
                    </label>

                    <input
                      type='date'
                      id='purchaseOrderDate'
                      name='purchaseOrderDate'
                      placeholder='Purchase order date'
                      className='mt-1 w-full rounded-md border-gray-200 text-gray-500 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>

                  {/* Purchase Order Amount */}
                  <div className='col-span-4'>
                    <label
                      htmlFor='purchaseOrderAmount'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Purchase amount
                    </label>

                    <input
                      type='number'
                      name='purchaseOrderAmount'
                      id='purchaseOrderAmount'
                      placeholder='PO cost ...'
                      className='mt-1 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                    />
                  </div>

                  {/* Square Feet */}
                  <div className='col-span-4'>
                    <label
                      htmlFor='squareFeet'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Paid sq ft.
                    </label>

                    <input
                      type='number'
                      id='squareFeet'
                      name='squareFeet'
                      placeholder='How many sqft?'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                </div>

                {/* Purchase Order Info - Material Brand + Thickness + Color */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-12 px-4 lg:gap-x-6'>
                  {/* Material Type */}
                  <div className='lg:col-span-3'>
                    <label
                      htmlFor='materialType'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Type
                    </label>

                    <select
                      id='materialType'
                      name='materialType'
                      defaultValue={customer.materailType}
                      className='mt-1 w-full rounded-md border-gray-300 shadow-sm sm:text-sm bg-sky-50'
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
                  <div className='lg:col-span-2'>
                    <label
                      htmlFor='materialThickness'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Thickness
                    </label>

                    <select
                      name='materialThickness'
                      id='materialThickness'
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
                  <div className='lg:col-span-3'>
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
                      defaultValue={customer.materialBrand}
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
                  <div className='lg:col-span-4'>
                    <label
                      htmlFor='materialColor'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Color
                    </label>

                    <input
                      type='text'
                      id='materialColor'
                      name='materialColor'
                      placeholder='Color name'
                      className='block mt-1 w-full rounded-md border-gray-200 focus-bg-white shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                </div>

                {/* Textarea for Order Notes */}
                <div className='grid grid-cols-1 md:gap-4 lg:grid-cols-6 px-4 lg:gap-x-6'>
                  {/* Text Area for Special Notes with Customer */}
                  <div className='lg:col-span-4'>
                    <label
                      htmlFor='orderNotes'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      {' '}
                      Special Notes{' '}
                    </label>

                    <textarea
                      id='orderNotes'
                      name='orderNotes'
                      rows='5'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm'
                      placeholder='Enter any additional order notes...'
                    ></textarea>
                  </div>
                  {/* col-span-2 */}
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
export default CustomerEditForm
