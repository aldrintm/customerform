'use client'
import { format, isValid, parseISO } from 'date-fns'
import { formatDate } from '@/utils/formatDate'

const DashboardScheduleDisplay = ({ schedules }) => {
  console.log('Incoming Schedules:', schedules.schedule)
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
  const sortedSchedules = [...schedules].sort((a, b) => {
    if (!a.measureDate || !b.measureDate) return 0
    const dateA = parseISO(a.measureDate)
    const dateB = parseISO(b.measureDate)
    if (!isValid(dateA) && !isValid(dateB)) {
      return dateA - dateB
    }
  })

  // console.log(
  //   'Sorted Schedules:',
  //   sortedSchedules.map((schedule) => schedule.measureDate)
  // )

  return (
    <div className='border border-gray-300 rounded-lg p-4 bg-white'>
      <h2 className='text-lg font-semibold text-blue-500 mb-4'>
        Upcoming Schedules
      </h2>
      {schedules.length > 0 ? (
        <div className='space-y-3'>
          {schedules.map((schedule) => (
            <div
              key={schedule._id}
              className='flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50'
            >
              <div className='flex flex-col'>
                <span className='text-sm font-medium text-gray-900'>
                  {schedule.customerName || 'Unknown Customer'}
                </span>
                <span className='text-xs text-gray-500'>
                  {schedule.description || 'No description'}
                </span>
              </div>
              <div className='flex flex-col items-end'>
                <span className='text-sm font-medium text-blue-600'>
                  {formatScheduleDate(schedule.measureDate) || ''}
                </span>
                <span className='text-xs text-gray-500'>
                  {schedule.measureBy || 'Unassigned'}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-gray-500 text-center'>No schedules found</p>
      )}
    </div>
  )
}

export default DashboardScheduleDisplay
