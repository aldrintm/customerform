'use client'

import Link from 'next/link'
import formatPhoneNumber from '@/app/actions/formatPhoneNumber'
import customerWithCapitalizedNames from '@/app/actions/customerWithCapitalizedNames'
import { format } from 'date-fns'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Button from './Button'
import { getSession } from 'next-auth/react'
import { Plus } from 'lucide-react'

const DashboardTemplateSchedule = ({ customers }) => {
  const limitedCustomers = customers.slice(0, 4)

  const currentDate = format(new Date(), 'MMMM dd, yyyy')

  return (
    <section className=''>
      <div className='md:container max-w-4xl text-left px-15 mx-auto md:rounded-2xl'>
        <div className='container mx-auto px-4 border border-gray-300 rounded-lg'>
          <div className='container flex items-center justify-center px-2 pt-4 text-md md:text-md text-blue-500 font-semibold'>
            <h1>Template Schedule for {currentDate}</h1>
          </div>
          <div className='overflow-x-auto p-2'>
            <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
              <thead className='text-left'>
                <tr>
                  <th className='whitespace-nowrap py-3 text-sm text-gray-600 font-semibold'>
                    Anilber
                  </th>
                  <th className='whitespace-nowrap py-3 text-sm text-gray-600 font-semibold'>
                    Javier
                  </th>
                  <th className='whitespace-nowrap py-3 text-sm text-gray-600 font-semibold'>
                    Jeff
                  </th>
                </tr>
              </thead>

              <tbody className='divide-y divide-gray-200'>
                {limitedCustomers.map((customer) => (
                  <tr
                    key={customer._id}
                    className='hover:bg-blue-50 cursor-pointer'
                  >
                    {/* <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                      <Link href={`/dashboard/customers/${customer._id}`}>
                        {customerWithCapitalizedNames(customer.lastName)}
                      </Link>
                    </td>

                    <td className='whitespace-nowrap px-4 py-2 text-sm text-gray-700'>
                      {customerWithCapitalizedNames(customer.contractorName)}
                    </td> */}

                    <td className='whitespace-nowrap py-2 text-sm text-gray-700'>
                      <div className='grid grid-flow-row'>
                        <span>
                          {customerWithCapitalizedNames(customer.lastName)}/
                          {customer?.projects?.map((item, index) => (
                            <span key={index}>
                              {item.customerType === 'Home Depot'
                                ? 'HD'
                                : item.customerType === 'Direct'
                                ? 'Dir'
                                : item.customerType === 'Builders'
                                ? 'B'
                                : item.customerType === 'Kitchen and Bath'
                                ? 'K&B'
                                : item.customerType}
                            </span>
                          ))}
                        </span>
                        <p>{customer.address.city}</p>
                      </div>
                    </td>
                    <td className='whitespace-nowrap py-2 text-sm text-gray-700'>
                      <div className='grid grid-flow-row'>
                        <span>
                          {customerWithCapitalizedNames(customer.lastName)}/
                          {customer?.projects?.map((item, index) => (
                            <span key={index}>
                              {item.customerType === 'Home Depot'
                                ? 'HD'
                                : item.customerType === 'Direct'
                                ? 'Dir'
                                : item.customerType === 'Builders'
                                ? 'B'
                                : item.customerType === 'Kitchen and Bath'
                                ? 'K&B'
                                : item.customerType}
                            </span>
                          ))}
                        </span>
                        <p>{customer.address.city}</p>
                      </div>
                    </td>
                    <td className='whitespace-nowrap py-2 text-sm text-gray-700'>
                      <div className='grid grid-flow-row'>
                        <span>
                          {customerWithCapitalizedNames(customer.lastName)}/
                          {customer?.projects?.map((item, index) => (
                            <span key={index}>
                              {item.customerType === 'Home Depot'
                                ? 'HD'
                                : item.customerType === 'Direct'
                                ? 'Dir'
                                : item.customerType === 'Builders'
                                ? 'B'
                                : item.customerType === 'Kitchen and Bath'
                                ? 'K&B'
                                : item.customerType}
                            </span>
                          ))}
                        </span>
                        <p>{customer.address.city}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DashboardTemplateSchedule
