'use client'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { refreshCustomerData } from '@/app/actions/refreshCustomerData'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import AppleTouch from '@/assets/images/apple-touch-icon.png'
import Breadcrumb from './BreadCrumb'
import { RefreshCw } from 'lucide-react'

import CustomerSearchForm from './CustomerSearchForm'
import Greeting from './Greeting'

const Header = () => {
  const router = useRouter()

  // Lets create a ref for both menu and button
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  // get data as session from useSession from next-auth
  const { data: session } = useSession()
  // use '?' for optional chaining so we dont get thrown an error here
  const profileImage = session?.user?.image
  // set state here
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isLoggedin, setIsLoggedIn] = useState(false)
  const [providers, setProviders] = useState(null)
  const [isSpinning, setIsSpinning] = useState(false)

  const handleClickAndRefresh = async () => {
    await refreshCustomerData() // Revalidates Server Component for Dashboard and Customers Only, we can pass a customerId later but it would have to be on every header component which I think is too much, might need to apply context provider
    router.refresh() // Refreshes Server Component data for current page
    setIsSpinning(true)
    // Reset the animation after it completes
    setTimeout(() => {
      setIsSpinning(false)
    }, 1000) // 3 second for animation duration
  }

  const pathname = usePathname()

  // set provider using getProvider from next-auth
  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    setAuthProviders()
  }, [])

  // Lets add a click listener that checks if click was outside both elements
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav>
      {/* Header Page */}
      <div className='flex flex-col sm:gap-4 sm:py-4 sm:ml-14'>
        <header className='sticky top-0 z-30 bg-blue-400 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 print:hidden'>
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
          {session && <Breadcrumb />}

          {/* Search Form Here */}
          {session && <CustomerSearchForm />}

          {/* Right Side Menu - LOGGED OUT + Google Button */}
          {!session && (
            <div className='w-full'>
              <div className='hidden md:block'>
                <div className='flex justify-end'>
                  {providers &&
                    Object.values(providers).map((provider, index) => (
                      <button
                        key={index}
                        onClick={() => signIn(provider.id)}
                        className='flex right-0 bg-white dark:bg-gray-900 border border-gray-300 rounded-md shadow-md px-6 py-3 text-base font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                      >
                        {/* <FaGoogle className='text-blue-500 mr-2' /> */}
                        <svg
                          className='h-6 w-6 mr-2'
                          xmlns='http://www.w3.org/2000/svg'
                          width='800px'
                          height='800px'
                          viewBox='-0.5 0 48 48'
                          version='1.1'
                        >
                          {' '}
                          {/* Google Button */}
                          <title>Google-color</title>{' '}
                          <desc>Created with Sketch.</desc> <defs> </defs>{' '}
                          <g
                            id='Icons'
                            stroke='none'
                            strokeWidth='1'
                            fill='none'
                            fillRule='evenodd'
                          >
                            {' '}
                            <g
                              id='Color-'
                              transform='translate(-401.000000, -860.000000)'
                            >
                              {' '}
                              <g
                                id='Google'
                                transform='translate(401.000000, 860.000000)'
                              >
                                {' '}
                                <path
                                  d='M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24'
                                  id='Fill-1'
                                  fill='#FBBC05'
                                >
                                  {' '}
                                </path>{' '}
                                <path
                                  d='M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333'
                                  id='Fill-2'
                                  fill='#EB4335'
                                >
                                  {' '}
                                </path>{' '}
                                <path
                                  d='M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667'
                                  id='Fill-3'
                                  fill='#34A853'
                                >
                                  {' '}
                                </path>{' '}
                                <path
                                  d='M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24'
                                  id='Fill-4'
                                  fill='#4285F4'
                                >
                                  {' '}
                                </path>{' '}
                              </g>{' '}
                            </g>{' '}
                          </g>{' '}
                        </svg>
                        <span>Continue with Google</span>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Right Side Menu - LOGGED IN */}
          {session && (
            <div className='absolute right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 md:pr-0'>
              {/* <Link href='/messages' className='relative group'>
                <button
                  type='button'
                  className='relative inline-flex ml-4 items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 overflow-hidden rounded-full'
                >
                  <span className='absolute'></span>
                  <span className='sr-only'>View notifications</span>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
                    />
                  </svg>
                </button>
                <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
                  2
                </span>
              </Link> */}
              {/* Profile Login Avatar Drop Down Button */}
              <div className='inline-flex items-center'>
                <button
                  className='group relative inline-flex items-center gap-2 justify-center whitespace-nowrap md:rounded-full md:border md:border-blue-400 h-10 w-10 text-blue-400 transition-all duration-400 ease-in-out hover:bg-blue-400 hover:text-white hover:shadow-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:ring-opacity-100 active:bg-blue-500 active:scale-90 active:shadow-inner'
                  type='button'
                  onClick={handleClickAndRefresh}
                >
                  <RefreshCw
                    size={18}
                    className={`${
                      isSpinning ? 'animate-spin fast-spin' : ''
                    } transition-transform duration-300`}
                  />
                  <span className='invisible group-hover:visible mt-3 absolute left-1/2 translate-y-full -translate-x-1/2 z-20 scale-0 px-2 py-1 rounded-md border border-gray-200 bg-white text-blue-500 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100 whitespace-nowrap before:absolute before:top-2 before:left-1/2 before:size-3 before:-translate-x-1/2 before:-translate-y-full before:rotate-45 before:bg-white peer-hover:bottom-[3.3rem] peer-hover:opacity-100 peer-hover:duration-500'>
                    <p className='text-center'>Refresh Page</p>
                  </span>
                </button>
                <button
                  ref={buttonRef}
                  className='group relative inline-flex mx-6 items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:bg-blue-400 hover:text-white transition-all duration-400 ease-in-out hover:scale-100 focus:outline-none  active:bg-blue-400 active:scale-90 active:shadow-inner h-10 w-10 rounded-full'
                  type='button'
                  id='user-menu-button'
                  aria-haspopup='true'
                  aria-expanded='false'
                  onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                >
                  <span className='absolute'></span>
                  <span className='sr-only'>Open user menu</span>
                  <span className='invisible group-hover:visible mt-3 absolute left-1/2 translate-y-full -translate-x-1/2 z-20 scale-0 px-2 py-1 rounded-md border border-gray-200 bg-white text-blue-500 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100 whitespace-nowrap before:absolute before:top-2 before:left-1/2 before:size-3 before:-translate-x-1/2 before:-translate-y-full before:rotate-45 before:bg-white peer-hover:bottom-[3.3rem] peer-hover:opacity-100 peer-hover:duration-500'>
                    <p className='text-center'>Profile</p>
                  </span>
                  <Image
                    className='h-10 w-10 rounded-full'
                    src={profileImage || AppleTouch}
                    width={50}
                    height={50}
                    alt='Avatar'
                  />
                </button>
                <span className='text-sm inline-flex mr-2'>
                  <Greeting />{' '}
                  <span className='ml-2'>{session?.user?.name}</span>
                </span>
              </div>
              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div
                  ref={menuRef}
                  id='user-menu'
                  className='absolute right-10 z-10 mt-2 w-48 top-10 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                  role='menu'
                  aria-orientation='vertical'
                  aria-labelledby='user-menu-button'
                  tabIndex='-1'
                >
                  <Link
                    href='/profile'
                    className='block px-4 py-2 text-sm text-gray-700'
                    role='menuitem'
                    tabIndex='-1'
                    id='user-menu-item-0'
                    onClick={() => {
                      setIsProfileMenuOpen(false)
                    }}
                  >
                    Messages
                  </Link>
                  <div className='p-2'>
                    <Link
                      href='/profile/saved'
                      className='flex w-full p-2.5 text-sm gap-2 text-gray-700 items-center ite rounded-md text-dark-4 duration-300 ease-in-out hover:bg-gray-200 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white'
                      role='menuitem'
                      tabIndex='-1'
                      id='user-menu-item-2'
                      onClick={() => {
                        setIsProfileMenuOpen(false)
                      }}
                    >
                      Saved Customers
                    </Link>
                  </div>
                  <div className='p-2'>
                    <button
                      className='flex w-full p-2.5 text-sm gap-2 text-gray-700 items-center ite rounded-md text-dark-4 duration-300 ease-in-out hover:bg-gray-200 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white'
                      role='menuitem'
                      tabIndex='-1'
                      id='user-menu-item-2'
                      onClick={() => {
                        setIsProfileMenuOpen(false)
                        signOut({ callbackUrl: '/', redirect: true })
                      }}
                    >
                      <svg
                        className='fill-current'
                        width='18'
                        height='18'
                        viewBox='0 0 18 18'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <g clipPath='url(#clip0_1815_13085)'>
                          <path
                            d='M11.209 0.9375C10.1833 0.937485 9.35657 0.937473 8.70635 1.02489C8.03127 1.11566 7.46286 1.30983 7.01142 1.76126C6.61773 2.15496 6.4188 2.63877 6.31437 3.20727C6.2129 3.75969 6.19349 4.43572 6.18897 5.24687C6.18724 5.55753 6.43768 5.81076 6.74833 5.81249C7.05899 5.81422 7.31223 5.56379 7.31396 5.25313C7.31852 4.43301 7.33982 3.8517 7.42086 3.41051C7.49895 2.9854 7.62433 2.73935 7.80692 2.55676C8.01449 2.34919 8.30592 2.21385 8.85625 2.13986C9.42276 2.0637 10.1736 2.0625 11.2502 2.0625H12.0002C13.0767 2.0625 13.8276 2.0637 14.3941 2.13986C14.9444 2.21385 15.2358 2.34919 15.4434 2.55676C15.651 2.76433 15.7863 3.05576 15.8603 3.60609C15.9365 4.1726 15.9377 4.92344 15.9377 6V12C15.9377 13.0766 15.9365 13.8274 15.8603 14.3939C15.7863 14.9442 15.651 15.2357 15.4434 15.4432C15.2358 15.6508 14.9444 15.7862 14.3941 15.8601C13.8276 15.9363 13.0767 15.9375 12.0002 15.9375H11.2502C10.1736 15.9375 9.42276 15.9363 8.85625 15.8601C8.30592 15.7862 8.01449 15.6508 7.80692 15.4432C7.62433 15.2607 7.49895 15.0146 7.42086 14.5895C7.33982 14.1483 7.31852 13.567 7.31396 12.7469C7.31223 12.4362 7.05899 12.1858 6.74833 12.1875C6.43768 12.1892 6.18724 12.4425 6.18897 12.7531C6.19349 13.5643 6.2129 14.2403 6.31437 14.7927C6.4188 15.3612 6.61773 15.845 7.01142 16.2387C7.46286 16.6902 8.03127 16.8843 8.70635 16.9751C9.35657 17.0625 10.1833 17.0625 11.209 17.0625H12.0413C13.067 17.0625 13.8937 17.0625 14.544 16.9751C15.2191 16.8843 15.7875 16.6902 16.2389 16.2387C16.6903 15.7873 16.8845 15.2189 16.9753 14.5438C17.0627 13.8936 17.0627 13.0668 17.0627 12.0412V5.95885C17.0627 4.93316 17.0627 4.10641 16.9753 3.45619C16.8845 2.78111 16.6903 2.2127 16.2389 1.76126C15.7875 1.30983 15.2191 1.11566 14.544 1.02489C13.8938 0.937473 13.067 0.937485 12.0413 0.9375H11.209Z'
                            fill=''
                          ></path>
                          <path
                            d='M11.25 8.4375C11.5607 8.4375 11.8125 8.68934 11.8125 9C11.8125 9.31066 11.5607 9.5625 11.25 9.5625H3.02058L4.49107 10.8229C4.72694 11.0251 4.75426 11.3802 4.55208 11.6161C4.34991 11.8519 3.9948 11.8793 3.75893 11.6771L1.13393 9.42708C1.00925 9.32022 0.9375 9.16421 0.9375 9C0.9375 8.83579 1.00925 8.67978 1.13393 8.57292L3.75893 6.32292C3.9948 6.12074 4.34991 6.14806 4.55208 6.38393C4.75426 6.6198 4.72694 6.97491 4.49107 7.17708L3.02058 8.4375H11.25Z'
                            fill=''
                          ></path>
                        </g>
                        <defs>
                          <clipPath id='clip0_1815_13085'>
                            <rect
                              width='18'
                              height='18'
                              rx='5'
                              fill='white'
                            ></rect>
                          </clipPath>
                        </defs>
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* End of Profile Login Avatar Button */}
        </header>
      </div>
    </nav>
  )
}

export default Header
