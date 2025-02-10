import addInternalNotes from '@/app/actions/addInternalNotes'
import customerWithCapitalizedNames from '@/app/actions/customerWithCapitalizedNames'

const NotesForm = ({ customer }) => {
  return (
    <section className='bg-white'>
      <div className='container max-w-2xl mx-auto px-15 md:rounded-2xl'>
        <div className='mx-auto text-left py-2 pl-1 text-sm md:text-md text-blue-500 font-bold'>
          Add Notes for {customerWithCapitalizedNames(customer.firstName)}{' '}
          {customerWithCapitalizedNames(customer.lastName)}
        </div>

        <div className='isolate px-4 sm:pb-2 lg:px-0'>
          {/* Form Starts Here */}
          <form
            action={addInternalNotes}
            className='container mx-auto my-4 justify-center'
          >
            <div className='grid grid-cols-1 gap-4 lg:gap-6 pb-2'>
              <div className='grid grid-cols-1 gap-4 lg:row-auto lg:gap-4 bg-white p-4 md:border border-gray-300 md:rounded-md'>
                {/* Customer Name */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 px-4 py-2 lg:gap-x-6'>
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
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 px-4 lg:gap-x-6'>
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
                      required
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                </div>

                {/* Note */}
                <div className='grid grid-cols-1 gap-4 px-4 lg:gap-x-6'>
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
          </form>
        </div>
      </div>
    </section>
  )
}
export default NotesForm
