import MessageForm from '@/components/MessageForm'
import SideNavbar from '@/components/SideNavbar'
import Header from '@/components/Header'
import MessageCard from '@/components/MessageCard'

const AddCustomer = () => {
  return (
    <section>
      <SideNavbar />
      <Header />
      <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14'>
        <MessageForm />
      </main>
    </section>
  )
}
export default AddCustomer
