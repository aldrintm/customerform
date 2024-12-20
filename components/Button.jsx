import { Plus } from 'lucide-react'

const Button = ({ children }) => {
  return (
    <div className='inline-flex items-center gap-2 rounded-md border border-blue-400 px-4 py-1 text-blue-400 hover:bg-blue-400 hover:text-white transition hover:scale-110 focus:outline-non focus:ring active:bg-blue-400'>
      <Plus className='h-4 w-4 text-xs hover:text-white' />
      <span className='text-base font-medium'>{children}</span>
    </div>
  )
}

export default Button