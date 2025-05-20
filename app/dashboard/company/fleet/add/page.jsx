import Header from '@/components/Header'
import SideNavbar from '@/components/SideNavbar'
import FleetForm from '@/components/FleetForm'

const AddFleetPage = () => {
  return (
    <section>
      <SideNavbar />
      <Header />
      <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14'>
        <FleetForm />
      </main>
    </section>
  )
}
export default AddFleetPage
