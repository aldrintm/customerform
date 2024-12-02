'use client'
import { useState, useEffect } from 'react'

const DateAndTime = () => {
  const today = new Date()
  const formattedDate = today.toDateString()
  const formattedTime = today.toLocaleTimeString()

  const [date, setDate] = useState(formattedDate)
  const [time, setTime] = useState(formattedTime)

  useEffect(() => {
    // set up interval to update time every 1 second
    const intervalTime = setInterval(() => {
      // update time this way
      setTime(new Date().toLocaleTimeString())
    }, 1000)
    // clean up the interval when the component is unmounted
    return () => clearInterval(intervalTime)
  }, []) // empty array ensures this effect runs once when the component mounts

  return (
    <section>
      <div className='bg-white grid grid-cols-1 h-20 border border-gray-300 rounded-lg p-4 m-2'>
        <p className='text-sm my-auto mx-auto text-gray-700 flex items-center'>
          {date}
          <span className='font-md text-xl px-4'>@ {time}</span>
        </p>
      </div>
    </section>
  )
}

export default DateAndTime
