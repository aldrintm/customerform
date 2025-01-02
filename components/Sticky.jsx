import React, { useState } from 'react'

const DraggableCard = ({
  id,
  initialX,
  initialY,
  addNewCard,
  gridSize,
  containerWidth,
  containerHeight,
  isMainCard,
}) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY })
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [task, setTask] = useState('') // Task text state

  const snappingThreshold = 20 // Threshold for snapping (in pixels)

  const handleMouseDown = (e) => {
    setStartPosition({
      x: e.clientX,
      y: e.clientY,
    })
    setIsDragging(true)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return

    const newX = e.clientX - startPosition.x
    const newY = e.clientY - startPosition.y

    let newPosX = position.x + newX
    let newPosY = position.y + newY

    // Snap to the nearest grid line within the threshold
    if (Math.abs(newPosX % gridSize) < snappingThreshold) {
      newPosX = Math.round(newPosX / gridSize) * gridSize
    }
    if (Math.abs(newPosY % gridSize) < snappingThreshold) {
      newPosY = Math.round(newPosY / gridSize) * gridSize
    }

    setPosition({
      x: newPosX,
      y: newPosY,
    })

    setStartPosition({
      x: e.clientX,
      y: e.clientY,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Event listeners for mousemove and mouseup
  React.useEffect(() => {
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

  const handleInputChange = (e) => {
    setTask(e.target.value) // Update task state on input change
  }

  const handleAddCard = () => {
    const newCard = {
      id: Date.now(),
      x: Math.floor(Math.random() * (containerWidth / gridSize)) * gridSize,
      y: Math.floor(Math.random() * (containerHeight / gridSize)) * gridSize,
    } // Create a new card with a random position on the grid
    addNewCard(newCard) // Pass the new card to the parent
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        width: '200px',
        padding: '10px',
        backgroundColor: 'lightblue',
        border: '1px solid #ccc',
        borderRadius: '8px',
        cursor: 'grab',
      }}
    >
      <input
        type='text'
        value={task}
        onChange={handleInputChange}
        placeholder='Enter your task...'
        style={{
          width: '100%',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ddd',
        }}
      />
      {/* "+" Button to add a new card, only for the main card */}
      {isMainCard && (
        <button
          onClick={handleAddCard}
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            fontSize: '18px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            cursor: 'pointer',
          }}
        >
          +
        </button>
      )}
    </div>
  )
}

const TaskManager = () => {
  const gridSize = 100 // Grid size for snapping (100px x 100px)
  const containerWidth = 800 // Width of the container
  const containerHeight = 600 // Height of the container

  const [cards, setCards] = useState([
    { id: Date.now(), x: 100, y: 100 }, // Initial card
  ])

  const addNewCard = (newCard) => {
    setCards((prevCards) => [...prevCards, newCard]) // Add new card to the state
  }

  return (
    <div
      style={{
        position: 'relative',
        width: containerWidth,
        height: containerHeight,
        backgroundColor: '#f4f4f4',
        border: '2px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      {cards.map((card, index) => (
        <DraggableCard
          key={card.id}
          id={card.id}
          initialX={card.x}
          initialY={card.y}
          addNewCard={addNewCard} // Pass the addNewCard function to the draggable card
          gridSize={gridSize} // Pass the grid size for snapping
          containerWidth={containerWidth} // Pass container width for new card placement
          containerHeight={containerHeight} // Pass container height for new card placement
          isMainCard={index === 0} // Only the first card (index === 0) will have the "+" button
        />
      ))}
    </div>
  )
}

export default TaskManager
