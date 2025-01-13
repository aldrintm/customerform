import { Link } from 'lucide-react'

const MessageCard = ({ message }) => {
  return (
    <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
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
      <button className='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md'>
        Mark as Read
      </button>
      <button className='mt-4 mr-3 bg-red-500 text-white py-1 px-3 rounded-md'>
        Delete
      </button>
    </div>
  )
}

export default MessageCard
