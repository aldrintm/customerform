'use client'

import { TriangleAlert } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/Button'
import { Undo2 } from 'lucide-react'

const ErrorPage = ({ error }) => {
  return (
    <>
      <div className='grid h-screen place-content-center bg-white px-4'>
        <div className='grid grid-cols justify-items-center'>
          <TriangleAlert className='w-24 h-24 text-orange-500' />

          <h1 className='mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Something Went Wrong
          </h1>

          <p className='mt-4 text-gray-500'>{error.toString()}</p>
          <Link href='/' className='p-8'>
            <Button
              icon={<Undo2 className='h-4 w-4 text-xs hover:text-white' />}
            >
              Go Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default ErrorPage
