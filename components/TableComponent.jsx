'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import formatPhoneNumber from '@/app/actions/formatPhoneNumber'
import deleteCustomer from '@/app/actions/deleteCustomer'
import customerWithCapitalizedNames from '@/app/actions/customerWithCapitalizedNames'

import { toast } from 'react-toastify'
import Button from './Button'
import { getSession } from 'next-auth/react'
import { Plus, Trash2 } from 'lucide-react'
import { set } from 'mongoose'

const TableComponentPage = ({ customers }) => {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleAddCustomerClick = () => {
    setIsNavigating(true)
    startTransition(() => {
      router.push('/dashboard/customers/add')
    })
  }

  const handleDeleteCustomer = async (customerId) => {
    // Find the customer before deleting to get their name for the toast
    const customerToDelete = customers.find(
      (customer) => customer._id === customerId
    )
    if (!customerToDelete) {
      toast.error('Customer not found')
      return
    }

    const customerName = customerWithCapitalizedNames(
      customerToDelete.firstName + ' ' + customerToDelete.lastName
    )

    const confirmed = window.confirm(
      'Are you sure you want to delete this customer?'
    )

    if (!confirmed) return

    try {
      // Call the deleteCustomer function (only pass customerId)
      console.log('Calling deleteCustomer with ID:', customerId)

      const result = await deleteCustomer(customerId)

      console.log('Result from deleteCustomer:', result)

      if (result && result.success === true) {
        router.refresh()
        toast.success(`Customer ${customerName} successfully deleted!`)
      } else if (result && result.success === false) {
        // Handle the error response from the server action
        console.log('Server returned error:', result.error)

        toast.error(result.error || `Failed to delete customer ${customerName}`)
      } else {
        // Handle unexpected result format
        console.log('Unexpected result format:', result)
        toast.error(`Failed to delete customer ${customerName}`)
      }
    } catch (error) {
      console.error('Delete customer error:', error)
      // Handle any other errors that might occur
      toast.error(
        'You are not authorized to delete this customer. Admin access required.'
      )
    }
  }

  return (
    <>
      <div className='md:container w-full text-left px-15 mx-auto md:rounded-2xl'>
        <div className='container flex items-center justify-between px-2 py-2 text-md md:text-md text-blue-500 font-semibold'>
          <h1>Customers List</h1>

          <Button
            icon={<Plus className='h-4 w-4 text-xs hover:text-white' />}
            onClick={() => handleAddCustomerClick()}
            disabled={isPending || isNavigating}
          >
            {isNavigating || isPending ? (
              <span className='animate-pulse'>Loading...</span>
            ) : (
              <span className='pl-2'>Create New</span>
            )}
          </Button>
        </div>

        <div className='container mx-auto px-4 m-0 border border-gray-300 rounded-lg'>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
              <thead className='text-left'>
                <tr>
                  {/* <th className='whitespace-nowrap px-4 py-3 text-sm text-gray-600 font-semibold'>
                    First Name
                  </th>
                  <th className='whitespace-nowrap px-4 py-3 font-sm text-gray-600'>
                    Last Name
                  </th> */}
                  <th className='whitespace-nowrap px-4 py-3 font-sm text-gray-600'>
                    Customer
                  </th>
                  <th className='whitespace-nowrap px-4 py-3 text-center font-sm text-gray-600'>
                    Status
                  </th>

                  <th className='whitespace-nowrap px-4 py-3 pl-8 font-sm text-gray-600'>
                    Address
                  </th>
                  <th className='whitespace-nowrap px-4 py-3 font-sm text-gray-600'>
                    Phone/Email
                  </th>
                  {/* <th className='whitespace-nowrap px-4 py-2 font-sm text-gray-700'>
                    Email
                  </th> */}

                  <th className='whitespace-nowrap px-4 py-3 font-sm text-gray-600'>
                    Store
                  </th>

                  <th className='whitespace-nowrap px-4 py-3 font-sm text-gray-600'>
                    Created By
                  </th>

                  <th className='whitespace-nowrap px-4 py-3 font-sm text-gray-600'>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className='divide-y divide-gray-200'>
                {customers.map((customer) => (
                  <tr key={customer._id}>
                    {/* <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                      <Link
                        href={`/dashboard/customers/${customer._id}`}
                        className='block'
                      >
                        {customerWithCapitalizedNames(customer.firstName)}
                      </Link>
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                      <Link
                        href={`/dashboard/customers/${customer._id}`}
                        className='block'
                      >
                        {customerWithCapitalizedNames(customer.lastName)}
                      </Link>
                    </td> */}

                    <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                      <Link
                        href={`/dashboard/customers/${customer._id.toString()}`}
                        className='block'
                      >
                        {customerWithCapitalizedNames(customer.lastName)},{' '}
                        {customerWithCapitalizedNames(customer.firstName)}
                      </Link>
                    </td>

                    <td className='whitespace-nowrap px-0 py-0 text-sm'>
                      <Link
                        href={`/dashboard/customers/${customer._id}`}
                        className='block'
                      >
                        {customer.projects?.[0]?.status === 'will call' ? (
                          <div className='px-0 py-1 text-center md:text-sm bg-green-100 text-green-500 rounded-full'>
                            will call
                          </div>
                        ) : customer.projects?.[0]?.status ===
                          'for template' ? (
                          <div className='px-2 py-1 text-center md:text-sm bg-blue-100 text-blue-500 rounded-full'>
                            for template
                          </div>
                        ) : customer.projects?.[0]?.status === 'templated' ? (
                          <div className='px-2 py-1 text-center md:text-sm bg-gradient-to-r from-emerald-400 to-green-400 text-white rounded-full'>
                            templated
                          </div>
                        ) : customer.projects?.[0]?.status ===
                          'material order' ? (
                          <div className='px-0 py-1 text-center md:text-sm bg-amber-100 text-amber-500 rounded-full'>
                            material order
                          </div>
                        ) : customer.projects?.[0]?.status ===
                          'need additional' ? (
                          <div className='px-0 py-1 text-center md:text-sm bg-fuchsia-100 text-fuchsia-500 rounded-full'>
                            need additional
                          </div>
                        ) : customer.projects?.[0]?.status ===
                          'seam diagram' ? (
                          <div className='px-0 py-1 text-center md:text-sm bg-rose-100 text-rose-500 rounded-full'>
                            seam diagram
                          </div>
                        ) : customer.projects?.[0]?.status ===
                          'in fabrication' ? (
                          <div className='px-0 py-1 text-center md:text-sm bg-teal-100 text-teal-500 rounded-full'>
                            in fabrication
                          </div>
                        ) : customer.projects?.[0]?.status === 'hold' ? (
                          <div className='px-0 py-1 text-center md:text-sm bg-slate-100 text-slate-500 rounded-full'>
                            hold
                          </div>
                        ) : customer.projects?.[0]?.status === 'pending' ? (
                          <div className='px-0 py-1 text-center md:text-sm bg-stone-100 text-stone-500 rounded-full'>
                            pending
                          </div>
                        ) : customer.projects?.[0]?.status === 'for demo' ? (
                          <div className='px-2 py-1 text-center md:text-sm bg-fuchsia-100 text-fuchsia-500 rounded-full'>
                            for demo
                          </div>
                        ) : customer.projects?.[0]?.status === 'for install' ? (
                          <div className='px-0 py-1 text-center md:text-sm bg-orange-100 text-orange-500 rounded-full'>
                            for install
                          </div>
                        ) : customer.projects?.[0]?.status === 'service' ? (
                          <div className='px-0 py-1 text-center md:text-sm bg-indigo-100 text-indigo-500 rounded-full'>
                            service
                          </div>
                        ) : customer.projects?.[0]?.status === 'completed' ? (
                          <div className='px-0 py-1 text-center md:text-sm bg-cyan-100 text-cyan-500 rounded-full'>
                            completed
                          </div>
                        ) : customer.projects?.[0]?.status === 'cancelled' ? (
                          <div className='px-2 py-1 text-center md:text-sm bg-gradient-to-r from-rose-400 to-red-300 text-white rounded-full'>
                            cancelled
                          </div>
                        ) : customer.projects?.[0]?.status === '' ? (
                          <div className='px-0 py-1 text-center md:text-sm bg-cyan-100 text-cyan-500 rounded-full'></div>
                        ) : null}
                      </Link>
                    </td>

                    <td className='whitespace-nowrap px-4 py-2 pl-8 text-sm text-gray-700'>
                      <Link
                        href={`/dashboard/customers/${customer._id}`}
                        className='block'
                      >
                        <div className='grid grid-rows-2'>
                          <p>{customer.address.street}</p>
                          <p>
                            {customer.address.city} {customer.address.state}{' '}
                            {customer.address.zipcode}
                          </p>
                        </div>
                      </Link>
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                      <Link
                        href={`/dashboard/customers/${customer._id}`}
                        className='block'
                      >
                        <div className='grid grid-rows-2'>
                          <p>{customer.email}</p>
                          <p>{formatPhoneNumber(customer.phone)}</p>
                        </div>
                      </Link>
                    </td>

                    <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                      <Link
                        href={`/dashboard/customers/${customer._id}`}
                        className='block'
                      >
                        {customer.projects?.[0]?.customerType}{' '}
                        {customer.projects?.[0]?.storeId}
                      </Link>
                    </td>

                    <td className='whitespace-nowrap px-4 py-2 text-xs font-sm text-gray-700 text-center'>
                      <button
                        onClick={() => handleDeleteCustomer(customer._id)}
                        className='inline-flex items-center justify-center'
                      >
                        <div className='flex justify-center items-center text-center text-red-400 hover:scale-110 transition-transform duration-200'>
                          <Trash2 className='h-5 w-5' />
                        </div>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='container m-auto border-t'>
              <Link href={'/dashboard/customers'}>
                <p className='flex p-6 justify-center text-xs md:text-sm'>
                  view more
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TableComponentPage
