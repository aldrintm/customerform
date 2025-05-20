import Header from '@/components/Header'
import SideNavbar from '@/components/SideNavbar'
import CustomerForm from '@/components/CustomerForm'
import Link from 'next/link'
import Button from '@/components/Button'

const CompanyPage = () => {
  return (
    <section>
      <SideNavbar />
      <Header />
      <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14'>
        <div className='container mx-auto flex flex-col gap-4 py-4 px-2'>
          <Link href='/dashboard/company/employees'>
            <Button>
              <h1>Employees</h1>
            </Button>
          </Link>
          <Link href='/dashboard/company/fleet'>
            <Button>
              <h1>Fleet</h1>
            </Button>
          </Link>
        </div>
      </main>
    </section>
  )
}
export default CompanyPage
