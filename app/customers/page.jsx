import SideNavbar from '@/components/SideNavbar'
import NewCustomerForm from '@/components/CustomerForm'
import TableComponentPage from '@/components/TableComponent'
import Header from '@/components/Header'
import Breadcrumb from '@/components/BreadCrumb'

const newCustomerForm = () => {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <SideNavbar />
      <Header />
      <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14'>
        <NewCustomerForm />
        <TableComponentPage />
      </main>
    </div>
  )
}

export default newCustomerForm
