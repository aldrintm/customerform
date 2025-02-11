'use client'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import {
  Paperclip,
  PhoneIncoming,
  Store,
  ShieldAlert,
  Plus,
} from 'lucide-react'
import Button from './Button'
import formatPhoneNumber from '@/app/actions/formatPhoneNumber'
import customerWithCapitalizedNames from '@/app/actions/customerWithCapitalizedNames'
import deleteCustomer from '@/app/actions/deleteCustomer'
import { toast } from 'react-toastify'
import Map from '@/assets/images/mapbox.webp'

const CustomerDetails = ({ customer: initialCustomer }) => {
  // initialCustomer is now a plain object that includes a populated projects array.
  const [customer, setCustomers] = useState(initialCustomer)
  const [project, setProject] = useState('')

  // const dateObj = new Date(
  //   customer.projects[0].purchaseOrders[0].purchaseOrderDate
  // )

  // // Extract the month, date, and year
  // const month = dateObj.toLocaleString('default', { month: 'long' }) // Full month name (e.g., "January")
  // const day = dateObj.getDate() // Day of the month (e.g., 1, 2, etc.)
  // const year = dateObj.getFullYear() // Full year (e.g., 2025)

  // // Format the string as needed
  // const formattedDate = `${month} ${day}, ${year}`

  const handleDeleteCustomer = async (customerId) => {
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

  // const handleDeleteProject = async (projectId) => {
  //   const confirmed = window.confirm('Delete the project?')
  //   if (!confirmed) return
  //   await handleDeleteProject(projectId)
  //   const updatedProject = customer.project[0].filter(
  //     (project) => projectId !== customer.project[0]._id
  //   )
  //   setProject(updatedProject)
  //   toast.success(`${projectId} is DELETED!`)
  // }

  // this replaces the handleDeleteProject above
  const handleDeleteProject = async (projectId) => {
    const confirmed = window.confirm('Delete the project?')
    if (!confirmed) return

    // (Assuming deleteProject is an action that deletes the project from the database)
    await deleteProject(projectId)

    // Check if projects array exists and filter out the deleted project
    if (customer?.projects && customer.projects.length > 0) {
      const updatedProjects = customer.projects.filter(
        (proj) => proj._id !== projectId
      )
      // Update the entire customer state with the updated projects array
      setCustomers({
        ...customer,
        projects: updatedProjects,
      })
      toast.success(`${projectId} is DELETED!`)
    }
  }

  return (
    <>
      <div className='container mx-auto grid grid-flow-row gap-4 md:gap-8 pb-10'>
        {/* Customer Page Details Title */}
        <div className='hidden md:grid md:grid-cols-1'>
          <div className='container text-left pl-1 py-2 text-md md:text-md text-blue-500 font-semibold'>
            Customer Details Page
          </div>
        </div>
        <div className='md:grid md:grid-cols-1 gap-2 md:gap-8 mx-4 md:mx-0 print:block'>
          {/* Customer Quick Top Contact Details*/}
          <div className='grid grid-cols-2 md:grid-cols-3 md:border border-gray-300 rounded-lg p-1 px-4 md:p-4'>
            <div className='grid grid-cols gap-2 align-middle'>
              <div className='text-md md:text-2xl font-semibold text-blue-500 underline'>
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
            <div className='hidden md:grid md:grid-cols sm:gap-2 align-middle print:hidden'>
              {customer.projects && customer.projects.length > 0 ? (
                <div className='text-lg md:text-3xl font-semibold text-white'>
                  {customer?.projects[0]?.customerType?.length > 0 ? (
                    <span className='inline-flex items-center justify-center align-middle rounded-full border border-amber-500 mr-3 px-2.5 py-0.5 text-amber-600'>
                      <Store className='h-4 w-4' />
                      <p className='whitespace-nowrap text-sm px-2 hidden md:block'>
                        {customer?.projects[0]?.customerType}{' '}
                        {customer?.projects[0]?.storeId}
                      </p>
                    </span>
                  ) : null}

                  {customer?.projects[0]?.status?.length > 0 && (
                    <span className='inline-flex items-center justify-center align-middle rounded-full border border-emerald-500 mr-3 px-2.5 py-0.5 text-emerald-600'>
                      <PhoneIncoming className='h-4 w-4' />

                      <p className='whitespace-nowrap text-sm px-2 hidden md:block'>
                        {customer?.projects[0]?.status}
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
              ) : (
                <div className='flex items-center'>
                  <p className='text-center text-base md:text-md font-semibold text-gray-700'>
                    "Project Order Details Empty"
                  </p>
                </div>
              )}
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
            <div className='grid grid-cols gap-2 text-right'>
              <div className='text-sm md:text-md font-semibold text-gray-500'>
                Template: Jan 3, 2025
              </div>
              <div className='text-sm md:text-md font-semibold text-gray-500'>
                <span className='items-center align-middle'>
                  Install: Jan 25, 2025
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Break */}
        {/* Main Box */}
        <div className='flex flex-col pt-2 sm:px-4 md:p-0 md:grid md:grid-row gap-0 md:gap-8 mx-4 md:mx-0'>
          <div className='grid lg:grid-cols-2 gap-4 md:gap-8'>
            {/* 1st - Customer Profile Details */}
            <div className='grid grid-cols-1 sm:border sm:border-gray-300 sm:rounded-lg p-0 sm:p-4 border-b-slate-300 border-b'>
              <div className='pb-4 sm:p-4'>
                <div className='px-4 sm:px-0 flex justify-between'>
                  <h3 className='text-base font-semibold text-gray-700'>
                    Customer Profile Details
                  </h3>
                  <div className='flex gap-4'>
                    <Button>
                      <Link
                        href={`/dashboard/customers/${customer._id}/editCustomer`}
                      >
                        Edit
                      </Link>
                    </Button>

                    <Button onClick={() => handleDeleteCustomer(customer._id)}>
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
                    <div className='px-4 py-1 mt-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 flex items-stretch'>
                      <dt className='text-sm font-medium text-gray-900 pr-2'>
                        Customer Name:
                      </dt>
                      <dd className='text-sm font-medium text-gray-700 sm:col-span-2 underline'>
                        {customerWithCapitalizedNames(customer.firstName)}{' '}
                        {customerWithCapitalizedNames(customer.lastName)}
                      </dd>
                    </div>
                    <div className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 flex items-stretch'>
                      <dt className='text-sm font-medium text-gray-900 pr-2'>
                        Address:
                      </dt>
                      <dd className='text-sm font-medium text-gray-700 sm:col-span-2 underline'>
                        {customer.address.street}, {customer.address.city}{' '}
                        {customer.address.state} {customer.address.zipcode}
                      </dd>
                    </div>
                    <div className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 flex items-stretch'>
                      <dt className='text-sm font-medium text-gray-900 pr-2'>
                        Phone:
                      </dt>
                      <dd className='text-sm font-medium text-gray-700 sm:col-span-2 underline'>
                        {formatPhoneNumber(customer.phone)}
                      </dd>
                    </div>
                    <div className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 flex items-stretch'>
                      <dt className='text-sm font-medium text-gray-900 pr-2'>
                        Email:
                      </dt>
                      <dd className='text-sm font-medium text-gray-700 sm:col-span-2 underline'>
                        {customer.email}
                      </dd>
                    </div>
                    <div className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 flex items-stretch'>
                      <dt className='text-sm font-medium text-gray-900 pr-2'>
                        Contractor:
                      </dt>
                      <dd className='text-sm font-medium text-gray-700 sm:col-span-2 underline'>
                        {customer.contractorName} @{' '}
                        {formatPhoneNumber(customer.contractorPhone)}
                      </dd>
                    </div>
                    <div className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 flex items-stretch'>
                      <dt className='text-sm font-medium text-gray-900 pr-2'>
                        Order Notes:
                      </dt>
                      <dd className='text-sm font-medium text-gray-700 sm:col-span-2'>
                        {customer.notes}
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

            {/* 2nd - Internal Office Staff Notes */}
            <div className='hidden md:grid md:grid-cols-1 sm:border sm:border-gray-300 sm:rounded-lg sm:p-4 print:hidden'>
              <div className='pb-4 sm:p-4'>
                <div className='px-4 sm:px-0 flex justify-between'>
                  <h3 className='text-base font-semibold text-gray-700'>
                    Internal Office Staff Notes
                  </h3>
                  <div className='flex gap-4'>
                    <Button
                      icon={
                        <Plus className='h-4 w-4 text-xs hover:text-white' />
                      }
                    >
                      <Link href={`/dashboard/customers/${customer._id}/notes`}>
                        Add
                      </Link>
                    </Button>

                    {/* <Button onClick={() => handleDelete(customer._id)}>
                      Delete
                    </Button> */}
                  </div>
                </div>
                {/* We will need to do Daisychaining here to fetch data - whether customer.officeNotes is >0 or an empty array display something or just say not notes yet something like this */}
                <div className='mt-4 border-t border-gray-100'>
                  <dl className=' mt-2'>
                    <div className='px-4 py-1 sm:grid sm:grid-cols-1 sm:gap-2 sm:px-0 flex items-stretch'>
                      <div className='flex'>
                        <dt className='text-sm font-medium text-gray-900 pr-5'>
                          Date: Jan 13, 2025
                        </dt>
                        <dd className='text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                          By: Dana
                        </dd>
                      </div>
                      <div className='flex sm:border-b sm:pb-3'>
                        <dt className='text-sm font-medium text-gray-900 pr-5'>
                          {customer.officeNotes[0].note}
                        </dt>
                      </div>
                    </div>
                    {/* Break */}
                    <div className='px-4 py-1 sm:grid sm:grid-cols-1 sm:gap-2 sm:px-0 flex items-stretch'>
                      <div className='flex'>
                        <dt className='text-sm font-medium text-gray-900 pr-5'>
                          Date: Jan 13, 2025
                        </dt>
                        <dd className='text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                          By: Dana
                        </dd>
                      </div>
                      <div className='flex sm:border-b sm:pb-3'>
                        <dt className='text-sm font-medium text-gray-900 pr-5'>
                          Notes: Customer will bring the sink to the office next
                          week.
                        </dt>
                      </div>
                    </div>
                    {/* Divider */}
                    {/* <span className='flex items-center py-2'>
                      <span className='h-px flex-1 bg-gray-300'></span>
                      <span className='shrink-0 px-0 text-base font-semibold text-gray-700'></span>
                      <span className='h-px flex-1 bg-gray-300'></span>
                    </span> */}
                  </dl>
                </div>
              </div>
            </div>
          </div>
          {/* 2nd Main Box - Project + Mapbox */}
          <div className='grid lg:grid-cols-2 gap-4 md:gap-8'>
            {/* Project Order Details Box */}
            <div className='grid grid-cols-1 md:border sm:border-gray-300 sm:rounded-lg sm:p-4'>
              <div className='pb-4 sm:p-4'>
                <div className='px-4 sm:px-0 flex justify-between'>
                  <h3 className='text-base font-semibold text-gray-700'>
                    Project Order Details
                  </h3>
                  <div className='flex gap-4'>
                    <Button>
                      <Link
                        href={`/dashboard/customers/${customer._id}/project`}
                      >
                        Add
                      </Link>
                    </Button>
                    <Button>
                      <Link
                        href={`/dashboard/customers/${customer._id}/editProject`}
                      >
                        Edit
                      </Link>
                    </Button>

                    <Button
                      onClick={() =>
                        handleDeleteProject(customer.projects[0]._id)
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                {customer.projects &&
                customer.projects.length > 0 &&
                customer.projects[0].purchaseOrders &&
                customer.projects[0].purchaseOrders.length > 0 ? (
                  <div className='mt-4 border-t border-gray-100'>
                    <dl className=''>
                      {customer.projects[0].purchaseOrders.map((po, index) => {
                        // Format each purchase order date
                        const poDate = new Date(po.purchaseOrderDate)
                        const day = poDate.getDate().toString().padStart(2, '0')
                        const month = poDate.toLocaleString('en-US', {
                          month: 'long',
                        })
                        const year = poDate.getFullYear()
                        const formattedDate = `${month} ${day}, ${year}`

                        return (
                          <div
                            key={index}
                            className='px-4 py-1 mt-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 flex items-stretch'
                          >
                            <dt className='text-sm font-medium text-gray-900 pr-2'>
                              PO Number:
                            </dt>
                            <dd className='text-sm text-gray-700 sm:col-span-3 sm:mt-0 flex justify-between'>
                              <span>{po.purchaseOrderNumber}</span>
                              <span>{formattedDate}</span>
                              <span>${po.purchaseOrderAmount}</span>
                            </dd>
                          </div>
                        )
                      })}

                      <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 flex items-stretch'>
                        <dt className='text-sm font-medium text-gray-900 pr-2'>
                          Description:
                        </dt>
                        <dd className='text-sm text-gray-700 sm:col-span-3 sm:mt-0'>
                          {customer.projects[0].description}
                        </dd>
                      </div>
                      <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 flex items-stretch'>
                        <dt className='text-sm font-medium text-gray-900 pr-2'>
                          Material:
                        </dt>
                        <dd className='text-sm text-gray-700 sm:col-span-3 sm:mt-0 md:flex md:justify-between'>
                          <span className='pr-2'>
                            {customer.projects[0].materialThickness}{' '}
                            {customer.projects[0].materialColor}
                          </span>
                          <span className='pr-2 underline'>
                            {customer.projects[0].materialBrand}
                          </span>
                          {/* <span className='pr-2 underline'>Quartz</span>
                        <span className='pr-2 underline'>Polished</span> */}
                          <span className='inline-flex items-center rounded-md sm:mr-2 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/10'>
                            {/* <span className='inline-block w-2.5 h-2.5 mr-2 bg-red-500 rounded-full'></span> */}
                            {customer.projects[0].materialType}
                          </span>
                          <span className='inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
                            {customer.projects[0].materialFinish}
                          </span>
                        </dd>
                      </div>
                      <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 flex items-stretch'>
                        <dt className='text-sm font-medium text-gray-900 pr-2'>
                          Edge:
                        </dt>
                        <dd className='text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                          {customer.projects[0].edge}
                        </dd>
                      </div>
                      <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 flex items-stretch'>
                        <dt className='text-sm font-medium text-gray-900 pr-2'>
                          Sink:
                        </dt>
                        <dd className='text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                          {customer.projects[0].sinkQuantity}{' '}
                          {customer.projects[0].sinkType} @{' '}
                          {customer.projects[0].sinkLocation} (
                          {customer.projects[0].sinkInfo})
                        </dd>
                      </div>
                      <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 flex items-stretch'>
                        <dt className='text-sm font-medium text-gray-900 pr-2'>
                          Stove:
                        </dt>
                        <dd className='text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                          {customer.projects?.[0]?.stove
                            ? 'Slide In Range'
                            : customer.projects?.[0]?.cooktop
                            ? 'Cooktop'
                            : 'n/a'}
                        </dd>
                      </div>
                      <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 flex items-stretch'>
                        <dt className='text-sm font-medium text-gray-900 pr-2'>
                          Splash:
                        </dt>
                        <dd className='text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                          {customer.projects[0].splash}{' '}
                          {customer.projects[0].status}
                        </dd>
                      </div>
                      <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 flex items-stretch'>
                        <dt className='text-sm font-medium text-gray-900 pr-2'>
                          Order Notes:
                        </dt>
                        <dd className='text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                          {customer.projects[0].notes}
                        </dd>
                      </div>
                    </dl>
                  </div>
                ) : (
                  <div className='flex items-center justify-center h-3/4 '>
                    <p className='text-center text-base md:text-lg font-semibold text-gray-700'>
                      No Purchase Order Found
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* Mapbox Div */}
            <div className='hidden md:grid md:grid-cols-1 h-auto md:border md:border-gray-300 md:rounded-lg p-4 relative'>
              <div className=''>
                <Image
                  src={Map}
                  alt='map'
                  priority={true}
                  className='object-cover w-full h-full grayscale'
                />
                {/* <p className='text-sm my-auto mx-auto'>
              Let's place a quick snapshot here of the site
            </p> */}
              </div>
              <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-gray-500 font-extrabold'>
                add map later
              </p>
            </div>
          </div>
        </div>
        {/* ... */}
        {/* Break */}
        {/* Template and Install Dates + Signature */}
        <div className='hidden md:grid md:grid-cols-2 text-sm md:gap-8 mx-4 md:mx-0 sm:block print:block'>
          {customer.status === 'will call' ? (
            <div className='sm:grid sm:grid-cols-1 md:border md:border-gray-300 md:block md:rounded-lg p-0 md:p-2'>
              <div className='sm:flex sm:justify-between sm:px-4 md:p-4'>
                <span className=''>Template Date: Jan 3, 2025</span>
                <span>Measured By: Anilber Pena</span>
              </div>

              <div className='sm:p-4 md:col-span-2'>
                Template Notes: There's no sink on site, I only took the sink
                template. Contractor present and approved all overhangs
              </div>
            </div>
          ) : customer.status === 'for install' ? (
            <>
              <div className='sm:grid sm:grid-cols-1 md:border md:border-gray-300 md:block md:rounded-lg p-0 md:p-2 print:hidden'>
                <div className='sm:flex sm:justify-between sm:px-4 md:p-4'>
                  <span className=''>Template Date: Jan 3, 2025</span>
                  <span>Measured By: Anilber Pena</span>
                </div>
                <div className='sm:p-4 md:col-span-2'>
                  Template Notes: There's no sink on site, I only took the sink
                  template. Contractor present and approved all overhangs
                </div>
              </div>
              <div className='grid grid-cols-1 md:border md:border-gray-300 md:rounded-lg p-0 md:p-2'>
                <div className='sm:flex sm:justify-between sm:px-4 md:p-4'>
                  <span className=''>Install Date: Jan 25, 2025</span>
                  <span>Installed By: Ruben Oronia</span>
                </div>

                <div className='sm:p-4 md:col-span-2'>
                  Installation Notes: Contractor want to preserve the tiles,
                  please protect the floor as much as you can. They will keep
                  the sink so try to save it.
                </div>
                <div className='sm:flex sm:justify-between sm:px-4 md:p-4'>
                  <span className=''>
                    Sign On Install: ________________________
                  </span>
                  <span>Print Name: ________________________</span>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default CustomerDetails
