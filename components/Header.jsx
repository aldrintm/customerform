'use client'
import { useState, useEffect } from 'react'
import { FaRegUser, FaGoogle } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import AppleTouch from '@/assets/images/apple-touch-icon.png'
import Breadcrumb from './BreadCrumb'
import OpenMapButton from '@/app/actions/openMapButton'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Header = () => {
  // get data as session from useSession from next-auth
  const { data: session } = useSession()
  // use '?' for optional chaining so we dont get thrown an error here
  const profileImage = session?.user?.image
  // set state here
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isLoggedin, setIsLoggedIn] = useState(false)
  const [providers, setProviders] = useState(null)

  const pathname = usePathname()

  // set provider using getProvider from next-auth
  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    setAuthProviders()
  }, [])

  return (
    <nav>
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
          {session && <Breadcrumb />}
          {/* <OpenMapButton /> */}
          {/* Add a Google Button if NOT logged in */}
          {/* Search Form Starts Here */}
          {session && (
            <form
              className='hidden sm:block relative ml-auto flex-1 md:grow-0'
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
                placeholder='Search for customers...'
                className='flex h-10 mt-1 w-full rounded-md border border-input border-gray-300 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 bg-background pl-8 md:w-[200px] lg:w-[336px]'
              />
            </form>
          )}
          {/*  Right Side Menu (Logged Out) Google Button */}

          {/* Google Button */}
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
              <Link href='/messages' className='relative group'>
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
                  {/* <!-- Replace with the actual number of notifications --> */}
                </span>
              </Link>

              {/* Profile Login Avatar Drop Down Button */}

              <div className='px-1'>
                <button
                  className='relative inline-flex ml-4 items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 overflow-hidden rounded-full'
                  type='button'
                  id='user-menu-button'
                  aria-haspopup='true'
                  aria-expanded='false'
                  onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                >
                  <span className='absolute'></span>
                  <span className='sr-only'>Open user menu</span>
                  <Image
                    className='h-8 w-8 rounded-full'
                    src={profileImage || AppleTouch}
                    width={40}
                    height={40}
                    alt='Avatar'
                  />
                  {/* <FaRegUser className='text-xl text-blue-500 font-bold' /> */}
                </button>
              </div>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div
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
                  >
                    Profile
                  </Link>
                  <Link
                    href='/customers/saved'
                    className='block px-4 py-2 text-sm text-gray-700'
                    role='menuitem'
                    tabIndex='-1'
                    id='user-menu-item-2'
                  >
                    Saved Customers
                  </Link>
                  <button
                    className='block px-4 py-2 text-sm text-gray-700'
                    role='menuitem'
                    tabIndex='-1'
                    id='user-menu-item-2'
                    onClick={() => {
                      setIsProfileMenuOpen(false)
                      signOut({ callbackUrl: '/', redirect: true })
                    }}
                  >
                    Sign Out
                  </button>
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
