import Header from '@/components/Header'
import SideNavbar from '@/components/SideNavbar'

const ProfilePage = () => {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Header />
      <SideNavbar />
      <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14'>
        <h1 className='text-center text-2xl font-bold mt-10'>
          Profile Page (work on this)
        </h1>
      </main>
    </div>
  )
}

export default ProfilePage
