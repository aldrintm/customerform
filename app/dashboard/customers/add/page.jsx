import Header from '@/components/Header'
import SideNavbar from '@/components/SideNavbar'
import CustomerForm from '@/components/CustomerForm'

const AddCustomerPage = () => {
  return (
    <section>
      <SideNavbar />
      <Header />
      <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14'>
        <CustomerForm />
      </main>
    </section>
  )
}
export default AddCustomerPage
