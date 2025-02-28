'use client'
import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'

export default function EventModal({
  isOpen,
  onClose,
  selectedDate,
  onSave,
  eventToEdit = null,
  customers = [],
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '',
    customer: '',
    type: 'measure', // Default type
    notes: '',
  })

  // If we're editing an existing event, populate the form
  useEffect(() => {
    if (eventToEdit) {
      setFormData({
        title: eventToEdit.title || '',
        description: eventToEdit.description || '',
        time: eventToEdit.time || '',
        customer: eventToEdit.customer || '',
        type: eventToEdit.type || 'measure',
        notes: eventToEdit.notes || '',
      })
    } else {
      // Reset form when adding a new event
      setFormData({
        title: '',
        description: '',
        time: '',
        customer: '',
        type: 'measure',
        notes: '',
      })
    }
  }, [eventToEdit, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...formData,
      date: selectedDate,
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-xl font-semibold text-gray-900'>
            {eventToEdit ? 'Edit Event' : 'Add New Event'}
          </h3>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-500'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='18' y1='6' x2='6' y2='18'></line>
              <line x1='6' y1='6' x2='18' y2='18'></line>
            </svg>
          </button>
        </div>

        <div className='mb-4'>
          <p className='text-sm text-gray-500'>
            {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : ''}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Title
            </label>
            <input
              type='text'
              name='title'
              value={formData.title}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Description
            </label>
            <input
              type='text'
              name='description'
              value={formData.description}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Time
            </label>
            <input
              type='time'
              name='time'
              value={formData.time}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Customer
            </label>
            <select
              name='customer'
              value={formData.customer}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md'
            >
              <option value=''>Select a customer</option>
              {customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.firstName} {customer.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Type
            </label>
            <select
              name='type'
              value={formData.type}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md'
            >
              <option value='measure'>Measure</option>
              <option value='install'>Install</option>
              <option value='meeting'>Meeting</option>
              <option value='other'>Other</option>
            </select>
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Notes
            </label>
            <textarea
              name='notes'
              value={formData.notes}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md'
              rows='3'
            ></textarea>
          </div>

          <div className='flex justify-end gap-2 mt-4'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700'
            >
              {eventToEdit ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
