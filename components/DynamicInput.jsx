import { useState } from 'react'

export default function PurchaseOrderForm() {
  // State to hold the array of input sets
  const [inputSets, setInputSets] = useState([
    {
      purchaseOrderNumber: '',
      purchaseOrderDate: '',
      squareFeet: '',
      purchaseOrderAmount: '',
    },
  ])

  // Function to handle the addition of a new set of inputs
  const addNewInputSet = () => {
    setInputSets([
      ...inputSets,
      {
        purchaseOrderNumber: '',
        purchaseOrderDate: '',
        squareFeet: '',
        purchaseOrderAmount: '',
      },
    ])
  }

  // Function to handle changes in input fields
  const handleInputChange = (index, field, value) => {
    const updatedInputSets = inputSets.map((inputSet, i) =>
      i === index ? { ...inputSet, [field]: value } : inputSet
    )
    setInputSets(updatedInputSets)
  }

  return (
    <div>
      {/* Loop over inputSets and render input fields */}
      {inputSets.map((inputSet, index) => (
        <div
          key={index}
          className='grid grid-cols-1 gap-4 md:grid-cols-12 px-4 py-2 lg:gap-x-6'
        >
          {/* Purchase Order */}
          <div className='col-span-3'>
            <label
              htmlFor={`purchaseOrderNumber-${index}`}
              className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
            >
              Purchase Order No:
            </label>
            <input
              type='text'
              id={`purchaseOrderNumber-${index}`}
              name={`purchaseOrderNumber-${index}`}
              value={inputSet.purchaseOrderNumber}
              onChange={(e) =>
                handleInputChange(index, 'purchaseOrderNumber', e.target.value)
              }
              placeholder='Purchase Order #'
              className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
            />
          </div>
          {/* Purchase Order Date */}
          <div className='col-span-3'>
            <label
              htmlFor={`purchaseOrderDate-${index}`}
              className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
            >
              Date paid:
            </label>
            <input
              type='date'
              id={`purchaseOrderDate-${index}`}
              name={`purchaseOrderDate-${index}`}
              value={inputSet.purchaseOrderDate}
              onChange={(e) =>
                handleInputChange(index, 'purchaseOrderDate', e.target.value)
              }
              className='mt-1 w-full rounded-md border-gray-200 text-gray-500 shadow-sm sm:text-sm bg-sky-50'
            />
          </div>
          {/* Square Feet */}
          <div className='col-span-3'>
            <label
              htmlFor={`squareFeet-${index}`}
              className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
            >
              Paid sq ft.
            </label>
            <input
              type='number'
              id={`squareFeet-${index}`}
              name={`squareFeet-${index}`}
              value={inputSet.squareFeet}
              onChange={(e) =>
                handleInputChange(index, 'squareFeet', e.target.value)
              }
              placeholder='How many sqft?'
              className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
            />
          </div>
          {/* Purchase Order Amount */}
          <div className='col-span-3'>
            <label
              htmlFor={`purchaseOrderAmount-${index}`}
              className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
            >
              Purchase amount
            </label>
            <input
              type='number'
              id={`purchaseOrderAmount-${index}`}
              name={`purchaseOrderAmount-${index}`}
              value={inputSet.purchaseOrderAmount}
              onChange={(e) =>
                handleInputChange(index, 'purchaseOrderAmount', e.target.value)
              }
              placeholder='PO cost ...'
              className='mt-1 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
            />
          </div>
        </div>
      ))}

      {/* Button to add new input set */}
      <button
        type='button'
        onClick={addNewInputSet}
        className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md'
      >
        Add New PO
      </button>
    </div>
  )
}
