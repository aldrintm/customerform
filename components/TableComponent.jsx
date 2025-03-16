'use client'

import Link from 'next/link'
import formatPhoneNumber from '@/app/actions/formatPhoneNumber'
import customerWithCapitalizedNames from '@/app/actions/customerWithCapitalizedNames'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Button from './Button'
import { getSession } from 'next-auth/react'
import { Plus } from 'lucide-react'

const TableComponentPage = ({ customers }) => {
  return (
    <>
      <div className='md:container w-full text-left px-15 mx-auto md:rounded-2xl'>
        <div className='container flex items-center justify-between px-2 py-2 text-md md:text-md text-blue-500 font-semibold'>
          <h1>Customers List</h1>
          <Link href={`/dashboard/customers/add`}>
            <Button
              icon={<Plus className='h-4 w-4 text-xs hover:text-white' />}
            >
              Create New
            </Button>
          </Link>
        </div>

        <div className='container mx-auto px-4 m-6 border border-gray-300 rounded-lg'>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
              <thead className='text-left'>
                <tr>
                  <th className='whitespace-nowrap px-4 py-3 text-sm text-gray-600 font-semibold'>
                    First Name
                  </th>
                  <th className='whitespace-nowrap px-4 py-3 font-sm text-gray-600'>
                    Last Name
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
                    View
                  </th>
                  <th className='whitespace-nowrap px-4 py-3 font-sm text-gray-600'>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className='divide-y divide-gray-200'>
                {customers.map((customer) => (
                  <tr key={customer._id}>
                    <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                      {customerWithCapitalizedNames(customer.firstName)}
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                      {customerWithCapitalizedNames(customer.lastName)}
                    </td>
                    <td className='whitespace-nowrap px-0 py-0 text-sm'>
                      {customer.projects?.[0]?.status === 'will call' ? (
                        <div className='px-0 py-1 text-center md:text-sm bg-green-100 text-green-500 rounded-full'>
                          will call
                        </div>
                      ) : customer.projects?.[0]?.status === 'for template' ? (
                        <div className='px-2 py-1 text-center md:text-sm bg-blue-100 text-blue-500 rounded-full'>
                          for template
                        </div>
                      ) : customer.projects?.[0]?.status === 'pending' ? (
                        <div className='px-0 py-1 text-center md:text-sm bg-rose-100 text-rose-500 rounded-full'>
                          pending
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
                      ) : customer.projects?.[0]?.status === '' ? (
                        <div className='px-0 py-1 text-center md:text-sm bg-cyan-100 text-cyan-500 rounded-full'></div>
                      ) : null}
                    </td>

                    <td className='whitespace-nowrap px-4 py-2 pl-8 text-sm text-gray-700'>
                      <div className='grid grid-rows-2'>
                        <p>{customer.address.street}</p>
                        <p>
                          {customer.address.city} {customer.address.state}{' '}
                          {customer.address.zipcode}
                        </p>
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                      <div className='grid grid-rows-2'>
                        <p>{customer.email}</p>
                        <p>{formatPhoneNumber(customer.phone)}</p>
                      </div>
                    </td>

                    {/* <td className='whitespace-nowrap px-4 py-2 text-xs font-sm text-gray-700'>
                      {customer.email}
                    </td> */}
                    <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                      {customer.projects?.[0]?.customerType}{' '}
                      {customer.projects?.[0]?.storeId}
                    </td>

                    <td className='whitespace-nowrap px-4 py-2 text-sm'>
                      <Link
                        href={`/dashboard/customers/${customer._id}`}
                        className='inline-block rounded-full p-1 text-sm text-sky-500 border hover:ring-2 hover:ring-blue-400 hover:text-sky-500 focus:outline-none focus:ring active:text-sky-500'
                      >
                        <span className='text-xs font-sm'>
                          <svg
                            className='size-5 rtl:rotate-180'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                              d='M17 8l4 4m0 0l-4 4m4-4H3'
                            />
                          </svg>
                          {/* <Eye className='h-4 w-4 text-xs text-blue-500 text-bold' /> */}
                        </span>
                      </Link>
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-sm'>
                      <div className='flex gap-3'>
                        <Link
                          href={`/dashboard/customers/${customer._id}/editCustomer`}
                        >
                          <Button>Edit</Button>
                        </Link>
                      </div>
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
