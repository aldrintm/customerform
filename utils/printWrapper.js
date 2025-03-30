// components/PrintWrapper.js
'use client'

import { usePrint } from '@/utils/printContext'

export function PrintOnly({ children, className = '' }) {
  const { isPrintMode } = usePrint()

  return (
    <div
      className={`${className} ${
        isPrintMode ? 'block' : 'hidden'
      } screen:hidden print:block`}
    >
      {children}
    </div>
  )
}

export function NoPrint({ children, className = '' }) {
  const { isPrintMode } = usePrint()

  return (
    <div
      className={`${className} ${
        isPrintMode ? 'hidden' : 'block'
      } print:hidden`}
    >
      {children}
    </div>
  )
}

export function PrintVisibility({
  printVisible = true,
  children,
  className = '',
}) {
  const { isPrintMode } = usePrint()

  // When in print mode, only show if printVisible is true
  // Otherwise, show normally on screen
  const visibility = isPrintMode ? (printVisible ? 'block' : 'hidden') : 'block'

  const printClass = printVisible ? 'print:block' : 'print:hidden'

  return (
    <div className={`${className} ${visibility} ${printClass}`}>{children}</div>
  )
}
