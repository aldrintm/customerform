// context/PrintContext.js
'use client'

import { createContext, useContext, useState } from 'react'

const PrintContext = createContext({
  isPrinting: false,
  printTarget: null,
  enablePrintMode: () => {},
})

export function PrintProvider({ children }) {
  const [isPrinting, setIsPrinting] = useState(false)
  const [printTarget, setPrintTarget] = useState(null)

  // old code for enablePrintMode function
  // Enhanced print function that now takes a target parameter
  // const enablePrintMode = (target = 'all') => {
  //   console.log('enablePrintMode called with target:', target)
  //   setPrintTarget(target)
  //   setIsPrinting(true)

  //   console.log('After state update (but before setTimeout):', {
  //     isPrinting: true,
  //     printTarget: target,
  //   })
  //   setTimeout(() => {
  //     console.log('Before window.print():', {
  //       isPrinting: true,
  //       printTarget: target,
  //     })
  //     window.print()

  //     setTimeout(() => {
  //       console.log('Resetting print state')
  //       setIsPrinting(false)
  //       setPrintTarget(null)
  //     }, 100)
  //   }, 100)
  // }

  // new code for enablePrintMode function
  const enablePrintMode = (target = 'all') => {
    console.log('enablePrintMode called with target:', target)

    // Update document body with data attribute for styling
    document.body.setAttribute('data-print-target', target)

    setPrintTarget(target)
    setIsPrinting(true)

    setTimeout(() => {
      window.print()

      setTimeout(() => {
        setIsPrinting(false)
        setPrintTarget(null)
        document.body.removeAttribute('data-print-target')
      }, 100)
    }, 100)
  }

  const value = {
    isPrinting,
    printTarget,
    enablePrintMode,
  }

  return (
    <PrintContext.Provider value={{ isPrinting, printTarget, enablePrintMode }}>
      {children}
    </PrintContext.Provider>
  )
}

export function usePrint() {
  const context = useContext(PrintContext)
  if (!context) {
    throw new Error('usePrint must be used within a PrintProvider')
  }
  return context
}
