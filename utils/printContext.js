// context/PrintContext.js
'use client'

import { createContext, useContext, useState } from 'react'

const PrintContext = createContext(null)

export function PrintProvider({ children }) {
  const [isPrintMode, setIsPrintMode] = useState(false)

  const enablePrintMode = () => {
    setIsPrintMode(true)
    setTimeout(() => {
      window.print()
      setTimeout(() => {
        setIsPrintMode(false)
      }, 100)
    }, 100)
  }

  return (
    <PrintContext.Provider value={{ isPrintMode, enablePrintMode }}>
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
