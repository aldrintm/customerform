import ProjectForm from '@/components/ProjectForm'
import SideNavbar from '@/components/SideNavbar'
import Header from '@/components/Header'

const AddCustomer = () => {
  return (
    <section>
      <SideNavbar />
      <Header />
      <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14'>
        <ProjectForm />
      </main>
    </section>
  )
}
export default AddCustomer
