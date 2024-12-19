import Link from 'next/link'
import Image from 'next/image'
import { Paperclip } from 'lucide-react'
import formatPhoneNumber from '@/app/actions/formatPhoneNumber'
import customerWithCapitalizedNames from '@/app/actions/customerWithCapitalizedNames'

const CustomerDetails = ({ customer }) => {
  const formattedDate = customer.purchaseOrderDate.toDateString()

  return (
    <>
      <div className='container mx-auto grid grid-flow-row gap-4 md:gap-8'>
        {/* Customer Page Details Title */}
        <div className='grid grid-cols-1'>
          <div className='container md:text-left pl-1 p-6 text-md md:text-md text-center text-blue-500 font-semibold'>
            Customer Details
          </div>
        </div>
        {/* Customer Quick Contact Details*/}
        <div className='grid grid-cols-1 gap-4 md:gap-8 mx-4 md:mx-0'>
          <div className='grid grid-flow-row border border-gray-300 rounded-lg p-2 md:p-6 shadow-md'>
            <div className='container'>
              <div className='text-lg md:text-3xl font-semibold text-blue-500'>
                {customerWithCapitalizedNames(customer.firstName)}{' '}
                {customerWithCapitalizedNames(customer.lastName)}
              </div>
            </div>
            <div className='container flex gap-4'>
              <div className='text-sm md:text-base font-normal text-gray-600'>
                {customer.address.street} {customer.address.city}{' '}
                {customer.address.state} {customer.address.zipcode}
              </div>
              <div className='text-sm md:text-base font-normal text-gray-600'>
                {formatPhoneNumber(customer.phone)}
              </div>
            </div>
          </div>
        </div>
        {/* Break */}
        {/* Customer Full Order Details */}
        <div className='grid grid-cols-2 gap-4 md:gap-8 mx-4 md:mx-0'>
          <div className='grid grid-cols-1 border border-gray-300 rounded-lg p-4'>
            <div className='p-4'>
              <div className='px-4 sm:px-0'>
                <h3 className='text-base/7 font-semibold text-gray-900'>
                  Customer Order Details
                </h3>
              </div>
              <div className='mt-6 border-t border-gray-100'>
                <dl className=''>
                  <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm/6 font-medium text-gray-900'>
                      Purchase Order Number:
                    </dt>
                    <dd className='mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0'>
                      {customer.purchaseOrderNumber}
                    </dd>
                  </div>
                  <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm/6 font-medium text-gray-900'>
                      Puchase Order Date:
                    </dt>
                    <dd className='mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0'>
                      {formattedDate}
                    </dd>
                  </div>
                  <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm/6 font-medium text-gray-900'>
                      Customer Name:
                    </dt>
                    <dd className='mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0'>
                      {customer.firstName} {customer.lastName}
                    </dd>
                  </div>
                  <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm/6 font-medium text-gray-900'>
                      Address:
                    </dt>
                    <dd className='mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0'>
                      {customer.address.street}, {customer.address.city}{' '}
                      {customer.address.state} {customer.address.zipcode}
                    </dd>
                  </div>
                  <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm/6 font-medium text-gray-900'>
                      Phone:
                    </dt>
                    <dd className='mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0'>
                      {formatPhoneNumber(customer.phone)}
                    </dd>
                  </div>
                  <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm/6 font-medium text-gray-900'>
                      Email:
                    </dt>
                    <dd className='mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0'>
                      {customer.email}
                    </dd>
                  </div>
                  <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm/6 font-medium text-gray-900'>
                      About
                    </dt>
                    <dd className='mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0'>
                      Fugiat ipsum ipsum deserunt culpa aute sint do nostrud
                      anim incididunt cillum culpa consequat. Excepteur qui
                      ipsum aliquip consequat sint. Sit id mollit nulla mollit
                      nostrud in ea officia proident. Irure nostrud pariatur
                      mollit ad adipisicing reprehenderit deserunt qui eu.
                    </dd>
                  </div>
                  <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm/6 font-medium text-gray-900'>
                      Attachments
                    </dt>
                    <dd className='mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                      <ul
                        role='list'
                        className='divide-y divide-gray-100 rounded-md border border-gray-200'
                      >
                        <li className='flex items-center justify-between py-4 pl-4 pr-5 text-sm/6'>
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
                        <li className='flex items-center justify-between py-4 pl-4 pr-5 text-sm/6'>
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
                  </div>
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
