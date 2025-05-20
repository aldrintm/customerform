'use server'
import SideNavbar from '@/components/SideNavbar'
import Header from '@/components/Header'
import connectDB from '@/config/db'
import Employee from '@/models/Employee'
import TableEmployees from '@/components/TableEmployees'
import { convertToSerializeableObject } from '@/utils/convertToObject'

const EmployeeList = async () => {
  await connectDB()

  const employeesDocs = await Employee.find({})
    .sort({ createdAt: -1 })
    .limit()
    .lean()

  const employees = employeesDocs.map(convertToSerializeableObject)

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <SideNavbar />
      <Header />
      <main className='flex flex-col sm:gap-4 sm:py-0 sm:ml-14 sm:px-2 md:px-4 lg:px-6 xl:px-8'>
        <TableEmployees employees={employees} />
      </main>
    </div>
  )
}

export default EmployeeList
