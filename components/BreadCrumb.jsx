'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FaHome } from 'react-icons/fa'

const Breadcrumb = () => {
  // initialize
  const path = usePathname()
  const searchParams = useSearchParams()

  // Get the current path

  const pathWithoutQuery = path.includes('?') ? path.split('?')[0] : path

  const pathSegments = pathWithoutQuery.split('/').filter((segment) => segment) // Split path into segments

  // console.log(pathSegments)

  return (
    <nav aria-label='Breadcrumb' className='hidden md:flex'>
      <ul className='flex'>
        <li className='inline-flex'>
          <Link href='/'>
            <p className='text-xs text-gray-600 font-normal'>Home</p>
          </Link>
        </li>

        {pathSegments.map((segment, index) => {
          const fullPath = '/' + pathSegments.slice(0, index + 1).join('/')
          {
            /* console.log(fullPath) */
          }
          return (
            <li key={index} className='ml-2 inline-flex space-x-2'>
              <span className='text-xs text-gray-600 font-normal'>/</span>
              <Link href={fullPath}>
                <p className='text-xs text-gray-600 font-normal'>
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </p>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Breadcrumb
