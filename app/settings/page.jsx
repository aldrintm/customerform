import SideNavbar from '@/components/SideNavbar'
import Header from '@/components/Header'

const Settings = () => {
  return (
    <section>
      <SideNavbar />
      <Header />
      <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14'>
        <div className='container max-w-4xl mx-auto text-center mt-20 px-1 py-10 rounded-2xl'>
          <span className='text-4xl font-semibold '>Settings Page</span>
          <h3 className='p-4'>This page is under construction.</h3>
          <p>In the meantime, please visit our site</p>
          <div className='container mx-auto p-8'>
            <span className='flex items-center'>
              <span className='h-px flex-1 bg-black'></span>
              <span className='shrink-0 px-6'>www.plamarusa.com</span>
              <span className='h-px flex-1 bg-black'></span>
            </span>
          </div>
        </div>
      </main>
    </section>
  )
}
export default Settings
