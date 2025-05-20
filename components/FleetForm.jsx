'use client'
import addFleet from '@/app/actions/addFleet'
import { useFormStatus } from 'react-dom'
import { ClipLoader } from 'react-spinners'
import { Car } from 'lucide-react' // Import any icons you need

// Button component to access form status
function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      className={`w-full hover:bg-gray rounded-lg border border-blue-600 
                  bg-blue-600 px-8 py-2 text-white hover:bg-transparent 
                  hover:text-blue-600 focus:outline-none focus:ring 
                  active:text-blue-500`}
      type='submit'
      disabled={pending}
    >
      {pending ? (
        <ClipLoader
          color='#2fa8f6'
          size={23}
          loading={true}
          speedMultiplier={1}
        />
      ) : (
        <div className='flex justify-center items-center gap-2'>
          <Car className='w-5 h-5 flex items-center text-center' />
          Upload Vehicle Info
        </div>
      )}
    </button>
  )
}

export default function FleetForm() {
  return (
    <section className='bg-white'>
      <div className='container max-w-4xl mx-auto px-15 md:rounded-2xl'>
        <div className='mx-auto text-left py-2 pl-1 text-sm md:text-md text-blue-500 font-bold'>
          New Vehicle Details
        </div>

        <div className='isolate px-4 sm:pb-2 lg:px-0'>
          {/* Form Starts Here */}
          <form
            action={addFleet}
            className='container mx-auto my-4 justify-center'
          >
            <div className='grid grid-cols-1 gap-4 lg:gap-6 pb-2'>
              <div className='grid grid-cols-1 gap-2 lg:row-auto lg:gap-2 bg-white p-4 md:border border-gray-300 md:rounded-md'>
                {/* Employee ID + First Name + Last Name */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3 p-4 lg:gap-x-6'>
                  {/* VIN ID */}
                  <div>
                    <label
                      htmlFor='vin'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      VIN Number
                    </label>

                    <input
                      type='number'
                      id='vin'
                      name='vin'
                      required
                      placeholder='Vehicle ID Number'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>

                  {/* Year */}
                  <div>
                    <label
                      htmlFor='year'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Year
                    </label>

                    <input
                      type='number'
                      id='year'
                      name='year'
                      required
                      placeholder='First name'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>

                  {/* Brand */}
                  <div>
                    <label
                      htmlFor='brand'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Brand
                    </label>

                    <input
                      type='text'
                      id='brand'
                      name='brand'
                      required
                      placeholder='Brand Name'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                </div>

                {/* Model + License*/}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 pt-2 p-4 lg:gap-x-6'>
                  {/* Model */}
                  <div>
                    <label
                      htmlFor='model'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Model
                    </label>

                    <input
                      type='text'
                      id='model'
                      name='model'
                      required
                      placeholder='Toyota or Isuzu'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>

                  {/* License */}
                  <div>
                    <label
                      htmlFor='license'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      License
                    </label>

                    <input
                      type='text'
                      id='license'
                      name='license'
                      required
                      placeholder='License'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                </div>

                {/* Department + Driver */}
                <div className='grid md:grid-cols-2 gap-4 pt-2 p-4  lg:gap-x-6'>
                  {/* Department */}
                  <div>
                    <label
                      htmlFor='department'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      What is this vehicle used for?
                    </label>

                    <input
                      type='text'
                      id='department'
                      name='department'
                      required
                      placeholder='Installs or Template or Pickup'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                  {/* Driver */}
                  <div>
                    <label
                      htmlFor='driver'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Driver Assigned
                    </label>

                    <input
                      type='text'
                      id='driver'
                      name='driver'
                      required
                      placeholder='Installs or Template or Pickup'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                </div>

                {/* City + State + Zipcode */}
                <div className='grid grid-cols-1 gap-4 md:gap-x-4 md:grid-cols-8 pt-2 p-4  lg:gap-x-6'>
                  {/* City */}
                  <div className='md:col-span-3'>
                    <label
                      htmlFor='purchaseDate'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Purchase Date
                    </label>

                    <input
                      type='date'
                      id='purchaseDate'
                      name='purchaseDate'
                      required
                      placeholder='When is this vehicle purchased?'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>

                  {/* State */}
                  <div className='md:col-span-3'>
                    <label
                      htmlFor='endDate'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      End Date of Use
                    </label>

                    <input
                      type='date'
                      id='endDate'
                      name='endDate'
                      defaultValue='CA'
                      readOnly
                      className='mt-1 w-full rounded-md border-gray-200 text-gray-500 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>

                  {/* Zipcode */}
                  <div className='md:col-span-2'>
                    <label
                      htmlFor='status'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Status
                    </label>

                    <select
                      name='status'
                      id='status'
                      className='mt-1 w-full rounded-md shadow-sm sm:text-sm text-gray-500 bg-sky-50 border-gray-200 focus-bg-white'
                      defaultValue={'DEFAULT'}
                    >
                      <option value='DEFAULT' disabled>
                        Choose ...
                      </option>
                      <option value='active'>Active</option>
                      <option value='inactive'>Inactive</option>
                      <option value='repair'>Repair</option>
                      <option value='sold'>Sold</option>
                    </select>
                  </div>
                </div>

                {/* FasTrack + Other */}
                <div className='grid md:grid-cols-2 gap-4 pt-2 p-4  lg:gap-x-6'>
                  {/* FasTrack */}
                  <div>
                    <label
                      htmlFor='fastTrack'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      FasTrack Number Assigned
                    </label>

                    <input
                      type='text'
                      id='fasTrack'
                      name='fasTrack'
                      required
                      placeholder='FasTrack for this vehicle'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                  {/* Other */}
                  <div>
                    <label
                      htmlFor='other'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Other
                    </label>

                    <input
                      type='text'
                      id='other'
                      name='other'
                      required
                      placeholder='Other information about this vehicle'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                </div>

                {/* Textarea for Notes */}
                <div className='grid grid-cols-1 lg:grid-cols-1 pt-2 p-4 '>
                  {/* Text Area for Special Notes */}
                  <div className=''>
                    <label
                      htmlFor='notes'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      {' '}
                      Internal Notes{' '}
                    </label>

                    <textarea
                      id='notes'
                      name='notes'
                      rows='1'
                      className='mt-1 w-full rounded-md py-4 border-gray-200 shadow-sm sm:text-sm'
                      placeholder='Enter notes about this vehicle ...'
                    ></textarea>
                  </div>
                </div>
                <div className='p-4'>
                  <span className=''>
                    <SubmitButton />
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
