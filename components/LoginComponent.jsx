'use client'

import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const LoginComponent = () => {
  // initialize session
  const { data: session } = useSession()

  // set state for the providers
  const [providers, setProviders] = useState(null)

  // set provider using getProvider from next-auth
  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    setAuthProviders()
  }, [])

  return (
    <div className='mx-auto max-w-screen-md px-4 py-20 md:py-36'>
      <div className='mx-auto max-w-lg text-center'>
        <h1 className='text-2xl font-bold sm:text-4xl'>Goodmorning!</h1>

        <p className='mt-2 text-gray-700'>Ready to login?</p>
      </div>

      <form action='#' className='mx-auto mb-0 mt-8 max-w-md space-y-4'>
        <div>
          <label htmlFor='email' className='sr-only'>
            Email
          </label>

          <div className='relative'>
            <input
              type='email'
              className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
              placeholder='Enter email'
            />

            <span className='absolute inset-y-0 end-0 grid place-content-center px-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='size-4 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label htmlFor='password' className='sr-only'>
            Password
          </label>

          <div className='relative'>
            <input
              type='password'
              className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
              placeholder='Enter password'
            />

            <span className='absolute inset-y-0 end-0 grid place-content-center px-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='size-4 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Google Button */}
        <div className='flex items-center justify-center bg-white dark:bg-gray-900 border border-gray-300 rounded-md shadow-md px-8 py-3 text-base font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'>
          <div className=''>
            <div className='flex items-center'>
              {providers &&
                Object.values(providers).map((provider, index) => (
                  <button
                    key={index}
                    onClick={() => signIn(provider._id)}
                    className='flex items-center '
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
      </form>
    </div>
  )
}

export default LoginComponent
