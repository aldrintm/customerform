import Header from '@/components/Header'
import SideNavbar from '@/components/SideNavbar'
import ProjectForm from '@/components/ProjectForm'
import connectDB from '@/config/db'
import Customer from '@/models/Customer'
import { convertToSerializeableObject } from '@/utils/convertToObject'

const AddProjectPage = async ({ params }) => {
  const { id } = await params
  await connectDB

  const customerDocs = await Customer.findById(id).lean()
  const customer = convertToSerializeableObject(customerDocs)
  console.log(customer)

  if (!customer) {
    return (
      <>
        <div className='flex min-h-screen w-full flex-col'>
          <Header />
          <SideNavbar />
          <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14'>
            <h1 className='text-center text-2xl font-bold mt-10'>
              Customer Not Found
            </h1>
          </main>
        </div>
      </>
    )
  }
  return (
    <>
      <div className='flex min-h-screen w-full flex-col'>
        <Header />
        <SideNavbar />
        <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14'>
          <ProjectForm customer={customer} />
        </main>
      </div>
    </>
  )
}
export default AddProjectPage
