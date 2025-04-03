'use client'
import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'

// Add this component right before the return statement in your CalendarPage component
export function CalendarDebug({ currentDate, view }) {
  const [browserTime, setBrowserTime] = useState('')

  useEffect(() => {
    // Get the current browser time
    const now = new Date()
    setBrowserTime(format(now, 'MMMM yyyy'))
  }, [])

  return (
    <div className='p-4 mb-4 bg-yellow-100 rounded-lg border border-yellow-300'>
      <h3 className='text-lg font-medium text-yellow-800'>
        Calendar Debug Info
      </h3>
      <div className='mt-2 space-y-1 text-sm'>
        <p>
          <strong>Browser Current Month:</strong> {browserTime}
        </p>
        <p>
          <strong>Calendar Current Month:</strong>{' '}
          {format(currentDate, 'MMMM yyyy')}
        </p>
        <p>
          <strong>View Mode:</strong> {view}
        </p>
        <p>
          <strong>Date Object Raw:</strong> {currentDate.toString()}
        </p>
        <p>
          <strong>Time:</strong> {format(currentDate, 'h:mm:ss a')}
        </p>
      </div>
    </div>
  )
}
