'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useFormStatus } from 'react-dom'
import Button from './Button'
import Skater from '@/assets/images/skate-skateboard.gif'
import addSchedule from '@/app/actions/addSchedule'
import { Clock, Dot, Undo2 } from 'lucide-react'
import { ClipLoader } from 'react-spinners'

// Button component to access form status
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      className='w-full hover:bg-gray rounded-lg border border-blue-600 bg-blue-600 px-8 py-2 text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'
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
          <Clock className='w-5 h-5 flex items-center text-center' />
          Create Schedule
        </div>
      )}
    </button>
  )
}

export default function ScheduleForm({ customer, projects }) {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <>
      {projects && projects.length > 0 ? (
        <section className='bg-white'>
          <div className='container max-w-6xl mx-auto px-15 md:rounded-2xl'>
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

                {/* Break */}
                <div className='grid grid-cols-1 gap-2 lg:gap-2 bg-white p-4 md:border md:rounded-md border-gray-300'>
                  {/* Form Starts Here */}

                  <div className='col-span-1 px-4 py-4 lg:gap-x-6'>
                    <label
                      htmlFor='measureTime'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Which Project is this schedule for?
                    </label>
                    <select
                      name='project'
                      className='mt-1 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                      defaultValue={'default'}
                      required
                    >
                      <option value=''>Select a Project</option>
                      {projects.map((project) => (
                        <option key={project._id} value={project._id}>
                          {project.description || `Project ${project._id}`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className='grid grid-cols-1 gap-3 md:grid-cols-4 lg:gap-3'>
                    {/* First Side Column Box */}
                    <div className='grid grid-cols-1 '>
                      {/* Measure Description */}
                      <div className='col-span-1 px-4 py-4 lg:gap-x-6'>
                        <label
                          htmlFor='measureDescription'
                          className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                        >
                          Measure Description:
                        </label>

                        <input
                          type='text'
                          id='measureDescription'
                          name='measureDescription'
                          className='mt-1 w-full rounded-md border-gray-200 text-gray-500 shadow-sm sm:text-sm bg-sky-50'
                          placeholder='What are we measuring?'
                        />
                      </div>

                      {/* Measure Date */}
                      <div className='col-span-1 px-4 py-4 lg:gap-x-6'>
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

                      {/* Measure Time Window */}
                      <div className='col-span-1 px-4 py-4 lg:gap-x-6'>
                        <label
                          htmlFor='measureTime'
                          className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                        >
                          Measure Time
                        </label>

                        <select
                          name='measureTime'
                          id='measureTime'
                          className='mt-1 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                        >
                          <option value=''>Select Time (required)</option>
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

                      {/* Measured By: */}
                      <div className='col-span-1 px-4 py-4 lg:gap-x-6'>
                        <label
                          htmlFor='measureBy'
                          className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                        >
                          Measure Technician
                        </label>

                        <select
                          name='measureBy'
                          id='measureBy'
                          className='mt-1 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                        >
                          <option value=''>Select Name (required)</option>
                          <option value='Anilber'>Anilber</option>
                          <option value='Javier'>Javier</option>
                          <option value='Other'>Other</option>
                        </select>
                      </div>

                      {/* Textarea for Notes */}

                      {/* Text Area for Special Notes with Customer */}
                      <div className='col-span-1 px-4 py-4 lg:gap-x-6'>
                        <label
                          htmlFor='measureNotes'
                          className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                        >
                          {' '}
                          Measure Notes:
                        </label>

                        <textarea
                          id='measureNotes'
                          name='measureNotes'
                          rows={4}
                          className='mt-1 w-full rounded-md py-4 border-gray-200 shadow-sm sm:text-sm'
                          placeholder='What are we measuring?'
                        ></textarea>
                      </div>
                    </div>

                    {/* Second Column Box */}
                    <div className='grid grid-cols-1 '>
                      {/* Demo Description */}
                      <div className='col-span-1 px-4 py-4 lg:gap-x-6'>
                        <label
                          htmlFor='demoDescription'
                          className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                        >
                          Demo Description:
                        </label>

                        <input
                          type='text'
                          id='demoDescription'
                          name='demoDescription'
                          className='mt-1 w-full rounded-md border-gray-200 text-gray-500 shadow-sm sm:text-sm bg-sky-50'
                          placeholder='What are we tearing out?'
                        />
                      </div>

                      {/* Demo Date */}
                      <div className='col-span-1 px-4 py-4 lg:gap-x-6'>
                        <label
                          htmlFor='demoDate'
                          className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                        >
                          Demo Date:
                        </label>

                        <input
                          type='date'
                          id='demoDate'
                          name='demoDate'
                          className='mt-1 w-full rounded-md border-gray-200 text-gray-500 shadow-sm sm:text-sm bg-sky-50'
                        />
                      </div>

                      {/* Demo Time */}
                      <div className='col-span-1 px-4 py-4 lg:gap-x-6'>
                        <label
                          htmlFor='demoTime'
                          className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                        >
                          Demo Time
                        </label>

                        <select
                          name='demoTime'
                          id='demoTime'
                          className='mt-1 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                        >
                          <option value=''>Select Time (required)</option>
                          <option value='9-12'>9-12</option>
                          <option value='1-4'>1-4</option>
                          <option disabled>or</option>
                          <option value='ask office'>ask office</option>
                          <option value='allday'>all day</option>
                        </select>
                      </div>

                      {/* Measured By: */}
                      <div className='col-span-1 px-4 py-4 lg:gap-x-6'>
                        <label
                          htmlFor='demoBy'
                          className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                        >
                          Demo By
                        </label>

                        <select
                          name='demoBy'
                          id='demoBy'
                          className='mt-1 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                        >
                          <option value=''>Select Name (required)</option>
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

                      {/* Textarea for Notes */}

                      {/* Text Area for Special Notes with Customer */}
                      <div className='col-span-1 px-4 py-4 lg:gap-x-6'>
                        <label
                          htmlFor='demoNotes'
                          className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                        >
                          {' '}
                          Demo Notes:
                        </label>

                        <textarea
                          id='demoNotes'
                          name='demoNotes'
                          rows={4}
                          className='mt-1 w-full rounded-md py-4 border-gray-200 shadow-sm sm:text-sm'
                          placeholder='What exactly are we demolishing?'
                        ></textarea>
                      </div>
                    </div>

                    {/* Third Column Box */}
                    <div className='grid grid-cols-1'>
                      {/* Install Description */}
                      <div className='col-span-1 px-4 py-4 lg:gap-x-6 invisible'>
                        <label
                          htmlFor='installDescription'
                          className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                        >
                          Install Description:
                        </label>

                        <input
                          type='text'
                          id='installDescription'
                          name='installDescription'
                          className='mt-1 w-full rounded-md border-gray-200 text-gray-500 shadow-sm sm:text-sm bg-sky-50'
                          placeholder='What are we installing?'
                          disabled
                        />
                      </div>

                      {/* Install Date */}
                      <div className='col-span-1 px-4 py-4 lg:gap-x-6'>
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

                      {/* Install Arrival Window */}
                      <div className='col-span-1 px-4 py-4 lg:gap-x-6'>
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
                        >
                          <option value=''>Select Time (required)</option>
                          <option value='9-12'>9-12</option>
                          <option value='1-4'>1-4</option>
                          <option disabled>or</option>
                          <option value='ask office'>ask office</option>
                          <option value='allday'>all day</option>
                        </select>
                      </div>

                      {/* Install By: */}
                      <div className='col-span-1 px-4 py-4 lg:gap-x-6'>
                        <label
                          htmlFor='installBy'
                          className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                        >
                          Installers
                        </label>

                        <select
                          name='installBy'
                          id='installBy'
                          className='mt-1 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                        >
                          <option value=''>Select Name (required)</option>
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

                      {/* Text Area for Special Notes with Customer */}
                      <div className='col-span-1 px-4 py-4 lg:gap-x-6'>
                        <label
                          htmlFor='installNotes'
                          className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                        >
                          {' '}
                          Install Notes:
                        </label>

                        <textarea
                          id='installNotes'
                          name='installNotes'
                          rows={4}
                          className='mt-1 w-full rounded-md py-4 border-gray-200 shadow-sm sm:text-sm'
                          placeholder='Type a note for the installers...'
                        ></textarea>
                      </div>
                    </div>

                    {/* Fourth Column Box */}
                    <div className='grid grid-cols-1 '>
                      {/* Service Description */}
                      <div className='col-span-1 px-4 py-4 lg:gap-x-6'>
                        <label
                          htmlFor='serviceDescription'
                          className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                        >
                          Service Description:
                        </label>

                        <input
                          type='text'
                          id='serviceDescription'
                          name='serviceDescription'
                          className='mt-1 w-full rounded-md border-gray-200 text-gray-500 shadow-sm sm:text-sm bg-sky-50'
                          placeholder='What are we doing on site?'
                        />
                      </div>

                      {/* Service Date */}
                      <div className='col-span-1 px-4 py-4 lg:gap-x-6'>
                        <label
                          htmlFor='serviceDate'
                          className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                        >
                          Service Date:
                        </label>

                        <input
                          type='date'
                          id='serviceDate'
                          name='serviceDate'
                          className='mt-1 w-full rounded-md border-gray-200 text-gray-500 shadow-sm sm:text-sm bg-sky-50'
                        />
                      </div>

                      {/* Service Time */}
                      <div className='col-span-1 px-4 py-4 lg:gap-x-6'>
                        <label
                          htmlFor='serviceTime'
                          className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                        >
                          Service Time
                        </label>

                        <select
                          name='serviceTime'
                          id='serviceTime'
                          className='mt-1 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                        >
                          <option value=''>Select Time (required)</option>
                          <option value='9-12'>9-12</option>
                          <option value='1-4'>1-4</option>
                          <option disabled>or</option>
                          <option value='ask office'>ask office</option>
                          <option value='allday'>all day</option>
                        </select>
                      </div>

                      {/* Measured By: */}
                      <div className='col-span-1 px-4 py-4 lg:gap-x-6'>
                        <label
                          htmlFor='serviceBy'
                          className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                        >
                          Service By
                        </label>

                        <select
                          name='serviceBy'
                          id='serviceBy'
                          className='mt-1 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                        >
                          <option value=''>Select Name (required)</option>
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

                      {/* Textarea for Notes */}

                      {/* Text Area for Special Notes with Customer */}
                      <div className='col-span-1 px-4 py-4 lg:gap-x-6'>
                        <label
                          htmlFor='serviceNotes'
                          className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                        >
                          {' '}
                          Service Notes:
                        </label>

                        <textarea
                          id='serviceNotes'
                          name='serviceNotes'
                          rows={4}
                          className='mt-1 w-full rounded-md py-4 border-gray-200 shadow-sm sm:text-sm'
                          placeholder='Explain what we need to do...'
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 gap-2 md:grid-cols-1 p-4 lg:gap-x-6'>
                    {/* Submit Button */}
                    <div className='md:col-span-1'>
                      <span>
                        <SubmitButton />
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
      ) : (
        <div className='grid h-screen place-content-center bg-white'>
          <Image
            src={Skater}
            width={400}
            height={400}
            alt='Page Not Found'
            className='rounded-3xl'
          />
          <div className='text-center'>
            <h1 className='mt-6 text-md font-semibold tracking-tight text-gray-500 sm:text-2xl'>
              uh oh{' '}
            </h1>

            <p className='p-4 text-gray-500 font-medium'>
              You need to create a project first
            </p>

            <Button
              icon={<Undo2 className='h-4 w-4 text-xs hover:text-white' />}
              onClick={() => router.back()}
            >
              Go Back
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
