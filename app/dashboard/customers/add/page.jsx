import NewCustomerForm from '@/components/CustomerForm'
import SideNavbar from '@/components/SideNavbar'
import Header from '@/components/Header'

const AddCustomerPage = () => {
  return (
    <section>
      <SideNavbar />
      <Header />
      <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14'>
        <NewCustomerForm />
      </main>
    </section>
  )
}
export default AddCustomerPage
