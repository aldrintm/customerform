'use client'

import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import addMessage from '@/app/actions/addMessage'
import Link from 'next/link'
import { Send } from 'lucide-react'

const MessageForm = () => {
  return (
    <section className='bg-white'>
      <div className='container mx-auto max-w-2xl px-15'>
        <div className='text-center pt-6 pl-10 sm:text-left md:py-2 md:pl-1 text-sm md:text-md text-blue-500 font-bold'>
          Send a Message to an Office Team Member
        </div>

        <div className=''>
          {/* Form Starts Here */}
          <form
            action={addMessage}
            className='container mx-auto my-4 justify-center'
          >
            <div className='grid grid-cols-1 gap-6 lg:gap-6 bg-white p-4 md:border border-gray-300 md:rounded-md'>
              <div className='grid grid-cols-1 gap-2 lg:row-auto lg:gap-2'>
                {/* Message Date */}
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
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 p-4 lg:gap-8'>
                  {/* From */}
                  <div>
                    <label
                      htmlFor='Name'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      From:
                    </label>

                    <input
                      type='text'
                      id='Name'
                      name='Name'
                      required
                      placeholder='Name'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                  {/* To */}
                  <div>
                    <label
                      htmlFor='Name'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      To:
                    </label>

                    <input
                      type='text'
                      id='Name'
                      name='Name'
                      required
                      placeholder='Name'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                </div>

                {/* Message Area */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 p-4 lg:gap-8'>
                  {/* Text Area */}
                  <div className='col-span-2'>
                    <label
                      htmlFor='orderNotes'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Message:
                    </label>

                    <textarea
                      id='message'
                      name='message'
                      rows={6}
                      placeholder='Enter your private message...'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    ></textarea>
                  </div>
                </div>

                {/* col-span-2 */}
                <div className='p-4'>
                  <span className=''>
                    <button
                      className='w-full hover:bg-gray flex justify-center items-center gap-2 rounded-lg border border-blue-600 bg-blue-600 px-8 py-2 text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'
                      type='submit'
                    >
                      <Send className='w-5 h-5 mr-2 flex items-center text-center' />
                      Send Message nOW
                    </button>
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
export default MessageForm
