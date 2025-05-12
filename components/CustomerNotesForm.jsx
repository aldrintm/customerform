'use client'

import { useFormStatus } from 'react-dom'
import addInternalNotes from '@/app/actions/addInternalNotes'
import customerWithCapitalizedNames from '@/app/actions/customerWithCapitalizedNames'
import { MessageCircleMore } from 'lucide-react'
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
          <MessageCircleMore className='w-5 h-5 flex items-center text-center' />
          Create Note
        </div>
      )}
    </button>
  )
}

export default function NotesForm({ customer }) {
  return (
    <section className='bg-white'>
      <div className='container max-w-2xl mx-auto px-15 md:rounded-2xl'>
        <div className='text-center pt-6 pl-10 sm:text-left md:py-2 md:pl-1 text-sm md:text-md text-blue-500 font-bold'>
          Add Notes for {customerWithCapitalizedNames(customer.firstName)}{' '}
          {customerWithCapitalizedNames(customer.lastName)}
        </div>

        <div className='isolate px-4 sm:pb-2 lg:px-0'>
          {/* Form Starts Here */}
          <form
            action={addInternalNotes}
            className='container mx-auto my-4 justify-center'
          >
            <div className='grid grid-cols-1 gap-4 lg:gap-6 bg-white p-4 md:border border-gray-300 md:rounded-md'>
              <div className='grid grid-cols-1 gap-2 lg:row-auto lg:gap-2'>
                {/* Customer Name */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-1 p-4 lg:gap-x-6'>
                  <div>
                    <div className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'>
                      Customer:{' '}
                      {customerWithCapitalizedNames(customer.firstName)}{' '}
                      {customerWithCapitalizedNames(customer.lastName)}
                    </div>
                  </div>
                </div>

                <input type='hidden' name='customerId' value={customer._id} />

                {/* Note Date */}
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 p-4 lg:gap-x-6'>
                  {/* Date Note is Taken */}
                  <div>
                    <label
                      htmlFor='noteDate'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Date:
                    </label>

                    <input
                      type='date'
                      id='noteDate'
                      name='noteDate'
                      disabled
                      defaultValue={new Date().toISOString().split('T')[0]}
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                </div>

                {/* Note */}
                <div className='grid grid-cols-1 gap-6 p-4 lg:gap-x-6'>
                  <div>
                    <label
                      htmlFor='note'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Internal Notes Starts Here
                    </label>

                    <textarea
                      type='text'
                      id='note'
                      name='note'
                      rows={6}
                      placeholder='Share Notes or Customer Calls ....'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
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
