import Skater from '@/assets/images/skate-skateboard.gif'
import Image from 'next/image'
import Button from '@/components/Button'
import { Undo2 } from 'lucide-react'
import Link from 'next/link'

const NotFoundpage = () => {
  return (
    <>
      {/*
    Graphic from https://www.opendoodles.com/
*/}

      <div className='grid h-screen place-content-center bg-white'>
        <Image src={Skater} alt='Page Not Found' className='rounded-3xl' />
        <div className='text-center'>
          <h1 className='mt-6 text-2xl font-semibold tracking-tight text-gray-500 sm:text-4xl'>
            uh oh{' '}
          </h1>

          <p className='p-6 text-gray-500'>nothing to see here</p>
          <Link href='/'>
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

export default NotFoundpage
