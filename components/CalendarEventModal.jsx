'use client'
import { useEffect, useState } from 'react'
import { X, Calendar, Clock, User, Trash2 } from 'lucide-react'
import {
  createCalendarSchedule,
  updateCalendarSchedule,
  deleteCalendarSchedule,
} from '@/app/actions/calendarActions'

export default function CalendarEventModal({
  isOpen,
  onClose,
  selectedDate,
  selectedEvent,
  customers,
  onSave,
  onDelete,
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    customerId: '',
    projectId: '',
    scheduleType: 'measure',
    scheduleDate: '',
    scheduleTime: '',
    scheduledBy: '',
    description: '',
    notes: '',
  })
  const [projects, setProjects] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  // Reset form when modal opens with new data
  useEffect(() => {
    if (isOpen) {
      if (selectedEvent) {
        // Edit mode - populate form with event data
        setFormData({
          scheduleId: selectedEvent.id,
          customerId: selectedEvent.customerId || '',
          projectId: selectedEvent.projectId || '',
          scheduleType: selectedEvent.type || 'measure',
          scheduleDate: selectedEvent.date
            ? new Date(selectedEvent.date).toISOString().split('T')[0]
            : '',
          scheduleTime: selectedEvent.time || '',
          scheduledBy: selectedEvent.assignedTo || '',
          description: selectedEvent.description || '',
          notes: selectedEvent.notes || '',
        })

        // If we have a customer ID, find the customer to get their projects
        if (selectedEvent.customerId) {
          const customer = customers.find(
            (c) => c._id === selectedEvent.customerId
          )
          setSelectedCustomer(customer)
          setProjects(customer?.projects || [])
        }
      } else if (selectedDate) {
        // New event mode - just set the date
        setFormData({
          ...formData,
          scheduleDate: selectedDate.toISOString().split('T')[0],
        })
      }
    }
  }, [isOpen, selectedDate, selectedEvent, customers])

  // Handle customer selection - load their projects
  const handleCustomerChange = (e) => {
    const customerId = e.target.value
    setFormData({ ...formData, customerId, projectId: '' }) // Reset project when customer changes

    if (customerId) {
      const customer = customers.find((c) => c._id === customerId)
      setSelectedCustomer(customer)
      setProjects(customer?.projects || [])
    } else {
      setSelectedCustomer(null)
      setProjects([])
    }
  }

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Create formData object for server action
      const formDataObj = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formDataObj.append(key, value)
        }
      })

      // Call the appropriate server action
      const result = selectedEvent
        ? await updateCalendarSchedule(formDataObj)
        : await createCalendarSchedule(formDataObj)

      if (result.success) {
        if (onSave) {
          onSave(result)
        }
        onClose()
      } else {
        setError(result.error || 'Failed to save event')
      }
    } catch (error) {
      setError(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Handle delete event
  const handleDelete = async () => {
    if (
      !selectedEvent ||
      !window.confirm('Are you sure you want to delete this event?')
    ) {
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await deleteCalendarSchedule(selectedEvent.id)

      if (result.success) {
        if (onDelete) {
          onDelete(selectedEvent.id)
        }
        onClose()
      } else {
        setError(result.error || 'Failed to delete event')
      }
    } catch (error) {
      setError(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black bg-opacity-50'
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className='relative bg-white w-full max-w-lg p-6 rounded-lg shadow-lg'>
        {/* Header */}
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold'>
            {selectedEvent ? 'Edit Schedule Event' : 'New Schedule Event'}
          </h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700'
          >
            <X className='h-5 w-5' />
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className='mb-4 p-3 bg-red-100 text-red-700 rounded-md'>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Customer Selection */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Customer
            </label>
            <select
              name='customerId'
              value={formData.customerId}
              onChange={handleCustomerChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              required
            >
              <option value=''>Select Customer</option>
              {customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.firstName} {customer.lastName} - {customer.phone}
                </option>
              ))}
            </select>
          </div>

          {/* Project Selection - only show if customer has projects */}
          {projects.length > 0 && (
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Project
              </label>
              <select
                name='projectId'
                value={formData.projectId}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              >
                <option value=''>Select Project</option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.description ||
                      project.materialType ||
                      'Project ' + project._id}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Schedule Type */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Schedule Type
            </label>
            <div className='flex gap-4'>
              <label className='inline-flex items-center'>
                <input
                  type='radio'
                  name='scheduleType'
                  value='measure'
                  checked={formData.scheduleType === 'measure'}
                  onChange={handleChange}
                  className='form-radio h-4 w-4 text-blue-600'
                />
                <span className='ml-2'>Measure</span>
              </label>
              <label className='inline-flex items-center'>
                <input
                  type='radio'
                  name='scheduleType'
                  value='install'
                  checked={formData.scheduleType === 'install'}
                  onChange={handleChange}
                  className='form-radio h-4 w-4 text-blue-600'
                />
                <span className='ml-2'>Install</span>
              </label>
            </div>
          </div>

          {/* Date & Time */}
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                <Calendar className='h-4 w-4 inline mr-1' />
                Date
              </label>
              <input
                type='date'
                name='scheduleDate'
                value={formData.scheduleDate}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                <Clock className='h-4 w-4 inline mr-1' />
                Time
              </label>
              <select
                name='scheduleTime'
                value={formData.scheduleTime}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                required
              >
                <option value=''>Select Time</option>
                {formData.scheduleType === 'measure' ? (
                  // Measure time options
                  <>
                    <option value='8-10'>8:00 AM - 10:00 AM</option>
                    <option value='10-12'>10:00 AM - 12:00 PM</option>
                    <option value='12-2'>12:00 PM - 2:00 PM</option>
                    <option value='2-4'>2:00 PM - 4:00 PM</option>
                    <option value='7-9'>7:00 AM - 9:00 AM</option>
                    <option value='9-11'>9:00 AM - 11:00 AM</option>
                    <option value='11-1'>11:00 AM - 1:00 PM</option>
                    <option value='1-3'>1:00 PM - 3:00 PM</option>
                  </>
                ) : (
                  // Install time options
                  <>
                    <option value='9-12'>9:00 AM - 12:00 PM</option>
                    <option value='1-4'>1:00 PM - 4:00 PM</option>
                    <option value='ask office'>Ask Office</option>
                    <option value='allday'>All Day</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Assigned To */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              <User className='h-4 w-4 inline mr-1' />
              {formData.scheduleType === 'measure'
                ? 'Measure By'
                : 'Install By'}
            </label>
            <select
              name='scheduledBy'
              value={formData.scheduledBy}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              required
            >
              <option value=''>Select Technician</option>
              {formData.scheduleType === 'measure' ? (
                // Measure technicians
                <>
                  <option value='Anilber'>Anilber</option>
                  <option value='Javier'>Javier</option>
                  <option value='Jeff'>Jeff</option>
                  <option value='Other'>Other</option>
                </>
              ) : (
                // Install technicians
                <>
                  <option value='Francisco'>Francisco</option>
                  <option value='Chico'>Chico Meza</option>
                  <option value='Mario Torres'>Mario Torres</option>
                  <option value='Ruben'>Ruben</option>
                  <option value='Martin'>Martin</option>
                  <option value='Cholo'>Cholo</option>
                  <option value='Ernesto'>Ernesto</option>
                  <option value='Efren'>Efren</option>
                  <option value='Vlad'>Vlad</option>
                  <option value='Mario Gamez'>Mario Gamez</option>
                  <option value='Other'>Other</option>
                </>
              )}
            </select>
          </div>

          {/* Description */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Description
            </label>
            <input
              type='text'
              name='description'
              value={formData.description}
              onChange={handleChange}
              placeholder={`What is being ${
                formData.scheduleType === 'measure' ? 'measured' : 'installed'
              }?`}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          {/* Notes */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Notes
            </label>
            <textarea
              name='notes'
              value={formData.notes}
              onChange={handleChange}
              rows='3'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              placeholder='Add any special instructions or notes...'
            ></textarea>
          </div>

          {/* Footer with buttons */}
          <div className='flex justify-between pt-2'>
            {selectedEvent && (
              <button
                type='button'
                onClick={handleDelete}
                className='inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100'
                disabled={loading}
              >
                <Trash2 className='h-4 w-4 mr-1' />
                Delete
              </button>
            )}

            <div className='flex gap-2 ml-auto'>
              <button
                type='button'
                onClick={onClose}
                className='px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type='submit'
                className='px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                disabled={loading}
              >
                {loading ? 'Saving...' : selectedEvent ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
