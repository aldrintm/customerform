'use client'

import { Link } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import markMessageAsRead from '@/app/actions/markMessageAsRead'
import deleteMessage from '@/app/actions/deleteMessage'

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read)
  const [isDeleted, setIsDeleted] = useState(false)

  const handleReadClick = async () => {
    const read = await markMessageAsRead(message._id)

    setIsRead(read)
    toast.success(`Marked as ${read ? 'Read' : 'New'}`)
  }

  const handleDeleteClick = async () => {
    await deleteMessage(message._id)

    setIsDeleted(true)
    toast.success('Message Deleted')
  }

  if (isDeleted) {
    return <p>Deleted Message</p>
  }

  return (
    <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
      {/* Badge */}
      {!isRead && (
        <div className='absolute top-2 right-2 bg-yello-500 text-white px-2 py-1 rounded-md'>
          New
        </div>
      )}
      <h2 className='text-xl mb-4'>
        <span className='font-bold'>Message:</span>
        {message.customer.subject}
      </h2>
      <p className='text-gray-700'>{message.message}</p>
      <ul className='mt-4'>
        <li>
          <strong>Reply Message:</strong>{' '}
          <Link href={`mailto: ${message.email}`} className='text-blue-500'>
            {message.email}
          </Link>
        </li>
        <li>
          <strong>Reply Phone:</strong>{' '}
          <Link href={`tel: ${message.phone}`} className='text-blue-500'>
            {message.phone}
          </Link>
        </li>
        <li>
          <strong>Received:</strong>{' '}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md'
      >
        {isRead ? 'Mark as New' : 'Mark as Read'}
      </button>
      <button
        onClick={handleDeleteClick}
        className='mt-4 mr-3 bg-red-500 text-white py-1 px-3 rounded-md'
      >
        Delete
      </button>
    </div>
  )
}

export default MessageCard
