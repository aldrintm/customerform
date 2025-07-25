const Button = ({ children, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='inline-flex items-center md:rounded-md md:border md:border-blue-400 p-0 md:px-3 md:py-1 text-blue-400 hover:bg-blue-400 hover:text-white transition hover:scale-105 active:scale-100 focus:outline-non active:bg-blue-400'
    >
      {/* <Plus className='h-4 w-4 text-xs hover:text-white' /> */}
      {icon && <span>{icon}</span>}
      <span className='text-xs md:text-sm md:font-medium'>{children}</span>
    </button>
  )
}

export default Button
