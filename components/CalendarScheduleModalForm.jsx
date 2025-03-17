'use client'
import { useState } from 'react'
import { format } from 'date-fns'

const ScheduleModal = ({
  isOpen,
  onClose,
  selectedDate,
  customers,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    customerId: '',
    measureTime: '',
    measureBy: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      measureDate: selectedDate,
    })
    setFormData({ customerId: '', measureTime: '', measureBy: '' })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center'>
      <div className='bg-white rounded-lg p-6 w-full max-w-md'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold text-gray-900'>
            Schedule for {format(selectedDate, 'MMMM d, yyyy')}
          </h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700'
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>Customer</label>
            <select
              value={formData.customerId}
              onChange={(e) =>
                setFormData({ ...formData, customerId: e.target.value })
              }
              className='w-full p-2 border rounded'
              required
            >
              <option value=''>Select a customer</option>
              {customers?.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.firstName} {customer.lastName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>Time</label>
            <input
              type='time'
              value={formData.measureTime}
              onChange={(e) =>
                setFormData({ ...formData, measureTime: e.target.value })
              }
              className='w-full p-2 border rounded'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>
              Measured By
            </label>
            <input
              type='text'
              value={formData.measureBy}
              onChange={(e) =>
                setFormData({ ...formData, measureBy: e.target.value })
              }
              className='w-full p-2 border rounded'
              required
            />
          </div>
          <div className='flex justify-end gap-2 mt-6'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 text-gray-600 hover:bg-gray-100 rounded'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ScheduleModal
