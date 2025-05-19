'use client'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import { usePathname } from 'next/navigation'
import {
  Home,
  Files,
  Globe,
  UserRoundPlus,
  ArrowDownToLine,
  Archive,
  ClipboardList,
  Calendar1,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2,
} from 'lucide-react'

const SideNavbar = () => {
  const pathname = usePathname()

  return (
    <>
      <section className='print:hidden'>
        {/* Desktop Navbar */}
        <aside className='fixed inset-y-0 py-2 left-0 z-10 w-14 hidden flex-col border-r sm:flex'>
          <nav className='flex flex-col items-center gap-6 px-2 sm:py-5 sm:pt-14'>
            <Link
              className='group relative flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
              href='https://www.plamarusa.com'
            >
              {/* <svg
                className='h-3 w-3 transition-all group-hover:scale-110'
                aria-label='Vercel logomark'
                height='64'
                role='img'
                viewBox='0 0 74 64'
              >
                <path
                  d='M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z'
                  fill='currentColor'
                ></path>
              </svg> */}
              <Globe className='h-5 w-5 text-blue-500' />
              <span className='sr-only'>Plamar USA</span>
              <span className='invisible group-hover:visible absolute ms-1 start-full top-1/2 -translate-y-1/2 z-20 scale-0 px-2 py-1.5 rounded-md border border-gray-200 bg-white text-blue-500 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100 whitespace-nowrap before:absolute before:top-1/2 before:left-0 before:w-3 before:h-3 before:-translate-x-1/2 before:border-l before:border-gray-200 before:-translate-y-1/2 before:rotate-45 before:bg-white before:shadow-md'>
                plamarusa.com
              </span>
            </Link>
            <Link
              className={`group relative flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                pathname === '/dashboard'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-blue-500 hover:text-foreground'
              }`}
              href='/dashboard'
            >
              {/* <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-house h-5 w-5'
              >
                <path d='M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8'></path>
                <path d='M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path>
              </svg> */}
              <Home className='h-5 w-5' />
              <span className='sr-only'>Dashboard</span>
              <span className='invisible group-hover:visible absolute ms-1 start-full top-1/2 -translate-y-1/2 z-20 scale-0 px-2 py-1.5 rounded-md border border-gray-200 bg-white text-blue-500 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100 whitespace-nowrap before:absolute before:top-1/2 before:left-0 before:w-3 before:h-3 before:-translate-x-1/2 before:border-l before:border-gray-200 before:-translate-y-1/2 before:rotate-45 before:bg-white before:shadow-md'>
                Main Dashboard
              </span>
            </Link>

            <Link
              className={`group relative flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                pathname === '/dashboard/customers'
                  ? 'bg-blue-500 text-white rounded-full'
                  : 'text-blue-500 hover:text-foreground'
              }`}
              href='/dashboard/customers'
            >
              <Files className='h-5 w-5' />
              <span className='sr-only'>Customers</span>
              <span className='invisible group-hover:visible absolute ms-1 start-full top-1/2 -translate-y-1/2 z-20 scale-0 px-2 py-1.5 rounded-md border border-gray-200 bg-white text-blue-500 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100 whitespace-nowrap before:absolute before:top-1/2 before:left-0 before:w-3 before:h-3 before:-translate-x-1/2 before:border-l before:border-gray-200 before:-translate-y-1/2 before:rotate-45 before:bg-white before:shadow-md'>
                Customer List
              </span>
            </Link>
            <Link
              className={`group relative flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                pathname === '/dashboard/files'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-blue-500 hover:text-foreground'
              }`}
              href='/dashboard/files'
            >
              {/* <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-shopping-cart h-5 w-5'
              >
                <circle cx='8' cy='21' r='1'></circle>
                <circle cx='19' cy='21' r='1'></circle>
                <path d='M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12'></path>
              </svg> */}
              <ArrowDownToLine className='h-5 w-5' />
              <span className='sr-only'>Files</span>
              <span className='invisible group-hover:visible absolute ms-1 start-full top-1/2 -translate-y-1/2 z-20 scale-0 px-2 py-1.5 rounded-md border border-gray-200 bg-white text-blue-500 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100 whitespace-nowrap before:absolute before:top-1/2 before:left-0 before:w-3 before:h-3 before:-translate-x-1/2 before:border-l before:border-gray-200 before:-translate-y-1/2 before:rotate-45 before:bg-white before:shadow-md'>
                Office Files
              </span>
            </Link>
            <Link
              className={`group relative flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                pathname === '/dashboard/inventory'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-blue-500 hover:text-foreground'
              }`}
              href='/dashboard/inventory'
            >
              {/* <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-package h-5 w-5'
              >
                <path d='m7.5 4.27 9 5.15'></path>
                <path d='M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z'></path>
                <path d='m3.3 7 8.7 5 8.7-5'></path>
                <path d='M12 22V12'></path>
              </svg> */}
              <Archive className='h-5 w-5' />
              <span className='sr-only'>Inventory</span>
              <span className='invisible group-hover:visible absolute ms-1 start-full top-1/2 -translate-y-1/2 z-20 scale-0 px-2 py-1.5 rounded-md border border-gray-200 bg-white text-blue-500 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100 whitespace-nowrap before:absolute before:top-1/2 before:left-0 before:w-3 before:h-3 before:-translate-x-1/2 before:border-l before:border-gray-200 before:-translate-y-1/2 before:rotate-45 before:bg-white before:shadow-md'>
                Slab Inventory
              </span>
            </Link>
            <Link
              className={`group relative flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                pathname === '/dashboard/customers/add'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-blue-500 hover:text-foreground'
              }`}
              href='/dashboard/customers/add'
            >
              {/* <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-users-round h-5 w-5'
              >
                <path d='M18 21a8 8 0 0 0-16 0'></path>
                <circle cx='10' cy='8' r='5'></circle>
                <path d='M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3'></path>
              </svg> */}
              <UserRoundPlus className='h-5 w-5' />

              <span className='invisible group-hover:visible absolute ms-1 start-full top-1/2 -translate-y-1/2 z-20 scale-0 px-2 py-1.5 rounded-md border border-gray-200 bg-white text-blue-500 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100 whitespace-nowrap before:absolute before:top-1/2 before:left-0 before:w-3 before:h-3 before:-translate-x-1/2 before:border-l before:border-gray-200 before:-translate-y-1/2 before:rotate-45 before:bg-white before:shadow-md'>
                Create Customer
              </span>
            </Link>
            <Link
              className={`group relative flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                pathname === '/dashboard/calendar'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-blue-500 hover:text-foreground'
              }`}
              href='/dashboard/calendar'
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
                className='lucide lucide-calendar-1 h-5 w-5'
              >
                <path d='M11 14h1v4' />
                <path d='M16 2v4' />
                <path d='M3 10h18' />
                <path d='M8 2v4' />
                <rect x='3' y='4' width='18' height='18' rx='2' />
              </svg>
              {/* <Calendar1 className='h-5 w-5 text-blue-500' /> */}
              <span className='sr-only'>Calendar</span>
              <span className='invisible group-hover:visible absolute ms-1 start-full top-1/2 -translate-y-1/2 z-20 scale-0 px-2 py-1.5 rounded-md border border-gray-200 bg-white text-blue-500 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100 whitespace-nowrap before:absolute before:top-1/2 before:left-0 before:w-3 before:h-3 before:-translate-x-1/2 before:border-l before:border-gray-200 before:-translate-y-1/2 before:rotate-45 before:bg-white before:shadow-md'>
                Calendar
              </span>
            </Link>
            {/* This is the old Clipboard Icon for tasks - we will retire this for now and come back to it later */}
            {/* <Link
              className={`group relative flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                pathname === '/tasks'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-blue-500 hover:text-foreground'
              }`}
              href='/tasks'
            >
              <ClipboardList className='h-5 w-5' />
              <span className='sr-only'>Task To Do</span>

              <span className='invisible group-hover:visible absolute ms-1 start-full top-1/2 -translate-y-1/2 z-20 scale-0 px-2 py-1.5 rounded-md border border-gray-200 bg-white text-blue-500 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100 whitespace-nowrap before:absolute before:top-1/2 before:left-0 before:w-3 before:h-3 before:-translate-x-1/2 before:border-l before:border-gray-200 before:-translate-y-1/2 before:rotate-45 before:bg-white before:shadow-md'>
                Tasks to do
              </span>
            </Link> */}
            {/* <Link
              className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
              data-state='closed'
              href='#'
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
                className='lucide lucide-line-chart h-5 w-5'
              >
                <path d='M3 3v18h18'></path>
                <path d='m19 9-5 5-4-4-3 3'></path>
              </svg>
              <span className='sr-only'>Analytics</span>
            </Link> */}
          </nav>
          <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
            <Link
              className={`group relative flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                pathname === '/settings'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-blue-500 hover:text-foreground'
              }`}
              href='/settings'
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
                className='lucide lucide-settings h-5 w-5'
              >
                <path d='M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z'></path>
                <circle cx='12' cy='12' r='3'></circle>
              </svg>
              <span className='sr-only'>Settings</span>
              <span className='invisible group-hover:visible absolute ms-1 start-full top-1/2 -translate-y-1/2 z-20 scale-0 px-2 py-1.5 rounded-md border border-gray-200 bg-white text-blue-500 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100 whitespace-nowrap before:absolute before:top-1/2 before:left-0 before:w-3 before:h-3 before:-translate-x-1/2 before:border-l before:border-gray-200 before:-translate-y-1/2 before:rotate-45 before:bg-white before:shadow-md'>
                Settings
              </span>
            </Link>
          </nav>
        </aside>
      </section>
    </>
  )
}

export default SideNavbar
