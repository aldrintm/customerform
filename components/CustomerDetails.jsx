import Link from 'next/link'
import Image from 'next/image'
import { Paperclip, PhoneIncoming, Store, ShieldAlert } from 'lucide-react'

import formatPhoneNumber from '@/app/actions/formatPhoneNumber'
import customerWithCapitalizedNames from '@/app/actions/customerWithCapitalizedNames'

const CustomerDetails = ({ customer }) => {
  const formattedDate = customer.purchaseOrderDate.toDateString()

  return (
    <>
      <div className='container mx-auto grid grid-flow-row gap-4 md:gap-8'>
        {/* Customer Page Details Title */}
        <div className='grid grid-cols-1'>
          <div className='container text-left pl-1 py-2 text-md md:text-md text-blue-500 font-semibold'>
            Customer Details
          </div>
        </div>
        {/* Customer Quick Contact Details*/}
        <div className='grid grid-cols-1 gap-4 md:gap-8 mx-4 md:mx-0'>
          <div className='grid grid-cols-2 md:grid-cols-3 border border-gray-300 rounded-lg p-2 md:p-6 shadow-md'>
            <div className='grid grid-cols gap-4 align-middle'>
              <div className='text-lg md:text-3xl font-semibold text-blue-500 underline'>
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
                  <span className='inline-flex items-center justify-center align-middle rounded-full border border-red-500 px-2.5 py-0.5 text-red-600'>
                    <ShieldAlert className='h-4 w-4' />

                    <p className='whitespace-nowrap text-sm px-2 hidden md:block'>
                      Critical
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
        {/* Customer Full Order Details */}
        <div className='grid grid-cols-2 gap-4 md:gap-8 mx-4 md:mx-0'>
          <div className='grid grid-cols-1 border border-gray-300 rounded-lg p-4'>
            <div className='p-4'>
              <div className='px-4 sm:px-0 flex justify-between'>
                <h3 className='text-base font-semibold text-gray-700'>
                  Customer Order Details
                </h3>
                <button>Edit</button>
              </div>
              <div className='mt-4 border-t border-gray-100'>
                <dl className=''>
                  <div className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-medium text-gray-900'>
                      Purchase Order Number:
                    </dt>
                    <dd className='mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                      {customer.purchaseOrderNumber}
                    </dd>
                  </div>
                  <div className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-medium text-gray-900'>
                      Puchase Order Date:
                    </dt>
                    <dd className='mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                      {formattedDate}
                    </dd>
                  </div>
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

                  {/* Order Summary */}
                  <span className='flex items-center py-6'>
                    <span className='h-px flex-1 bg-gray-300'></span>
                    <span className='shrink-0 px-6 text-base font-semibold text-gray-700'>
                      Order Summary
                    </span>
                    <span className='h-px flex-1 bg-gray-300'></span>
                  </span>

                  {/* About */}
                  {/* <div className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-medium text-gray-900'>
                      About
                    </dt>
                    <dd className='mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                      Fugiat ipsum ipsum deserunt culpa aute sint do nostrud
                      anim incididunt cillum culpa consequat. Excepteur qui
                      ipsum aliquip consequat sint. Sit id mollit nulla mollit
                      nostrud in ea officia proident. Irure nostrud pariatur
                      mollit ad adipisicing reprehenderit deserunt qui eu.
                    </dd>
                  </div> */}
                  {/* Attachment */}
                  {/* <div className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-medium text-gray-900'>
                      Attachments
                    </dt>
                    <dd className='mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                      <ul
                        role='list'
                        className='divide-y divide-gray-100 rounded-md border border-gray-200'
                      >
                        <li className='flex items-center justify-between py-4 pl-4 pr-5 text-sm'>
                          <div className='flex w-0 flex-1 items-center'>
                            <Paperclip
                              aria-hidden='true'
                              className='size-5 shrink-0 text-gray-400'
                            />

                            <div className='ml-4 flex min-w-0 flex-1 gap-2'>
                              <span className='truncate font-medium'>
                                resume_back_end_developer.pdf
                              </span>
                              <span className='shrink-0 text-gray-400'>
                                2.4mb
                              </span>
                            </div>
                          </div>
                          <div className='ml-4 shrink-0'>
                            <a
                              href='#'
                              className='font-medium text-indigo-600 hover:text-indigo-500'
                            >
                              Download
                            </a>
                          </div>
                        </li>
                        <li className='flex items-center justify-between py-4 pl-4 pr-5 text-sm'>
                          <div className='flex w-0 flex-1 items-center'>
                            <Paperclip
                              aria-hidden='true'
                              className='size-5 shrink-0 text-gray-400'
                            />
                            <div className='ml-4 flex min-w-0 flex-1 gap-2'>
                              <span className='truncate font-medium'>
                                signed
                              </span>
                              <span className='shrink-0 text-gray-400'>
                                4.5mb
                              </span>
                            </div>
                          </div>
                          <div className='ml-4 shrink-0'>
                            <a
                              href='#'
                              className='font-medium text-indigo-600 hover:text-indigo-500'
                            >
                              Download
                            </a>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </div> */}
                </dl>
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
