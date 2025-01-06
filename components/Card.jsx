import Image from 'next/image'
import Link from 'next/link'
import CalacattaGold from '@/public/images/Calacatta-Gold.jpg'

const Card = () => {
  return (
    <>
      <div className='p-6'>
        <Link
          href='#'
          className='block rounded-lg p-4 shadow-sm shadow-indigo-100'
        >
          <Image
            alt='Quartz'
            src={CalacattaGold}
            className='h-56 w-full rounded-md object-cover'
          />

          <div className='mt-2'>
            <dl>
              <div>
                <dt className='sr-only'>Type</dt>

                <dd className='text-sm text-gray-500'>Silestone Quartz</dd>
              </div>

              <div>
                <dt className='sr-only'>Color</dt>

                <dd className='font-medium'>Calacatta Gold </dd>
              </div>
            </dl>

            <div className='mt-6 flex items-center gap-8 text-xs'>
              <div className='sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2'>
                <svg
                  className='size-4 text-indigo-700'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z'
                  />
                </svg>

                <div className='mt-1.5 sm:mt-0'>
                  <p className='text-gray-500'>Area</p>

                  <p className='font-medium'>Kitchen</p>
                </div>
              </div>

              <div className='sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2'>
                <svg
                  className='size-4 text-indigo-700'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
                  />
                </svg>

                <div className='mt-1.5 sm:mt-0'>
                  <p className='text-gray-500'>Thickness</p>

                  <p className='font-medium'>2cm</p>
                </div>
              </div>

              <div className='sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2'>
                <svg
                  className='size-4 text-indigo-700'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                  />
                </svg>

                <div className='mt-1.5 sm:mt-0'>
                  <p className='text-gray-500'>Finish</p>

                  <p className='font-medium'>Polished</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Card
