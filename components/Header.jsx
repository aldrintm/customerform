'use client'
import { useState, useEffect } from 'react'
import { FaRegUser, FaGoogle } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Breadcrumb from './BreadCrumb'
import OpenMapButton from '@/app/actions/openMapButton'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Header = () => {
  // get data as session from useSession from next-auth
  const { data: session } = useSession()

  // set state here
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isLoggedin, setIsLoggedIn] = useState(false)
  const [providers, setProviders] = useState(null)

  const pathname = usePathname()

  return (
    <section>
      {/* Header Page */}
      <div className='flex flex-col sm:gap-4 sm:py-4 sm:ml-14'>
        <header className='sticky top-0 z-30 bg-blue-500 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
          <button
            className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 sm:hidden'
            type='button'
            aria-haspopup='dialog'
            aria-expanded='false'
            aria-controls='radix-:R5lrb:'
            data-state='closed'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-panel-left h-5 w-5'
            >
              <rect width='18' height='18' x='3' y='3' rx='2'></rect>
              <path d='M9 3v18'></path>
            </svg>
            <span className='sr-only'>Toggle Menu</span>
          </button>

          {/* I created this breadcrumb to see what dynamic breadcrumbing looks like */}
          <Breadcrumb />

          <OpenMapButton />

          {/* Static Breadcrumb - Must create every page ahhhhhhh */}
          {/* <nav aria-label='breadcrumb' className='hidden md:flex'>
            <ol className='flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5'>
              <li className='inline-flex items-center gap-1.5'>
                <Link
                  className='transition-colors hover:text-foreground'
                  href='#'
                >
                  Main
                </Link>
              </li>
              <li
                role='presentation'
                aria-hidden='true'
                className='[&amp;>svg]:size-3.5'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='lucide lucide-chevron-right'
                >
                  <path d='m9 18 6-6-6-6'></path>
                </svg>
              </li>
              <li className='inline-flex items-center gap-1.5'>
                <Link
                  className='transition-colors hover:text-foreground'
                  href='#'
                >
                  Customers
                </Link>
              </li>
              <li
                role='presentation'
                aria-hidden='true'
                className='[&amp;>svg]:size-3.5'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='lucide lucide-chevron-right'
                >
                  <path d='m9 18 6-6-6-6'></path>
                </svg>
              </li>
              <li className='inline-flex items-center gap-1.5'>
                <span
                  role='link'
                  aria-disabled='true'
                  aria-current='page'
                  className='font-normal text-foreground'
                >
                  Table
                </span>
              </li>
            </ol>
          </nav> */}

          {/* Search Form Starts Here */}
          <form
            className='relative ml-auto flex-1 md:grow-0'
            action="javascript:throw new Error('React form unexpectedly submitted.')"
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-search absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground'
            >
              <circle cx='11' cy='11' r='8'></circle>
              <path d='m21 21-4.3-4.3'></path>
            </svg>

            <input
              type='search'
              name='q'
              placeholder='Search...'
              className='flex h-10 mt-1 w-full rounded-md border border-input border-gray-300 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 bg-background pl-8 md:w-[200px] lg:w-[336px]'
            />
          </form>
          <button
            className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 overflow-hidden rounded-full'
            type='button'
            id='radix-:Rhlrb:'
            aria-haspopup='menu'
            aria-expanded='false'
            data-state='closed'
          >
            {/* <Image
                alt='Avatar'
                loading='lazy'
                width='36'
                height='36'
                decoding='async'
                data-nimg='1'
                className='overflow-hidden rounded-full'
                style='color:transparent'
                src='/public/images/apple-touch-icon.png'
              /> */}
            <FaRegUser className='text-xl text-blue-500 font-bold' />
          </button>
        </header>
      </div>
    </section>
  )
}

export default Header
