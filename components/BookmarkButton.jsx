import { Bookmark, BookmarkCheck } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const BookmarkButton = ({ customer }) => {
  console.log(customer)
  return (
    <button className='bg-white text-blue-400 font-bold px-2 py-2 rounded-full flex items-center justify-center'>
      <Bookmark className='hover:fill-[#42a5f5]' />
      <BookmarkCheck className='hover:fill-[#42a5f5]' />
    </button>
  )
}

export default BookmarkButton
