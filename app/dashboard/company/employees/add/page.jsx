import Header from '@/components/Header'
import SideNavbar from '@/components/SideNavbar'
import EmployeeForm from '@/components/EmployeeForm'

const AddEmployeePage = () => {
  return (
    <section>
      <SideNavbar />
      <Header />
      <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14'>
        <EmployeeForm />
      </main>
    </section>
  )
}
export default AddEmployeePage
