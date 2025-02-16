'use client'
// pages/calendar.js
import React, { useState } from 'react'
import {
  addDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  format,
  isSameMonth,
} from 'date-fns'

export default function CalendarPage() {
  // Example: fixed to January 2022
  const currentMonth = new Date(2025, 1, 15)

  // Store events in state: { 'YYYY-MM-DD': [ { title, time }, ... ] }
  const [events, setEvents] = useState({})

  // Modal form state
  const [selectedDate, setSelectedDate] = useState(null)
  const [newEventTitle, setNewEventTitle] = useState('')
  const [newEventTime, setNewEventTime] = useState('')

  // Determine calendar range (including leftover days)
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }) // Monday start
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })

  // Generate an array of days to display
  const dayCells = []
  let day = calendarStart
  while (day <= calendarEnd) {
    dayCells.push(day)
    day = addDays(day, 1)
  }

  // Open the modal form to add an event
  const handleOpenAddEvent = (date) => {
    setSelectedDate(date)
    setNewEventTitle('')
    setNewEventTime('')
  }

  // Add a new event (max 15 per day)
  const handleAddEvent = () => {
    if (!selectedDate) return
    const dateKey = format(selectedDate, 'yyyy-MM-dd')
    const currentEvents = events[dateKey] || []
    if (currentEvents.length >= 15) {
      alert('Maximum of 15 events reached for this day!')
      return
    }

    const newEvent = { title: newEventTitle, time: newEventTime }
    setEvents({
      ...events,
      [dateKey]: [...currentEvents, newEvent],
    })

    // Reset form
    setSelectedDate(null)
    setNewEventTitle('')
    setNewEventTime('')
  }

  // Get events for a specific day
  const getEventsForDay = (date) => {
    const dateKey = format(date, 'yyyy-MM-dd')
    return events[dateKey] || []
  }

  return (
    <div className='max-w-5xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>
        Monthly Calendar - {format(currentMonth, 'MMMM yyyy')}
      </h1>

      {/* Weekday header row */}
      <div className='grid grid-cols-7 gap-px bg-gray-200 text-center font-semibold'>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((dow) => (
          <div key={dow} className='bg-white py-2 text-purple-600'>
            {dow}
          </div>
        ))}
      </div>

      {/* Calendar days grid */}
      <div className='grid grid-cols-7 gap-px bg-gray-200'>
        {dayCells.map((dayDate) => {
          const dayNumber = format(dayDate, 'd')
          const isInCurrentMonth = isSameMonth(dayDate, monthStart)
          const dayEvents = getEventsForDay(dayDate)

          return (
            <div
              key={dayDate.toString()}
              className={`relative min-h-[100px] bg-white p-2 border border-gray-200 
                ${isInCurrentMonth ? 'text-gray-800' : 'text-gray-400'}`}
            >
              <div className='flex justify-between items-center mb-1'>
                <span className='font-semibold'>{dayNumber}</span>
                <button
                  onClick={() => handleOpenAddEvent(dayDate)}
                  className='bg-purple-600 text-white rounded px-2 py-1 text-sm hover:bg-purple-700'
                >
                  +
                </button>
              </div>
              {/* Day's events */}
              <ul className='space-y-1'>
                {dayEvents.map((evt, index) => (
                  <li key={index} className='bg-purple-100 text-sm p-1 rounded'>
                    <span className='font-semibold mr-1'>{evt.time}</span>
                    {evt.title}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      {/* Modal to add an event */}
      {selectedDate && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10'>
          <div className='bg-white rounded p-4 w-80'>
            <h2 className='text-lg font-semibold mb-2'>
              Add Event - {format(selectedDate, 'MMMM d, yyyy')}
            </h2>
            <input
              type='text'
              placeholder='Event title'
              className='w-full mb-2 p-2 border border-gray-300 rounded'
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
            />
            <input
              type='text'
              placeholder='Time (e.g. 2PM)'
              className='w-full mb-2 p-2 border border-gray-300 rounded'
              value={newEventTime}
              onChange={(e) => setNewEventTime(e.target.value)}
            />
            <div className='flex justify-end space-x-2'>
              <button
                onClick={handleAddEvent}
                className='bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700'
              >
                Add
              </button>
              <button
                onClick={() => setSelectedDate(null)}
                className='bg-gray-300 px-4 py-2 rounded hover:bg-gray-400'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
