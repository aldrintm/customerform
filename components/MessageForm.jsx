import addMessage from '@/app/actions/addMessage'
import Link from 'next/link'

const MessageForm = () => {
  return (
    <section className='bg-white'>
      <div className='container mx-auto px-15 md:rounded-2xl'>
        <div className='mx-auto text-left py-2 pl-1 text-sm md:text-md text-blue-500 font-bold'>
          Send a Message Here
        </div>

        <div className='isolate px-4 sm:pb-2 lg:px-0'>
          {/* Form Starts Here */}
          <form
            action={addMessage}
            className='container mx-auto my-4 justify-center'
          >
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 pb-2'>
              {/* Left Side of Form Column */}

              <div className='grid grid-cols-1 gap-4 lg:row-auto lg:gap-4 bg-white py-2 md:border border-gray-300 md:rounded-md'>
                {/* First Name and Last Name */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 px-4 lg:gap-x-6'>
                  {/* Name */}
                  <div>
                    <label
                      htmlFor='Name'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Name:
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
                <div className='grid grid-cols-1 md:gap-4 lg:grid-cols-6 px-4 lg:gap-x-6'>
                  {/* Text Area for Special Notes with Customer */}
                  <div className='lg:col-span-4'>
                    <label
                      htmlFor='orderNotes'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Message:
                    </label>

                    <textarea
                      id='message'
                      name='message'
                      rows='7'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm'
                      placeholder='Enter your message...'
                    ></textarea>
                  </div>
                  <div className='lg:col-span-4'>
                    <label
                      htmlFor='orderNotes'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Message:
                    </label>

                    <textarea
                      id='message'
                      name='message'
                      rows='5'
                      className='hidden md:block mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm'
                      placeholder='Enter your message...'
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
          </form>
        </div>
      </div>
    </section>
  )
}
export default MessageForm
