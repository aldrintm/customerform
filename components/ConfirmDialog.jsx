export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Overlay */}
      <div
        className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm'
        onClick={onClose}
      ></div>

      {/* Dialog */}
      <div className='relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4'>
        <h3 className='text-lg font-medium text-gray-900 mb-2'>{title}</h3>
        <p className='text-sm text-gray-500 mb-6'>{message}</p>
        <div className='flex justify-end gap-4'>
          <button
            onClick={onClose}
            className='px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border border-gray-300'
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className='px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md'
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
