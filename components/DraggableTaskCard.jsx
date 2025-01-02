// components/DraggableTaskCard.js

import React, { useState, useEffect } from 'react'

const DraggableTaskCard = ({ task, onDelete }) => {
  const [position, setPosition] = useState({
    x: task.initialX,
    y: task.initialY,
  })
  const [taskText, setTaskText] = useState(task.text)
  const [color, setColor] = useState(task.color)
  const [isDragging, setIsDragging] = useState(false)
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e) => {
    setStartPosition({ x: e.clientX, y: e.clientY })
    setIsDragging(true)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const newX = e.clientX - startPosition.x
    const newY = e.clientY - startPosition.y

    setPosition({
      x: position.x + newX,
      y: position.y + newY,
    })

    setStartPosition({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Event listeners for mousemove and mouseup
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  const handleTaskChange = (e) => {
    setTaskText(e.target.value)
  }

  const handleColorChange = (newColor) => {
    setColor(newColor) // Update card color based on selected color
  }

  return (
    <div
      id={task.id}
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        width: '200px',
        padding: '15px',
        backgroundColor: color,
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        cursor: 'grab',
      }}
    >
      {/* Task input */}
      <textarea
        value={taskText}
        onChange={handleTaskChange}
        rows='4'
        style={{
          width: '100%',
          padding: '5px',
          borderRadius: '4px',
          border: '1px solid #ddd',
          resize: 'none',
        }}
      />
      {/* Color selection */}
      <div
        style={{
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <button
          onClick={() => handleColorChange('lightyellow')}
          style={{
            backgroundColor: 'lightyellow',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '1px solid #ddd',
            cursor: 'pointer',
          }}
        />
        <button
          onClick={() => handleColorChange('lightblue')}
          style={{
            backgroundColor: 'lightblue',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '1px solid #ddd',
            cursor: 'pointer',
          }}
        />
        <button
          onClick={() => handleColorChange('lightgreen')}
          style={{
            backgroundColor: 'lightgreen',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '1px solid #ddd',
            cursor: 'pointer',
          }}
        />
        <button
          onClick={() => handleColorChange('lightpurple')}
          style={{
            backgroundColor: 'lightpurple',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '1px solid #ddd',
            cursor: 'pointer',
          }}
        />
      </div>
      {/* Delete button */}
      <button
        onClick={() => onDelete(task.id)}
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          cursor: 'pointer',
        }}
      >
        X
      </button>
    </div>
  )
}

export default DraggableTaskCard
