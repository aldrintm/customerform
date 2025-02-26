import addSchedule from '@/app/actions/addSchedule'
import Link from 'next/link'
import { Clock } from 'lucide-react'

const ScheduleForm = ({ customer }) => {
  console.log(customer)
  return (
    <section className='bg-white'>
      <div className='container max-w-4xl mx-auto px-15 md:rounded-2xl'>
        <div className='mx-auto text-left py-2 pl-1 text-sm md:text-md text-blue-500 font-bold'>
          Create Schedule for Template and Install
        </div>

        <div className='isolate px-4 sm:pb-2 lg:px-0'>
          {/* Form Starts Here */}
          <form
            action={addSchedule}
            className='container mx-auto my-4 justify-center'
          >
            <input type='hidden' name='customer' value={customer._id} />
            <div className='grid grid-cols-1 gap-2 lg:gap-2 bg-white p-4 md:border md:rounded-md border-gray-300'>
              {/* Break */}

              {/* Form Starts */}
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-4'>
                <div className='grid grid-cols-1'>
                  {/* Measure Date */}
                  <div className='grid grid-cols-1 px-4 py-4 lg:gap-x-6'>
                    {/* Date */}
                    <div className='col-span-1'>
                      <label
                        htmlFor='measureDate'
                        className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                      >
                        Measure Date:
                      </label>

                      <input
                        type='date'
                        id='measureDate'
                        name='measureDate'
                        className='mt-1 w-full rounded-md border-gray-200 text-gray-500 shadow-sm sm:text-sm bg-sky-50'
                      />
                    </div>
                  </div>

                  {/* Measure Time */}
                  <div className='grid grid-cols-1 px-4 py-4 lg:gap-x-6'>
                    <div className='sm:col-span-1'>
                      <label
                        htmlFor='measureTime'
                        className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                      >
                        Measure Time Window
                      </label>

                      <select
                        name='measureTime'
                        id='measureTime'
                        className='mt-1 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                        defaultValue={'default'}
                      >
                        <option value='default' disabled>
                          Select Time (required)
                        </option>
                        <option value='8-10'>8-10</option>
                        <option value='10-12'>10-12</option>
                        <option value='12-2'>12-2</option>
                        <option value='2-4'>2-4</option>
                        <option disabled>or</option>
                        <option value='7-9'>7-9</option>
                        <option value='9-11'>9-11</option>
                        <option value='11-1'>11-1</option>
                        <option value='1-3'>1-3</option>
                      </select>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 px-4 py-4 lg:gap-x-6'>
                    {/* Measured By: */}
                    <div className='sm:col-span-1'>
                      <label
                        htmlFor='measureTech'
                        className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                      >
                        Template Technician
                      </label>

                      <select
                        name='measureTech'
                        id='measureTech'
                        className='mt-1 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                        defaultValue={'default'}
                      >
                        <option value='default' disabled>
                          Select Name (required)
                        </option>
                        <option value='Anilber'>Anilber</option>
                        <option value='Javier'>Javier</option>
                        <option value='Jeff'>Jeff</option>
                        <option value='Other'>Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Textarea for Notes */}
                  <div className='grid grid-cols-1 px-4 py-4 lg:gap-x-6'>
                    {/* Text Area for Special Notes with Customer */}
                    <div className='sm:col-span-1'>
                      <label
                        htmlFor='notes'
                        className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                      >
                        {' '}
                        Customer Instructions or Notes for Technician
                      </label>

                      <textarea
                        id='notes'
                        name='notes'
                        rows={4}
                        className='mt-1 w-full rounded-md py-4 border-gray-200 shadow-sm sm:text-sm'
                        placeholder='Enter any additional order notes...'
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-1'>
                  {/* Install Date */}
                  <div className='grid grid-cols-1 px-4 py-4 lg:gap-x-6'>
                    {/* Date */}
                    <div className='col-span-1'>
                      <label
                        htmlFor='installDate'
                        className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                      >
                        Install Date:
                      </label>

                      <input
                        type='date'
                        id='installDate'
                        name='installDate'
                        className='mt-1 w-full rounded-md border-gray-200 text-gray-500 shadow-sm sm:text-sm bg-sky-50'
                      />
                    </div>
                  </div>

                  {/* Install Arrival Window */}
                  <div className='grid grid-cols-1 px-4 py-4 lg:gap-x-6'>
                    <div className='sm:col-span-1'>
                      <label
                        htmlFor='installTime'
                        className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                      >
                        Install Arrival Window
                      </label>

                      <select
                        name='installTime'
                        id='installTime'
                        className='mt-1 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                        defaultValue={'default'}
                      >
                        <option value='default' disabled>
                          Select Time (required)
                        </option>
                        <option value='9-12'>9-12</option>
                        <option value='1-4'>1-4</option>
                        <option disabled>or</option>
                        <option value='allday'>all day</option>
                      </select>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 px-4 py-4 lg:gap-x-6'>
                    {/* Install By: */}
                    <div className='sm:col-span-1'>
                      <label
                        htmlFor='installer'
                        className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                      >
                        Installers
                      </label>

                      <select
                        name='installer'
                        id='installer'
                        className='mt-1 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                        defaultValue={'default'}
                      >
                        <option value='default' disabled>
                          Select Name (required)
                        </option>
                        <option value='Francisco'>Francisco</option>
                        <option value='Chico'>Chico Meza</option>
                        <option value='Mario Torres'>Mario Torres</option>
                        <option value='Ruben'>Ruben</option>
                        <option value='Martin'>Martin</option>
                        <option value='Cholo'>Cholo</option>
                        <option value='Ernesto'>Ernesto</option>
                        <option value='Efren'>Efren</option>
                        <option value='Vlad'>Vlad</option>
                        <option value='Mario Gamez'>Mario Gamez</option>
                        <option value='Other'>Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Text Area for Special Notes with Customer */}
                  <div className='grid grid-cols-1 px-4 py-4 lg:gap-x-6'>
                    <div className='sm:col-span-1'>
                      <label
                        htmlFor='notes'
                        className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                      >
                        {' '}
                        Special Notes for Installers
                      </label>

                      <textarea
                        id='notes'
                        name='notes'
                        rows={4}
                        className='mt-1 w-full rounded-md py-4 border-gray-200 shadow-sm sm:text-sm'
                        placeholder='Enter any additional order notes...'
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-1 gap-2 md:grid-cols-1 p-4 lg:gap-x-6'>
                {/* Submit Button */}
                <div className='md:col-span-1'>
                  <span>
                    <button
                      className='w-full hover:bg-gray flex justify-center items-center gap-2 rounded-lg border border-blue-600 bg-blue-600 px-8 py-2 text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'
                      type='submit'
                    >
                      <Clock className='w-5 h-5 mr-2 flex items-center text-center' />
                      Create Schedule
                    </button>
                  </span>
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
export default ScheduleForm
