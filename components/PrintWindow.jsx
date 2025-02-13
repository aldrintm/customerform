'use client'
import { useEffect } from 'react'

const PrintWindow = ({ children }) => {
  useEffect(() => {
    // When this component mounts, trigger the print dialog
    window.print()
  }, [])

  return <div>{children}</div>
}

export default PrintWindow
