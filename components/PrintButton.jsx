'use client'

import { Printer } from 'lucide-react'

const PrintButton = () => {
  const handlePrint = () => {
    window.print()
  }

  return (
    <button
      onClick={handlePrint}
      className='inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors duration-200 group print:hidden'
    >
      <Printer className='w-4 h-4 mr-2 group-hover:text-blue-700' />
      <span className='text-sm font-medium'>Print Details</span>
    </button>
  )
}

export default PrintButton
