// components/PrintWrapper.js
'use client'

import { usePrint } from '@/utils/printContext'

export function PrintOnly({ children, className = '', printTarget = 'all' }) {
  const { isPrinting, printTarget: currentTarget } = usePrint()
  const shouldShow =
    isPrinting && (currentTarget === 'all' || currentTarget === printTarget)

  return (
    <div
      className={`${className} ${
        shouldShow ? 'block' : 'hidden'
      } screen:hidden print:block`}
    >
      {children}
    </div>
  )
}

export function NoPrint({ children, className = '' }) {
  const { isPrinting } = usePrint()

  return (
    <div
      className={`${className} ${isPrinting ? 'hidden' : 'block'} print:hidden`}
    >
      {children}
    </div>
  )
}

// old code PrintVisibility component
// export function PrintVisibility({
//   printVisible = true,
//   children,
//   className = '',
//   printTarget = 'all',
// }) {
//   const { isPrinting, printTarget: currentTarget } = usePrint()

//   // Add console logs for debugging
//   console.log('PrintVisibility component:', {
//     printTarget,
//     currentTarget,
//     isPrinting,
//     printVisible,
//     shouldShow:
//       printVisible &&
//       (currentTarget === 'all' || currentTarget === printTarget),
//   })

//   // Only show if
//   // It should be visible during printing (printVisible)
//   // AND either were printing all OR were printing the specific target this component belongs to
//   const shouldShowForPrint =
//     printVisible && (currentTarget === 'all' || currentTarget === printTarget)

//   /// When in print mode, only show if it passes the above conditions
//   // Otherwise, show normally on screen
//   const visibility = isPrinting
//     ? shouldShowForPrint
//       ? 'block'
//       : 'hidden'
//     : 'block'

//   const printClass = printVisible ? 'print:block' : 'print:hidden'

//   return (
//     <div className={`${className} ${visibility} ${printClass}`}>{children}</div>
//   )
// }

// new code
// This component is used to control the visibility of elements during printing
export function PrintVisibility({
  printVisible = true,
  children,
  className = '',
  printTarget = 'all',
}) {
  const { isPrinting, printTarget: currentTarget } = usePrint()

  // Determine special print classes based on target
  let specialPrintClass = ''
  if (printVisible) {
    if (printTarget === 'customer') {
      specialPrintClass = 'print-customer-visible'
    } else if (printTarget === 'project') {
      specialPrintClass = 'print-project-visible'
    }
  }

  // Always add the print-hide-all class, which will hide everything by default in print mode
  const baseClasses = `${className} print-hide-all ${specialPrintClass}`

  // Standard visibility logic for screen display
  const visibility = isPrinting && !printVisible ? 'hidden' : 'block'

  return <div className={`${baseClasses} ${visibility}`}>{children}</div>
}
