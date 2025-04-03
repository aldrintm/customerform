'use client'
import React, { useState, useEffect, useCallback } from 'react'
import {
  addDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  format,
  isSameMonth,
  addMonths,
  subMonths,
  isSameDay,
  parseISO,
  startOfDay,
  endOfDay,
  differenceInCalendarDays,
  addWeeks,
  subWeeks,
  getHours,
  getMinutes,
  setHours,
  setMinutes,
} from 'date-fns'
import SideNavbar from '@/components/SideNavbar'
import Header from '@/components/Header'
import EventModal from '@/components/EventModal'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {
  createScheduleEvent,
  updateScheduleEvent,
  deleteScheduleEvent,
  getScheduleEventsForRange,
} from '@/app/actions/scheduleActions'

// Draggable event component
const DraggableEvent = ({ event, onClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'EVENT',
    item: { id: event._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  // Determine color based on event type
  const getEventColor = (type) => {
    switch (type) {
      case 'measure':
        return 'bg-blue-100 border-blue-300 text-blue-800'
      case 'install':
        return 'bg-green-100 border-green-300 text-green-800'
      case 'meeting':
        return 'bg-purple-100 border-purple-300 text-purple-800'
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800'
    }
  }

  const eventType = event.measureDate
    ? 'measure'
    : event.installDate
    ? 'install'
    : 'other'
  const colorClass = getEventColor(eventType)

  return (
    <div
      ref={drag}
      onClick={() => onClick(event)}
      className={`p-1 mb-1 text-xs rounded-md border ${colorClass} cursor-pointer transition-colors duration-200 hover:bg-opacity-80 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className='font-medium'>
        {event.description?.length > 30
          ? `${event.description.substring(0, 30)}...`
          : event.description}
      </div>
      <div className='text-xs'>
        {event.measureTime ||
          format(new Date(event.measureDate || event.installDate), 'h:mm a')}
      </div>
    </div>
  )
}

// Droppable day cell component
const DroppableDay = ({ date, children, onDrop, onClick, isActive }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'EVENT',
    drop: (item) => onDrop(item.id, date),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <div
      ref={drop}
      onClick={() => onClick(date)}
      className={`p-2 ${isActive ? 'border-2 border-blue-500' : ''} ${
        isOver ? 'bg-blue-100' : ''
      } cursor-pointer flex flex-col h-full w-full`}
    >
      {children}
    </div>
  )
}

// Day view time slots
const TimeSlots = ({ date, events, onClickSlot }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i)

  // Get events for a specific hour
  const getEventsForHour = (hour) => {
    return events.filter((event) => {
      const eventDate = new Date(event.measureDate || event.installDate)
      return getHours(eventDate) === hour
    })
  }

  return (
    <div className='flex-1 overflow-y-auto'>
      {hours.map((hour) => {
        const hourEvents = getEventsForHour(hour)
        const formattedHour = format(setHours(date, hour), 'h a')

        return (
          <div key={hour} className='flex border-b border-gray-200'>
            <div className='w-16 py-2 px-2 text-xs text-gray-500 font-medium border-r border-gray-200'>
              {formattedHour}
            </div>
            <div
              className='flex-1 min-h-[60px] relative hover:bg-blue-50'
              onClick={() => onClickSlot(setHours(date, hour))}
            >
              {hourEvents.map((event) => (
                <div
                  key={event._id}
                  className='absolute left-0 right-2 bg-blue-100 border-l-4 border-blue-500 rounded-r-md p-1 text-xs'
                  style={{
                    top: `${
                      (getMinutes(
                        new Date(event.measureDate || event.installDate)
                      ) /
                        60) *
                      100
                    }%`,
                    height: '30px',
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    // Handle event click
                  }}
                >
                  {event.description}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function CalendarPage() {
  // Calendar view state: 'month', 'week', or 'day'
  const [view, setView] = useState('month')

  // Current date for navigation
  const [currentDate, setCurrentDate] = useState(new Date())

  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)

  // Events state
  const [events, setEvents] = useState([])

  // Customers state (would be fetched from API)
  const [customers, setCustomers] = useState([])

  // Loading state
  const [isLoading, setIsLoading] = useState(true)

  // Initial data fetch on component mount
  useEffect(() => {
    // This would fetch customers
    // For now, let's mock some data
    setCustomers([
      { _id: '1', firstName: 'John', lastName: 'Doe' },
      { _id: '2', firstName: 'Jane', lastName: 'Smith' },
    ])
  }, [])

  // Fetch events when the view or currentDate changes
  useEffect(() => {
    // Define our fetch function
    const fetchEvents = async () => {
      setIsLoading(true)

      // Use currentDate from state instead of new Date()
      let startDate, endDate

      if (view === 'month') {
        const monthStart = startOfMonth(currentDate)
        const monthEnd = endOfMonth(monthStart)
        startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
        endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })
      } else if (view === 'week') {
        startDate = startOfWeek(currentDate, { weekStartsOn: 1 })
        endDate = endOfWeek(currentDate, { weekStartsOn: 1 })
      } else {
        // Day view
        startDate = startOfDay(currentDate)
        endDate = endOfDay(currentDate)
      }

      try {
        const response = await getScheduleEventsForRange(startDate, endDate)

        if (response && response.success) {
          setEvents(response.data || [])
        } else {
          // Handle error without using console.error
          setEvents([])
          // Optional: You could set an error state here if you want to show an error message
          // setErrorMessage(response?.error || 'Failed to fetch events')
        }
      } catch (error) {
        // Handle any exceptions
        setEvents([])
        // setErrorMessage('Failed to fetch events')
      } finally {
        setIsLoading(false)
      }
    }

    // Call the fetch function
    fetchEvents()
  }, [view, currentDate]) // Include currentDate as dependency

  // Update the day cell render to ensure today is always highlighted
  const isToday = useCallback((date) => {
    return isSameDay(date, new Date())
  }, [])

  // Navigation functions
  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const goToNext = () => {
    if (view === 'month') {
      setCurrentDate((prev) => addMonths(prev, 1))
    } else if (view === 'week') {
      setCurrentDate((prev) => addWeeks(prev, 1))
    } else {
      // Day view
      setCurrentDate((prev) => addDays(prev, 1))
    }
  }

  const goToPrevious = () => {
    if (view === 'month') {
      setCurrentDate((prev) => subMonths(prev, 1))
    } else if (view === 'week') {
      setCurrentDate((prev) => subWeeks(prev, 1))
    } else {
      // Day view
      setCurrentDate((prev) => addDays(prev, -1))
    }
  }

  // Modal handlers
  const handleOpenModal = (date, event = null) => {
    setSelectedDate(date)
    setSelectedEvent(event)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedEvent(null)
  }

  // Save event handler
  const handleSaveEvent = async (eventData) => {
    try {
      // If we're editing an event, update it
      if (selectedEvent) {
        const response = await updateScheduleEvent(selectedEvent._id, eventData)
        if (response && response.success) {
          // Update local state
          setEvents((prevEvents) =>
            prevEvents.map((event) =>
              event._id === selectedEvent._id ? response.data : event
            )
          )
        }
      } else {
        // Otherwise create a new event
        const response = await createScheduleEvent(eventData)
        if (response && response.success) {
          // Add to local state
          setEvents((prevEvents) => [...prevEvents, response.data])
        }
      }
    } catch (error) {
      // Silently handle error or set error state if needed
      // setErrorMessage('Failed to save event')
    }
  }

  // Handle event deletion
  const handleDeleteEvent = async () => {
    if (!selectedEvent) return

    if (confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await deleteScheduleEvent(selectedEvent._id)

        if (response && response.success) {
          // Remove from local state
          setEvents((prevEvents) =>
            prevEvents.filter((event) => event._id !== selectedEvent._id)
          )

          // Close modal
          handleCloseModal()
        }
      } catch (error) {
        // Silently handle error or set error state if needed
        // setErrorMessage('Failed to delete event')
      }
    }
  }

  // Handle drag and drop
  const handleEventDrop = async (eventId, newDate) => {
    try {
      // Find the event
      const event = events.find((e) => e._id === eventId)

      if (!event) return

      // Calculate the number of days to move
      const originalDate = new Date(event.measureDate || event.installDate)
      const daysDifference = differenceInCalendarDays(newDate, originalDate)

      if (daysDifference === 0) return

      // Create updated event data
      const updatedEvent = { ...event }

      if (event.measureDate) {
        const newMeasureDate = addDays(
          new Date(event.measureDate),
          daysDifference
        )
        updatedEvent.measureDate = newMeasureDate
      } else if (event.installDate) {
        const newInstallDate = addDays(
          new Date(event.installDate),
          daysDifference
        )
        updatedEvent.installDate = newInstallDate
      }

      // Update the event
      const response = await updateScheduleEvent(eventId, updatedEvent)

      if (response && response.success) {
        // Update the local state with the updated event
        setEvents((prevEvents) =>
          prevEvents.map((e) => (e._id === eventId ? response.data : e))
        )
      } else {
        // If the API call failed, refresh all events
        const startDate =
          view === 'month'
            ? startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 })
            : view === 'week'
            ? startOfWeek(currentDate, { weekStartsOn: 1 })
            : startOfDay(currentDate)

        const endDate =
          view === 'month'
            ? endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 })
            : view === 'week'
            ? endOfWeek(currentDate, { weekStartsOn: 1 })
            : endOfDay(currentDate)

        const eventsResponse = await getScheduleEventsForRange(
          startDate,
          endDate
        )

        if (eventsResponse && eventsResponse.success) {
          setEvents(eventsResponse.data)
        }
      }
    } catch (error) {
      // Handle error silently or set error state
      // setErrorMessage('Error updating event')
    }
  }

  // Generate calendar cells based on current view
  const generateCalendarCells = () => {
    const cells = []

    if (view === 'month') {
      // Month view logic - Use currentDate from state
      const monthStart = startOfMonth(currentDate)
      const monthEnd = endOfMonth(monthStart)
      const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
      const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })

      let day = startDate

      // Generate rows for the month view
      while (day <= endDate) {
        const week = []

        // Generate days for each week
        for (let i = 0; i < 7; i++) {
          week.push(day)
          day = addDays(day, 1)
        }

        cells.push(week)
      }
    } else if (view === 'week') {
      // Week view logic - Use currentDate from state
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 })

      const week = []

      // Generate days for the week
      for (let i = 0; i < 7; i++) {
        week.push(addDays(weekStart, i))
      }

      cells.push(week)
    } else {
      // Day view - only include the current date
      cells.push([currentDate])
    }

    return cells
  }

  // Get events for a specific day
  const getEventsForDay = (date) => {
    const dayStart = startOfDay(date)
    const dayEnd = endOfDay(date)

    return events.filter((event) => {
      const eventDate = new Date(event.measureDate || event.installDate)
      return eventDate >= dayStart && eventDate <= dayEnd
    })
  }

  // Calendar cells
  const calendarCells = generateCalendarCells()

  return (
    <DndProvider backend={HTML5Backend}>
      <section className='flex min-h-screen w-full flex-col'>
        <SideNavbar />
        <Header />
        <div className='relative py-8 sm:p-8'>
          <div className='w-full max-w-7xl mx-auto px-4 lg:px-8 xl:px-14'>
            <div className='flex items-center justify-between gap-3 mb-5'>
              <div className='flex items-center gap-4'>
                <h5 className='text-xl leading-8 font-semibold text-gray-900'>
                  {view === 'month'
                    ? format(currentDate, 'MMMM yyyy')
                    : view === 'week'
                    ? `Week of ${format(
                        startOfWeek(currentDate, { weekStartsOn: 1 }),
                        'MMM d, yyyy'
                      )}`
                    : format(currentDate, 'EEEE, MMMM d, yyyy')}
                </h5>
                <div className='flex items-center gap-2' name='navigation'>
                  {/* Today Button */}
                  <button
                    onClick={goToToday}
                    className='hidden md:flex py-2 pl-1.5 pr-3 rounded-md bg-gray-50 border border-gray-300 items-center gap-1.5 text-xs font-medium text-gray-900 transition-all duration-500 hover:bg-gray-100'
                  >
                    <svg
                      className='pointer-events-none'
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                    >
                      <path
                        d='M11.3333 3L11.3333 3.65L11.3333 3ZM4.66666 3.00002L4.66666 2.35002L4.66666 3.00002ZM5.36719 9.98333C5.72617 9.98333 6.01719 9.69232 6.01719 9.33333C6.01719 8.97435 5.72617 8.68333 5.36719 8.68333V9.98333ZM5.33385 8.68333C4.97487 8.68333 4.68385 8.97435 4.68385 9.33333C4.68385 9.69232 4.97487 9.98333 5.33385 9.98333V8.68333ZM5.36719 11.9833C5.72617 11.9833 6.01719 11.6923 6.01719 11.3333C6.01719 10.9743 5.72617 10.6833 5.36719 10.6833V11.9833ZM5.33385 10.6833C4.97487 10.6833 4.68385 10.9743 4.68385 11.3333C4.68385 11.6923 4.97487 11.9833 5.33385 11.9833V10.6833ZM8.03385 9.98333C8.39284 9.98333 8.68385 9.69232 8.68385 9.33333C8.68385 8.97435 8.39284 8.68333 8.03385 8.68333V9.98333ZM8.00052 8.68333C7.64154 8.68333 7.35052 8.97435 7.35052 9.33333C7.35052 9.69232 7.64154 9.98333 8.00052 9.98333V8.68333ZM8.03385 11.9833C8.39284 11.9833 8.68385 11.6923 8.68385 11.3333C8.68385 10.9743 8.39284 10.6833 8.03385 10.6833V11.9833ZM8.00052 10.6833C7.64154 10.6833 7.35052 10.9743 7.35052 11.3333C7.35052 11.6923 7.64154 11.9833 8.00052 11.9833V10.6833ZM10.7005 9.98333C11.0595 9.98333 11.3505 9.69232 11.3505 9.33333C11.3505 8.97435 11.0595 8.68333 10.7005 8.68333V9.98333ZM10.6672 8.68333C10.3082 8.68333 10.0172 8.97435 10.0172 9.33333C10.0172 9.69232 10.3082 9.98333 10.6672 9.98333V8.68333ZM10.7005 11.9833C11.0595 11.9833 11.3505 11.6923 11.3505 11.3333C11.3505 10.9743 11.0595 10.6833 10.7005 10.6833V11.9833ZM10.6672 10.6833C10.3082 10.6833 10.0172 10.9743 10.0172 11.3333C10.0172 11.6923 10.3082 11.9833 10.6672 11.9833V10.6833ZM5.98333 2C5.98333 1.64101 5.69232 1.35 5.33333 1.35C4.97435 1.35 4.68333 1.64101 4.68333 2H5.98333ZM4.68333 4C4.68333 4.35898 4.97435 4.65 5.33333 4.65C5.69232 4.65 5.98333 4.35898 5.98333 4H4.68333ZM11.3167 2C11.3167 1.64101 11.0257 1.35 10.6667 1.35C10.3077 1.35 10.0167 1.64101 10.0167 2H11.3167ZM10.0167 4C10.0167 4.35898 10.3077 4.65 10.6667 4.65C11.0257 4.65 11.3167 4.35898 11.3167 4H10.0167Z'
                        fill='#6B7280'
                      ></path>
                    </svg>
                    Today
                  </button>
                  <button
                    onClick={goToPrevious}
                    className='text-gray-500 rounded transition-all duration-300 hover:bg-gray-100 hover:text-gray-900'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                    >
                      <path
                        d='M10.0002 11.9999L6 7.99971L10.0025 3.99719'
                        stroke='currentcolor'
                        strokeWidth='1.3'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      ></path>
                    </svg>
                  </button>
                  <button
                    onClick={goToNext}
                    className='text-gray-500 rounded transition-all duration-300 hover:bg-gray-100 hover:text-gray-900'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                    >
                      <path
                        d='M6.00236 3.99707L10.0025 7.99723L6 11.9998'
                        stroke='currentcolor'
                        strokeWidth='1.3'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* View toggle */}
              <div className='flex items-center gap-px p-1 rounded-md bg-gray-100'>
                <button
                  onClick={() => setView('month')}
                  className={`py-2.5 px-5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    view === 'month'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setView('week')}
                  className={`py-2.5 px-5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    view === 'week'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setView('day')}
                  className={`py-2.5 px-5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    view === 'day'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Day
                </button>
              </div>
            </div>

            {/* Calendar grid */}
            <div className='border border-gray-200 rounded-lg overflow-hidden'>
              {/* Weekday headers - don't show for day view */}
              {view !== 'day' && (
                <div className='grid grid-cols-7 bg-gray-50'>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
                    (day, index) => (
                      <div
                        key={index}
                        className='p-3 text-center border-b border-r border-gray-200 last:border-r-0'
                      >
                        <span className='text-sm font-medium text-gray-900'>
                          {day}
                        </span>
                      </div>
                    )
                  )}
                </div>
              )}

              {/* Calendar body */}
              {view === 'day' ? (
                <div className='flex flex-col h-screen max-h-[700px]'>
                  <div className='p-3 text-center border-b border-gray-200 bg-gray-50'>
                    <span className='text-sm font-medium text-gray-900'>
                      {format(currentDate, 'EEEE, MMMM d, yyyy')}
                    </span>
                  </div>
                  <TimeSlots
                    date={currentDate}
                    events={getEventsForDay(currentDate)}
                    onClickSlot={(date) => handleOpenModal(date)}
                  />
                </div>
              ) : (
                <div
                  className={`${
                    view === 'month' ? '' : 'h-screen max-h-[700px]'
                  }`}
                >
                  {calendarCells.map((week, weekIndex) => (
                    <div
                      key={weekIndex}
                      className='grid grid-cols-7 divide-x divide-gray-200'
                    >
                      {week.map((day, dayIndex) => {
                        const dayEvents = getEventsForDay(day)
                        const isTodayCell = isToday(day) // Use the function here
                        const isCurrentMonth =
                          view === 'month'
                            ? isSameMonth(day, currentDate)
                            : true

                        return (
                          <div
                            key={dayIndex}
                            className={`${
                              isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                            } ${
                              isTodayCell ? 'bg-blue-50' : ''
                            } border-b border-gray-200 ${
                              view === 'week'
                                ? 'h-full min-h-[150px]'
                                : 'aspect-square'
                            } overflow-hidden flex flex-col transition-all duration-300 hover:bg-blue-50`}
                          >
                            <DroppableDay
                              date={day}
                              onDrop={handleEventDrop}
                              onClick={() => handleOpenModal(day)}
                              isActive={isTodayCell}
                            >
                              <div className='flex justify-between items-start'>
                                <span
                                  className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold ${
                                    isTodayCell
                                      ? 'bg-blue-500 text-white'
                                      : isCurrentMonth
                                      ? 'text-gray-900'
                                      : 'text-gray-500'
                                  }`}
                                >
                                  {format(day, 'd')}
                                </span>
                                {dayEvents.length > 0 && (
                                  <span className='text-xs text-gray-500 font-medium'>
                                    {dayEvents.length > 1
                                      ? `${dayEvents.length} events`
                                      : '1 event'}
                                  </span>
                                )}
                              </div>

                              <div className='mt-1 flex-grow overflow-y-auto'>
                                {dayEvents
                                  .slice(0, view === 'month' ? 3 : 8)
                                  .map((event) => (
                                    <DraggableEvent
                                      key={event._id}
                                      event={event}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleOpenModal(day, event)
                                      }}
                                    />
                                  ))}

                                {dayEvents.length >
                                  (view === 'month' ? 3 : 8) && (
                                  <div className='text-xs text-center mt-1 text-gray-500'>
                                    +{' '}
                                    {dayEvents.length -
                                      (view === 'month' ? 3 : 8)}{' '}
                                    more
                                  </div>
                                )}
                              </div>

                              {dayEvents.length === 0 && view === 'week' && (
                                <div className='flex-grow flex items-center justify-center'>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleOpenModal(day)
                                    }}
                                    className='text-xs text-gray-500 hover:text-gray-700'
                                  >
                                    + Add event
                                  </button>
                                </div>
                              )}
                            </DroppableDay>
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Optional debug info - remove in production */}
            {process.env.NODE_ENV !== 'production' && (
              <div className='mt-4 p-4 bg-gray-100 rounded-lg text-sm'>
                <p>
                  <strong>Current Date:</strong> {format(currentDate, 'PPP')}
                </p>
                <p>
                  <strong>View Mode:</strong> {view}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Event Modal */}
        <EventModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          selectedDate={selectedDate}
          onSave={handleSaveEvent}
          eventToEdit={selectedEvent}
          customers={customers}
        />
      </section>
    </DndProvider>
  )
}
