'use client'

import { Bookmark, BookmarkCheck } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import bookmarkCustomer from '@/app/actions/bookmarkCustomer'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'

const BookmarkButton = ({ customer }) => {
  const { data: session } = useSession()

  const user = session?.user?.email

  const handleBookmark = async () => {
    if (!user) {
      toast.error('You need to be signed in to save this customer')
      return
    }

    bookmarkCustomer(customer._id).then((res) => {
      if (res.error) {
        return toast.error(`Error: ${res.error}`)
      }
      toast.success(res.message || 'Bookmarked successfully!')
    })
  }

  return (
    <button
      onClick={handleBookmark}
      className='bg-white text-blue-400 font-bold px-2 py-2 rounded-full flex items-center justify-center'
    >
      {/* <Bookmark className='hover:fill-[#42a5f5]' /> */}
      <BookmarkCheck className='hover:fill-[#42a5f5]' />
    </button>
  )
}

export default BookmarkButton
