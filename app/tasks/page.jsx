'use client'

// pages/index.js

import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import SideNavbar from '@/components/SideNavbar'
import DraggableTaskCard from '@/components/DraggableTaskCard'
import Button from '@/components/Button'
import { Plus } from 'lucide-react'

const Sticky = () => {
  const [cards, setCards] = useState([])

  useEffect(() => {
    // Fetch existing tasks from the server
    const fetchTasks = async () => {
      const res = await fetch('/actions/tasks')
      const data = await res.json()
      setCards(data)
    }

    fetchTasks()
  }, [])

  const addNewCard = async () => {
    const newCard = {
      id: Date.now(),
      initialX: Math.random() * window.innerWidth * 0.5,
      initialY: Math.random() * window.innerHeight * 0.5,
      text: '',
      color: 'lightyellow',
    }

    // Save new card on the server
    await fetch('/actions/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCard),
    })

    setCards((prevCards) => [...prevCards, newCard])
  }

  const deleteCard = async (id) => {
    await fetch('/actions/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })

    setCards((prevCards) => prevCards.filter((card) => card.id !== id))
  }

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Header />
      <SideNavbar />
      <main className='flex flex-col sm:gap-4 sm:py-0 sm:px-0 sm:pl-14'>
        <div className='container flex items-center justify-between px-2 py-2 text-md md:text-md text-blue-500 font-semibold'>
          <button onClick={addNewCard}>
            <div className='inline-flex items-center gap-2 rounded-md border border-blue-400 px-4 py-1 text-blue-400 hover:bg-blue-400 hover:text-white transition hover:scale-110 focus:outline-non focus:ring active:bg-blue-400'>
              <Plus className='h-4 w-4 text-xs hover:text-white' />
              <span className='text-base font-medium'>Create New Task</span>
            </div>
          </button>
        </div>

        {/* Render task cards */}
        {cards.map((card) => (
          <DraggableTaskCard
            key={card.id}
            task={card}
            onDelete={deleteCard} // Delete handler
          />
        ))}
      </main>
    </div>
  )
}

export default Sticky
