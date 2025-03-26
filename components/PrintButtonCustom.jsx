'use client'

import { Printer } from 'lucide-react'

const CustomPrintButton = ({ customer, schedules }) => {
  const handlePrint = () => {
    // Add class to body before printing
    document.body.classList.add('printing-custom-layout')

    // Call print
    window.print()

    // Remove class after print dialog closes
    window.onafterprint = () => {
      document.body.classList.remove('printing-custom-layout')
    }
  }

  return (
    <button
      onClick={handlePrint}
      className='inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors duration-200 group print:hidden ml-4'
    >
      <Printer className='w-4 h-4 mr-2 group-hover:text-blue-700' />
      <span className='text-sm font-medium'>Print Details</span>
    </button>
  )
}

export default CustomPrintButton
