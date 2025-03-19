'use client'
import { format, isValid, parseISO } from 'date-fns'
import { formatDate } from '@/utils/formatDate'
import customerWithCapitalizedNames from '@/app/actions/customerWithCapitalizedNames'

const DashboardScheduleDisplay = ({ schedules }) => {
  console.log('Incoming Schedules:', schedules)

  const currentDate = format(new Date(), 'MMMM dd, yyyy')

  // Helper function to safely format dates
  const formatScheduleDate = (date) => {
    try {
      if (!date) return 'No date'
      const parsedDate = parseISO(date)
      return format(parsedDate, 'MMM dd, yyyy')
    } catch (error) {
      console.error('Date formatting error:', error)
      return 'Invalid date'
    }
  }

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

  return (
    <section>
      <div className='md:container max-w-4xl text-left px-15 mx-auto md:rounded-2xl'>
        <div className='container mx-auto px-4 border border-gray-300 rounded-lg'>
          <div className='container flex items-center justify-center px-2 pt-4 text-md md:text-md text-blue-500 font-semibold'>
            {/* <h1>{currentDate}</h1> */}
            {/* <h1>Template Schedule for {currentDate}</h1> */}
            <h2>Upcoming Template Schedules</h2>
          </div>
          <div className='overflow-x-auto p-2'>
            <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
              {/* <thead className='text-left'>
                <tr>
                  <th className='whitespace-nowrap py-3 text-sm text-center text-gray-600 font-semibold'>
                    Anilber
                  </th>
                  <th className='whitespace-nowrap py-3 text-sm text-center text-gray-600 font-semibold'>
                    Javier
                  </th>
                  <th className='whitespace-nowrap py-3 text-sm text-center text-gray-600 font-semibold'>
                    Jeff
                  </th>
                </tr>
              </thead> */}
              <tbody className='divide-y divide-gray-200'>
                {schedules.length > 0 ? (
                  <>
                    {schedules.map((schedule) => (
                      <tr
                        key={schedule._id}
                        className='hover:bg-blue-50 cursor-pointer'
                      >
                        <td className='whitespace-nowrap py-2 text-sm text-center text-gray-700'>
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
                                : schedule?.customerType === 'Kitchen and Bath'
                                ? 'K&B'
                                : schedule?.customerType}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <p className='text-gray-500 text-center'>
                    No schedules found
                  </p>
                )}
              </tbody>
            </table>
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
  )
}

export default DashboardScheduleDisplay
