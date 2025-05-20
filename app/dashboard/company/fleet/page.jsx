'use server'
import SideNavbar from '@/components/SideNavbar'
import Header from '@/components/Header'
import connectDB from '@/config/db'
import Fleet from '@/models/Fleet'
import TableFleetPage from '@/components/TableFleet'
import { convertToSerializeableObject } from '@/utils/convertToObject'

const FleetList = async () => {
  await connectDB()

  const fleetDocs = await Fleet.find({}).sort({ createdAt: -1 }).limit().lean()

  const vehicles = fleetDocs.map(convertToSerializeableObject)

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <SideNavbar />
      <Header />
      <main className='flex flex-col sm:gap-4 sm:py-0 sm:ml-14 sm:px-2 md:px-4 lg:px-6 xl:px-8'>
        <TableFleetPage vehicles={vehicles} />
      </main>
    </div>
  )
}

export default FleetList
