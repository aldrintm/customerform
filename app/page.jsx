import Link from 'next/link'

const HomePage = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='grid grid-cols-2 gap-4 p-1 py-2 md:mx-8'>
        <Link
          href='/quote'
          className='inline-flex items-center gap-2 rounded-lg border border-blue-600 bg-blue-600 px-8 py-3 text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'
        >
          <span className='text-sm font-medium'> I want a quote </span>

          <svg
            className='size-5 rtl:rotate-180'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M17 8l4 4m0 0l-4 4m4-4H3'
            />
          </svg>
        </Link>

        <Link
          href='/customer'
          className='inline-flex items-center gap-2 rounded-lg border border-blue-600 bg-blue-600 px-8 py-3 text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'
        >
          <span className='text-sm font-medium text-center mx-auto'>
            Add Customer to Database
          </span>

          <svg
            className='size-5 rtl:rotate-180'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M17 8l4 4m0 0l-4 4m4-4H3'
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default HomePage
