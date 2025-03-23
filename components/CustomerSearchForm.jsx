'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CustomerSearchForm = () => {
  const [search, setSearch] = useState('')
  const [po, setPo] = useState('')

  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (search === '') {
      router.push('/dashboard/customers')
    } else {
      const query = `?search=${search}`
      router.push(`/dashboard/customers/search-results${query}`)
    }
  }

  return (
    <form
      className='hidden sm:block relative ml-auto flex-1 md:grow-0'
      onSubmit={handleSubmit}
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
        className='lucide lucide-search absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground'
      >
        <circle cx='11' cy='11' r='8'></circle>
        <path d='m21 21-4.3-4.3'></path>
      </svg>

      <input
        type='search'
        name='q'
        placeholder='Search for customers...'
        className='flex h-10 mt-1 w-full rounded-md border border-input border-gray-300 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 bg-background pl-8 md:w-[250px] lg:w-[250px]'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  )
}

export default CustomerSearchForm
