'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Paperclip, PhoneIncoming, Store, ShieldAlert } from 'lucide-react'
import Button from './Button'
import formatPhoneNumber from '@/app/actions/formatPhoneNumber'
import customerWithCapitalizedNames from '@/app/actions/customerWithCapitalizedNames'
import deleteCustomer from '@/app/actions/deleteCustomer'
import { convertToSerializeableObject } from '@/utils/convertToObject'
import { toast } from 'react-toastify'

const CustomerDetails = ({ customer: initialCustomers }) => {
  const [customer, setCustomers] = useState(initialCustomers)

  const dateObj = new Date(customer.purchaseOrderDate)

  // Extract the month, date, and year
  const month = dateObj.toLocaleString('default', { month: 'long' }) // Full month name (e.g., "January")
  const day = dateObj.getDate() // Day of the month (e.g., 1, 2, etc.)
  const year = dateObj.getFullYear() // Full year (e.g., 2025)

  // Format the string as needed
  const formattedDate = `${month} ${day}, ${year}`

  const handleDelete = async (customerId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this customer?'
    )

    if (!confirmed) return

    await deleteCustomer(customerId)

    const updatedCustomers = customer.filter(
      (customer) => customerId !== customer._id
    )

    setCustomers(updatedCustomers)
    toast.success(`${customerId} is DELETED!`)
  }

  return (
    <>
      <div className='container mx-auto grid grid-flow-row gap-4 md:gap-8 pb-10'>
        {/* Customer Page Details Title */}
        <div className='grid grid-cols-1'>
          <div className='container text-left pl-1 py-2 text-md md:text-md text-blue-500 font-semibold'>
            Customer Details Page
          </div>
        </div>
        {/* Customer Quick Top Contact Details*/}
        <div className='grid grid-cols-1 gap-4 md:gap-8 mx-4 md:mx-0'>
          <div className='grid grid-cols-2 md:grid-cols-3 border border-gray-300 rounded-lg p-2 md:p-4'>
            <div className='grid grid-cols gap-4 align-middle'>
              <div className='text-lg md:text-2xl font-semibold text-blue-500 underline'>
                {customerWithCapitalizedNames(customer.firstName)}{' '}
                {customerWithCapitalizedNames(customer.lastName)}
              </div>
              <div className='flex text-sm md:text-base font-normal text-gray-600'>
                <span className='items-center justify-center align-middle'>
                  {customer.address.street} {customer.address.city}{' '}
                  {customer.address.state} {customer.address.zipcode}
                </span>
              </div>
            </div>
            <div className='grid grid-cols md:col-span-2 gap-4 align-middle'>
              <div className='text-lg md:text-3xl font-semibold text-white'>
                <span className='inline-flex items-center justify-center align-middle rounded-full border border-amber-500 mr-3 px-2.5 py-0.5 text-amber-600'>
                  <Store className='h-4 w-4' />
                  <p className='whitespace-nowrap text-sm px-2 hidden md:block'>
                    {customer.storeName} {customer.storeId}
                  </p>
                </span>

                {customer.status?.length > 0 && (
                  <span className='inline-flex items-center justify-center align-middle rounded-full border border-emerald-500 mr-3 px-2.5 py-0.5 text-emerald-600'>
                    <PhoneIncoming className='h-4 w-4' />

                    <p className='whitespace-nowrap text-sm px-2 hidden md:block'>
                      {customer.status}
                    </p>
                  </span>
                )}

                {customer.is_flagged && (
                  <span className='inline-flex items-center justify-center align-middle rounded-full border border-red-500 mr-3 px-2.5 py-0.5 text-red-600'>
                    <ShieldAlert className='h-4 w-4' />

                    <p className='whitespace-nowrap text-sm px-2 hidden md:block'>
                      Critical
                    </p>
                  </span>
                )}
                {customer.is_featured && (
                  <span className='inline-flex items-center justify-center align-middle rounded-full border border-fuchsia-500 px-2.5 py-0.5 text-fuchsia-600'>
                    <ShieldAlert className='h-4 w-4' />

                    <p className='whitespace-nowrap text-sm px-2 hidden md:block'>
                      Important Customer
                    </p>
                  </span>
                )}
              </div>
              <div className='flex md:gap-6'>
                <div className='flex text-sm md:text-base font-normal text-gray-600'>
                  <span className='items-center justify-center align-middle'>
                    {formatPhoneNumber(customer.phone)}
                  </span>
                </div>
                <div className='flex text-sm md:text-base font-normal text-gray-600'>
                  <span className='items-center justify-center align-middle'>
                    {customer.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Break */}
        {/* Break */}
        {/* Break */}
        {/* Customer Full Order Details */}
        <div className='grid grid-cols-2 gap-4 md:gap-8 mx-4 md:mx-0'>
          <div className='grid grid-flow-row gap-4 md:gap-8'>
            <div className='grid grid-cols-1 border border-gray-300 rounded-lg p-4'>
              <div className='p-4'>
                <div className='px-4 sm:px-0 flex justify-between'>
                  <h3 className='text-base font-semibold text-gray-700'>
                    Customer Profile Details
                  </h3>
                  <div className='flex gap-3'>
                    <Link href={`/dashboard/customers/${customer._id}/edit`}>
                      <Button>Edit</Button>
                    </Link>
                    <Button onClick={() => handleDelete(customer._id)}>
                      Delete
                    </Button>
                  </div>
                </div>
                <div className='mt-4 border-t border-gray-100'>
                  <dl className=''>
                    {/* <div className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium text-gray-900'>
                        Purchase Order Number:
                      </dt>
                      <dd className='mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                        {customer.purchaseOrderNumber}
                      </dd>
                    </div> */}
                    {/* <div className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium text-gray-900'>
                        Puchase Order Date:
                      </dt>
                      <dd className='mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                        {formattedDate}
                      </dd>
                    </div> */}
                    <div className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium text-gray-900'>
                        Customer Name:
                      </dt>
                      <dd className='mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                        {customerWithCapitalizedNames(customer.firstName)}{' '}
                        {customerWithCapitalizedNames(customer.lastName)}
                      </dd>
                    </div>
                    <div className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium text-gray-900'>
                        Address:
                      </dt>
                      <dd className='mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                        {customer.address.street}, {customer.address.city}{' '}
                        {customer.address.state} {customer.address.zipcode}
                      </dd>
                    </div>
                    <div className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm/6 font-medium text-gray-900'>
                        Phone:
                      </dt>
                      <dd className='mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                        {formatPhoneNumber(customer.phone)}
                      </dd>
                    </div>
                    <div className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium text-gray-900'>
                        Email:
                      </dt>
                      <dd className='mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                        {customer.email}
                      </dd>
                    </div>
                    <div className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium text-gray-900'>
                        Contractor:
                      </dt>
                      <dd className='mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                        {customer.contractorName} @{' '}
                        {formatPhoneNumber(customer.contractorPhone)}
                      </dd>
                    </div>
                    <div className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium text-gray-900'>
                        Order Notes:
                      </dt>
                      <dd className='mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                        {customer.orderNotes}
                      </dd>
                    </div>

                    {/* Order Summary - Just a Divider */}
                    {/* <span className='flex items-center py-6'>
                    <span className='h-px flex-1 bg-gray-300'></span>
                    <span className='shrink-0 px-0 text-base font-semibold text-gray-700'></span>
                    <span className='h-px flex-1 bg-gray-300'></span>
                  </span> */}
                  </dl>
                </div>
              </div>
            </div>
            {/* 2nd Purchase Order Details */}
            <div className='grid grid-cols-1 border border-gray-300 rounded-lg p-4'>
              <div className='p-4'>
                <div className='px-4 sm:px-0 flex justify-between'>
                  <h3 className='text-base font-semibold text-gray-700'>
                    Project Order Details
                  </h3>
                  <div className='flex gap-3'>
                    <Link href={`/dashboard/customers/edit/${customer._id}`}>
                      <Button>Edit</Button>
                    </Link>
                    <Button onClick={() => handleDelete(customer._id)}>
                      Delete
                    </Button>
                  </div>
                </div>
                <div className='mt-4 border-t border-gray-100'>
                  <dl className=''>
                    <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium text-gray-900'>
                        PO Number:
                      </dt>
                      <dd className='mt-1 text-sm text-gray-700 sm:col-span-1 sm:mt-0'>
                        project.purchaseOrderNumber
                      </dd>
                    </div>
                    <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium text-gray-900'>
                        PO Date:
                      </dt>
                      <dd className='mt-1 text-sm text-gray-700 sm:col-span-1 sm:mt-0'>
                        project.purchaseOrderDate
                      </dd>
                    </div>
                    <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium text-gray-900'>
                        Description:
                      </dt>
                      <dd className='mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                        project.description
                      </dd>
                    </div>
                    <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium text-gray-900'>
                        Material:
                      </dt>
                      <dd className='mt-1 text-sm text-gray-700 sm:col-span-3 sm:mt-0'>
                        project.materialThickness .materialBrand .materialColor
                      </dd>
                    </div>
                    <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0'>
                      <dt className='text-sm/6 font-medium text-gray-900'>
                        Finish:
                      </dt>
                      <dd className='mt-1 text-sm text-gray-700 sm:col-span-3 sm:mt-0'>
                        project.materialFinish =
                        Polished/Honed/Matte/Leather/Silk Etc
                      </dd>
                    </div>
                    <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium text-gray-900'>
                        Edge:
                      </dt>
                      <dd className='mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                        project.edge
                      </dd>
                    </div>
                    <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium text-gray-900'>
                        Sink:
                      </dt>
                      <dd className='mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                        project.sinkQuantity + project.sinkType
                      </dd>
                    </div>
                    <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium text-gray-900'>
                        Stove:
                      </dt>
                      <dd className='mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                        project.stoveQuantity + project.stoveType
                      </dd>
                    </div>
                    <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium text-gray-900'>
                        Splash:
                      </dt>
                      <dd className='mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                        project.splash
                      </dd>
                    </div>
                    <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium text-gray-900'>
                        Window Sill:
                      </dt>
                      <dd className='mt-1 text-sm text-gray-700 sm:col-span-3 sm:mt-0'>
                        if(project.windowsill) then its a YES or checkmark
                      </dd>
                    </div>
                    <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium text-gray-900'>
                        Order Notes:
                      </dt>
                      <dd className='mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                        project.orderNotes
                      </dd>
                    </div>

                    {/* Order Summary - Just a Divider */}
                    {/* <span className='flex items-center py-6'>
                    <span className='h-px flex-1 bg-gray-300'></span>
                    <span className='shrink-0 px-0 text-base font-semibold text-gray-700'></span>
                    <span className='h-px flex-1 bg-gray-300'></span>
                  </span> */}
                  </dl>
                </div>
              </div>
            </div>
          </div>
          {/* Mapbox to be done later */}
          <div className='grid grid-cols-1 h-auto border border-gray-300 rounded-lg p-4'>
            <p className='text-sm my-auto mx-auto'>
              Let's place a quick snapshot here of the site
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomerDetails
