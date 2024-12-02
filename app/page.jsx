import Link from 'next/link'
import Dashboard from '@/components/Dashboard'
import SideNavbar from '@/components/SideNavbar'
import Header from '@/components/Header'

const HomePage = () => {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <SideNavbar />
      <Header />
      <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:ml-14'>
        <Dashboard />
      </main>
    </div>
  )
}

export default HomePage
