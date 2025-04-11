'use client'
import { Suspense } from 'react'
import Link from 'next/link'
import { format, isValid, parseISO, startOfDay } from 'date-fns'
import { formatDate } from '@/utils/formatDate'
import customerWithCapitalizedNames from '@/app/actions/customerWithCapitalizedNames'

const DashboardScheduleDisplay = ({ schedules }) => {
  if (!schedules) return null // Add null check

  const currentDate = format(startOfDay(new Date()), 'MMMM dd, yyyy')

  // Get current UTC date
  const utcDate = new Date()

  // Format as "Friday, March 28, 2025" in UTC time
  const formattedUTCDate = utcDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC', // This is the key option to ensure UTC formatting
  })

  console.log(formattedUTCDate)

  // Time slot priority mapping standard
  const timeSlotPriorityRegular = {
    '8-10': 1,
    '10-12': 2,
    '12-2': 3,
    '2-4': 4,
  }

  // Time slot priority mapping non-standard
  const timeSlotPriorityIrregular = {
    '7-9': 1,
    '9-11': 2,
    '11-1': 3,
    '1-3': 4,
  }

  const measureByOrder = ['Anilber', 'Javier', 'Jeff']

  // Sort schedules by time slots
  // const sortedSchedulesA = [...schedules].sort((a, b) => {
  //   const priorityA = timeSlotPriorityRegular[a.measureTime] || 999
  //   const priorityB = timeSlotPriorityRegular[b.measureTime] || 999
  //   return priorityA - priorityB
  // })

  // Sort schedules by time slots
  // const sortedSchedulesB = [...schedules].sort((c, d) => {
  //   const priorityC = timeSlotPriorityIrregular[c.measureTime] || 999
  //   const priorityD = timeSlotPriorityIrregular[d.measureTime] || 999
  //   return priorityC - priorityD
  // })

  // console.log('Sorted Time:', sortedSchedulesA, sortedSchedulesB)

  // Helper function to safely format dates
  // const formatScheduleDate = (date) => {
  //   try {
  //     if (!date) return 'No date'
  //     const parsedDate = parseISO(date)
  //     return format(parsedDate, 'MMM dd, yyyy')
  //   } catch (error) {
  //     console.error('Date formatting error:', error)
  //     return 'Invalid date'
  //   }
  // }

  // Sort schedules by date with Validation
  // const sortedSchedules = [...schedules].sort((a, b) => {
  //   if (!a.measureDate || !b.measureDate) return 0
  //   const dateA = parseISO(a.measureDate)
  //   const dateB = parseISO(b.measureDate)
  //   if (!isValid(dateA) && !isValid(dateB)) {
  //     return dateA - dateB
  //   }
  // })

  // console.log(
  //   'Sorted Schedules:',
  //   sortedSchedules.map((schedule) => schedule.measureDate)
  // )

  // First group schedules by measureBy
  const groupedSchedules = schedules.reduce((groups, schedule) => {
    const measureBy = schedule.measureBy || 'Unassigned'
    if (!groups[measureBy]) {
      groups[measureBy] = []
    }
    groups[measureBy].push(schedule)
    return groups
  }, {})

  // Then sort each group by time slots - original with 1 Priority Only
  // Object.keys(groupedSchedules).forEach((measureBy) => {
  //   groupedSchedules[measureBy].sort((a, b) => {
  //     // Check regular time slots first
  //     const PriorityA = timeSlotPriority[a.measureTime] || 999
  //     const PriorityB = timeSlotPriority[b.measureTime] || 999
  //     return PriorityA - PriorityB
  //   })
  // })

  // Then sort each group by time slots, handling both regular and irregular
  Object.keys(groupedSchedules).forEach((measureBy) => {
    groupedSchedules[measureBy].sort((a, b) => {
      // Check regular time slots first
      const regularPriorityA = timeSlotPriorityRegular[a.measureTime]
      const regularPriorityB = timeSlotPriorityRegular[b.measureTime]

      // If both times are in regular slots, use regular priority
      if (regularPriorityA && regularPriorityB) {
        return regularPriorityA - regularPriorityB
      }

      // Check regular time slots first
      const irregularPriorityA = timeSlotPriorityIrregular[a.measureTime]
      const irregularPriorityB = timeSlotPriorityIrregular[b.measureTime]

      // If both times are in irregular slots, use irregular priority
      if (irregularPriorityA && irregularPriorityB) {
        return irregularPriorityA - irregularPriorityB
      }

      // If mixing regular and irregular, or unknown time slots
      // const priorityA = regularPriorityA || irregularPriorityA || 999
      // const priorityB = regularPriorityB || irregularPriorityB || 999
      // return priorityA - priorityB
    })
  })

  return (
    <Suspense fallback={<div>Loading schedule display...</div>}>
      <section>
        <div className='md:container max-w-4xl text-left px-15 mx-auto md:rounded-2xl'>
          <div className='container mx-auto border border-gray-300 rounded-lg p-2'>
            <div className='container flex items-center justify-center px-2 pt-0 text-md md:text-md text-blue-500 font-semibold'>
              {/* <h1>{currentDate}</h1> */}
              {/* <h1>Template Schedule for {currentDate}</h1> */}

              <h2 className='w-full flex justify-center text-lg font-semibold bg-white p-3'>
                Measure Schedule for {formattedUTCDate}
              </h2>
            </div>
            <div className='overflow-x-auto'>
              {schedules.length > 0 ? (
                <table className='min-w-full bg-white text-sm'>
                  <thead className='text-left'>
                    {/* <tr>
                    <th className='whitespace-nowrap py-3 text-sm text-center text-gray-600 font-semibold'>
                      Anilber
                    </th>
                    <th className='whitespace-nowrap py-3 text-sm text-center text-gray-600 font-semibold'>
                      Javier
                    </th>
                    <th className='whitespace-nowrap py-3 text-sm text-center text-gray-600 font-semibold'>
                      Jeff
                    </th>
                  </tr> */}
                    <tr>
                      {Object.keys(groupedSchedules).map((measureBy) => (
                        <th
                          key={measureBy}
                          className='whitespace-nowrap py-4 text-sm text-center text-gray-600 font-semibold'
                        >
                          {measureBy}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  {/* <tbody className='divide-y divide-gray-200'>
                  {sortedSchedules.length > 0 ? (
                    <>
                      {sortedSchedules.map((schedule) => (
                        <tr
                          key={schedule._id}
                          className='hover:bg-blue-50 cursor-pointer'
                        >
                          <td className='whitespace-nowrap py-2 text-sm text-center text-gray-700'>
                            <Link
                              href={`/dashboard/customers/${schedule.customer}`}
                            >
                              <div className='grid grid-flow-row'>
                                <span className='underline text-sm font-light text-gray-900 inline-flex items-center gap-2'>
                                  {formatDate(schedule?.measureDate) || ''}
                                </span>
                                <span className='text-sm font-light text-gray-900 inline-flex items-center gap-2'>
                                  {schedule.measureTime}
                                  <p>
                                    {customerWithCapitalizedNames(
                                      schedule?.customerAddress?.city || ''
                                    )}
                                  </p>
                                </span>
                                <span className='text-sm font-light text-gray-900 inline-flex items-center gap-2'>
                                  {customerWithCapitalizedNames(
                                    schedule?.customerName || 'Unknown Customer'
                                  )}
                                  /
                                  {schedule?.customerType === 'Home Depot'
                                    ? 'HD'
                                    : schedule?.customerType === 'Direct'
                                    ? 'Dir'
                                    : schedule?.customerType === 'Builders'
                                    ? 'Buil'
                                    : schedule?.customerType ===
                                      'Kitchen and Bath'
                                    ? 'K&B'
                                    : schedule?.customerType}
                                </span>
                              </div>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <p className='text-gray-500 text-center'>
                      No schedules found
                    </p>
                  )}
                </tbody> */}
                  {/*  className='divide-y divide-gray-200'  */}
                  <tbody className='p-6'>
                    <tr>
                      {Object.entries(groupedSchedules).map(
                        ([measureBy, schedules]) => (
                          <td key={measureBy} className='align-top'>
                            {schedules.map((schedule) => (
                              <div
                                key={schedule._id}
                                className='p-2 my-2 mx-1 hover:bg-blue-50 cursor-pointer border border-slate-300 rounded-md hover:shadow-md'
                              >
                                <Link
                                  href={`/dashboard/customers/${schedule.customer}`}
                                >
                                  <div className='grid grid-flow-row gap-1'>
                                    {/* <span className='text-sm font-light text-gray-700'>
                                    {formatDate(schedule?.measureDate) || ''}
                                  </span> */}
                                    <div className='flex justify-between'>
                                      <span className='text-sm font-light text-gray-900'>
                                        {(() => {
                                          //First time slot (Blue)
                                          if (
                                            schedule.measureTime === '7-9' ||
                                            schedule.measureTime === '8-10'
                                          ) {
                                            return (
                                              <div className='text-blue-500 font-semibold'>
                                                {schedule.measureTime}
                                              </div>
                                            )
                                          }

                                          // Second time slot (Red)
                                          if (
                                            schedule.measureTime === '9-11' ||
                                            schedule.measureTime === '10-12'
                                          ) {
                                            return (
                                              <div className='text-red-500 font-semibold'>
                                                {schedule.measureTime}
                                              </div>
                                            )
                                          }
                                          // Third time slot (Yellow)
                                          if (
                                            schedule.measureTime === '11-1' ||
                                            schedule.measureTime === '12-2'
                                          ) {
                                            return (
                                              <div className='text-yellow-500 font-semibold'>
                                                {schedule.measureTime}
                                              </div>
                                            )
                                          }

                                          // Frouth time slot (Green)
                                          if (
                                            schedule.measureTime === '1-3' ||
                                            schedule.measureTime === '2-4'
                                          ) {
                                            return (
                                              <div className='text-green-500 font-semibold'>
                                                {schedule.measureTime}
                                              </div>
                                            )
                                          }
                                          // Default case
                                          return (
                                            <div>{schedule.measureTime}</div>
                                          )
                                        })()}
                                      </span>
                                      <span className='text-sm font-light text-gray-600'>
                                        {customerWithCapitalizedNames(
                                          schedule?.customerAddress?.city || ''
                                        )}
                                      </span>
                                    </div>
                                    <div className='flex justify-between'>
                                      <span className='text-sm font-medium text-gray-600'>
                                        {customerWithCapitalizedNames(
                                          schedule?.customerName ||
                                            'Unknown Customer'
                                        )}
                                      </span>
                                      <span className='text-sm font-light text-gray-600'>
                                        {schedule?.customerType === 'Home Depot'
                                          ? 'HD'
                                          : schedule?.customerType === 'Direct'
                                          ? 'Direct'
                                          : schedule?.customerType ===
                                            'Builders'
                                          ? 'Buil'
                                          : schedule?.customerType ===
                                            'Kitchen and Bath'
                                          ? 'K & B'
                                          : schedule?.customerType}
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            ))}
                          </td>
                        )
                      )}
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p className='text-gray-500 text-center'>No schedules found</p>
              )}
            </div>

            {/* Older Upcoming Schedule Format - Should Delete */}
            {/* {schedules.length > 0 ? (
              <div className='space-y-3'>
                {schedules.map((schedule) => (
                  <div
                    key={schedule._id}
                    className='flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50'
                  >
                    <div className='flex flex-col'>
                      <span className='text-sm font-medium text-gray-900'>
                        {customerWithCapitalizedNames(
                          schedule?.customerName || 'Unknown Customer'
                        )}
                      </span>
                      <span className='text-sm text-gray-500'>
                        {customerWithCapitalizedNames(
                          schedule?.customerAddress?.city || ''
                        )}
                      </span>
                    </div>
                    <div className='flex flex-col items-end'>
                      <span className='text-sm font-medium text-blue-600'>
                        {formatDate(schedule?.measureDate) || ''}
                      </span>
                      <span className='text-xs text-gray-500'>
                        {schedule?.measureBy || 'Unassigned'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-gray-500 text-center'>No schedules found</p>
            )} */}
          </div>
        </div>
      </section>
    </Suspense>
  )
}

export default DashboardScheduleDisplay
