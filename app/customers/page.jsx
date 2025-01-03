import TableComponentPage from '@/components/TableComponent'
import { redirect } from 'next/navigation'
import SideNavbar from '@/components/SideNavbar'
import Header from '@/components/Header'

const newCustomerForm = async () => {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:ml-14'>
        <TableComponentPage />
      </main>
    </div>
  )
}

export default newCustomerForm
