'use client'

import { useState, useEffect } from 'react'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import bookmarkCustomer from '@/app/actions/bookmarkCustomer'
import checkBookmarkStatus from '@/app/actions/checkBookmarkStatus'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'

const BookmarkButton = ({ customer }) => {
  const { data: session } = useSession()
  const user = session?.user?.email

  const [isBookmarked, setIsBookmarked] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    checkBookmarkStatus(customer._id).then((res) => {
      if (res.error) toast.error(res.error)
      if (res.isBookmarked) setIsBookmarked(res.isBookmarked)
      setLoading(false)
    })
  }, [customer._id, user, checkBookmarkStatus])

  const handleBookmark = async () => {
    if (!user) {
      toast.error('You need to be signed in to save this customer')
      return
    }

    bookmarkCustomer(customer._id).then((res) => {
      if (res.error) {
        return toast.error(`Error: ${res.error}`)
      }
      setIsBookmarked(res.isBookmarked)
      toast.success(res.message || 'Bookmarked successfully!')
    })
  }

  return isBookmarked ? (
    <button
      onClick={handleBookmark}
      className='bg-white text-orange-600 font-bold px-2 py-2 rounded-full flex items-center justify-center'
    >
      <BookmarkCheck className='hover:fill-[#f16321]' />
    </button>
  ) : (
    <button
      onClick={handleBookmark}
      className='bg-white text-blue-400 font-bold px-2 py-2 rounded-full flex items-center justify-center'
    >
      {/* <Bookmark className='hover:fill-[#42a5f5]' /> */}
      <Bookmark className='hover:fill-[#42a5f5]' />
    </button>
  )
}

export default BookmarkButton
