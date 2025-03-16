'use client'
import { format, isValid, parseISO } from 'date-fns'
import { formatDate } from '@/utils/formatDate'

const DashboardScheduleDisplay = ({ schedules }) => {
  //   // Safe date formatting helper function
  //   const safeFormatDate = (dateString) => {
  //     if (!dateString) return 'No Date'
  //     try {
  //       const date = parseISO(dateString)
  //       return isValid(date) ? format(date, 'MMM dd, yyyy') : 'No Date'
  //     } catch (error) {
  //       console.error('Date formatting error:', error)
  //       return 'Invalid Date'
  //     }
  //   }

  console.log(schedules)

  // Sort schedules by date with Validation
  const sortedSchedules = [...schedules].sort((a, b) => {
    if (!a.measureDate || !b.measureDate) return 0
    const dateA = a.measureDate
    const dateB = b.measureDate
    if (!isValid(dateA) && !isValid(dateB)) {
      return dateA.getTime() - dateB.getTime()
    }
  })

  return (
    <div className='border border-gray-300 rounded-lg p-4 bg-white'>
      <h2 className='text-lg font-semibold text-blue-500 mb-4'>
        Upcoming Schedules
      </h2>
      {sortedSchedules.length > 0 ? (
        <div className='space-y-3'>
          {sortedSchedules.map((schedule, index) => (
            <div
              key={`${schedule._id}-${index}`}
              className='flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50'
            >
              <div className='flex flex-col'>
                <span className='text-sm font-medium text-gray-900'>
                  {schedule.customerName}
                </span>
                <span className='text-xs text-gray-500'>
                  {schedule.description || 'No description'}
                </span>
              </div>
              <div className='flex flex-col items-end'>
                <span className='text-sm font-medium text-blue-600'>
                  {formatDate(schedule.measureDate) || ''}
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
