'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import formatPhoneNumber from '@/app/actions/formatPhoneNumber'
import customerWithCapitalizedNames from '@/app/actions/customerWithCapitalizedNames'
import { formatDate } from '@/utils/formatDate'
import { toast } from 'react-toastify'
import Button from './Button'
import { getSession } from 'next-auth/react'
import { Plus, Trash2 } from 'lucide-react'
import { set } from 'mongoose'
import deleteFleet from '@/app/actions/deleteFleet'

const TableFleetPage = ({ vehicles: initial }) => {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [vehicles, setVehicles] = useState(initial)

   // Sync local state with prop changes
  useEffect(() => {
    setVehicles(initial) // updates the state when prop changes
  }, [initial])

  const handleAddVehicleClick = () => {
    setIsNavigating(true)
    startTransition(() => {
      router.push('/dashboard/company/fleet/add')
    })
  }

  // Handler to delete a vehicle.
  const handleDeleteVehicle = async (vehicleId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this vehicle?'
    )
    if (!confirmed) return

    try {
      await deleteFleet(vehicleId)
      // Update local state by filtering out the deleted vehicle.
      const updatedVehicles = vehicles.filter((vehicle) => vehicle._id !== vehicleId)
      setVehicles({ ...vehicle, vehicles: updatedVehicles })
      toast.success('Vehicle deleted successfully.')
    } catch (error) {
      console.error('Error deleting vehicle:', error)
      toast.error('Failed to delete vehicle.')
    }
  }

  return !vehicles.length === 0 ? (
    <div className='flex items-center justify-center w-full h-full'>
      <h1 className='text-2xl font-semibold text-gray-500'>
        No vehicles found
      </h1>
    </div>
  ) : (
    <>
      <div className='md:container w-full text-left px-15 mx-auto md:rounded-2xl'>
        <div className='container flex items-center justify-between px-2 py-2 text-md md:text-md text-blue-500 font-semibold'>
          <h1>Vehicles List</h1>

          <Button
            icon={<Plus className='h-4 w-4 text-xs hover:text-white' />}
            onClick={() => handleAddVehicleClick()}
            disabled={isPending || isNavigating}
          >
            {isNavigating || isPending ? (
              <span className='animate-pulse'>Loading...</span>
            ) : (
              'Add New'
            )}
          </Button>
        </div>

        <div className='container mx-auto px-4 m-0 border border-gray-300 rounded-lg'>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
              <thead className='text-left'>
                <tr>
                  <th className='whitespace-nowrap px-4 py-3 text-sm text-gray-600 font-semibold'>
                    VIN Number
                  </th>
                  <th className='whitespace-nowrap px-4 py-3 font-sm text-gray-600'>
                    Year
                  </th>
                  <th className='whitespace-nowrap px-4 py-3 text-center font-sm text-gray-600'>
                    Brand
                  </th>
                  <th className='whitespace-nowrap px-4 py-3 pl-8 font-sm text-gray-600'>
                    Model
                  </th>
                  <th className='whitespace-nowrap px-4 py-3 font-sm text-gray-600'>
                    License
                  </th>
                  <th className='whitespace-nowrap px-4 py-3 font-sm text-gray-600'>
                    FasTrack
                  </th>
                  <th className='whitespace-nowrap px-4 py-2 font-sm text-gray-700'>
                    Department
                  </th>
                  <th className='whitespace-nowrap px-4 py-2 font-sm text-gray-700'>
                    Driver
                  </th>
                  <th className='whitespace-nowrap px-4 py-2 font-sm text-gray-700'>
                    Purchase Date
                  </th>
                  <th className='whitespace-nowrap px-4 py-2 font-sm text-gray-700'>
                    End Date
                  </th>
                  <th className='whitespace-nowrap px-4 py-3 font-sm text-gray-600'>
                    Status
                  </th>
                  <th className='whitespace-nowrap px-4 py-3 font-sm text-gray-600'>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className='divide-y divide-gray-200'>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle._id}>
                    <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                      <Link
                        href={`/dashboard/company/fleet/${vehicle._id}`}
                        className='block'
                      >
                        {vehicle.vin}
                      </Link>
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                      <Link
                        href={`/dashboard/company/fleet/${vehicle._id}`}
                        className='block'
                      >
                        {vehicle.year}
                      </Link>
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                      <Link
                        href={`/dashboard/company/fleet/${vehicle._id}`}
                        className='block'
                      >
                        {vehicle.brand}
                      </Link>
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                      <Link
                        href={`/dashboard/company/fleet/${vehicle._id}`}
                        className='block'
                      >
                        {vehicle.model}
                      </Link>
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                      <Link
                        href={`/dashboard/company/fleet/${vehicle._id}`}
                        className='block'
                      >
                        {vehicle.license}
                      </Link>
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                      <Link
                        href={`/dashboard/company/fleet/${vehicle._id}`}
                        className='block'
                      >
                        {vehicle.fasTrack}
                      </Link>
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                      <Link
                        href={`/dashboard/company/fleet/${vehicle._id}`}
                        className='block'
                      >
                        {vehicle.department}
                      </Link>
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                      <Link
                        href={`/dashboard/company/fleet/${vehicle._id}`}
                        className='block'
                      >
                        {vehicle.driver}
                      </Link>
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                      <Link
                        href={`/dashboard/company/fleet/${vehicle._id}`}
                        className='block'
                      >
                        {formatDate(vehicle.purchaseDate)}
                      </Link>
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                      <Link
                        href={`/dashboard/company/fleet/${vehicle._id}`}
                        className='block'
                      >
                        {formatDate(vehicle.endDate)}
                      </Link>
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                      <Link
                        href={`/dashboard/company/fleet/${vehicle._id}`}
                        className='block'
                      >
                        {vehicle.status}
                      </Link>
                    </td>


                    <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                      <Button
                    icon={<Trash2 className='w-5 h-5 flex items-center text-center' />}
            onClick={() => handleDeleteVehicle(vehicle._id)}
            disabled={isPending || isNavigating}
          >
            {isNavigating || isPending ? (
              <span className='animate-pulse'>Loading...</span>
            ) : (
              '...'
            )}
          </Button>
                    </td>

                    
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default TableFleetPage
