'use client'
import addEmployee from '@/app/actions/addEmployee'
import { useFormStatus } from 'react-dom'
import { ClipLoader } from 'react-spinners'
import { UserRoundPlus } from 'lucide-react' // Import any icons you need

// Button component to access form status
function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      className={`w-full hover:bg-gray rounded-lg border border-blue-600 
                  bg-blue-600 px-8 py-2 text-white hover:bg-transparent 
                  hover:text-blue-600 focus:outline-none focus:ring 
                  active:text-blue-500`}
      type='submit'
      disabled={pending}
    >
      {pending ? (
        <ClipLoader
          color='#2fa8f6'
          size={23}
          loading={true}
          speedMultiplier={1}
        />
      ) : (
        <div className='flex justify-center items-center gap-2'>
          <UserRoundPlus className='w-5 h-5 flex items-center text-center' />
          Add Employee
        </div>
      )}
    </button>
  )
}

export default function EmployeeForm() {
  return (
    <section className='bg-white'>
      <div className='container max-w-4xl mx-auto px-15 md:rounded-2xl'>
        <div className='mx-auto text-left py-2 pl-1 text-sm md:text-md text-blue-500 font-bold'>
          New Employee Details
        </div>

        <div className='isolate px-4 sm:pb-2 lg:px-0'>
          {/* Form Starts Here */}
          <form
            action={addEmployee}
            className='container mx-auto my-4 justify-center'
          >
            <div className='grid grid-cols-1 gap-4 lg:gap-6 pb-2'>
              {/* Left Side of Form Column */}

              <div className='grid grid-cols-1 gap-2 lg:row-auto lg:gap-2 bg-white p-4 md:border border-gray-300 md:rounded-md'>
                {/* Employee ID + First Name + Last Name */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3 p-4 lg:gap-x-6'>
                  {/* Employee Id */}
                  <div>
                    <label
                      htmlFor='employeeId'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Employee ID
                    </label>

                    <input
                      type='number'
                      id='employeeId'
                      name='employeeId'
                      required
                      placeholder='Employee ID Number'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>

                  {/* First Name */}
                  <div>
                    <label
                      htmlFor='firstName'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      First Name
                    </label>

                    <input
                      type='text'
                      id='firstName'
                      name='firstName'
                      required
                      placeholder='First name'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      htmlFor='lastName'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Last Name
                    </label>

                    <input
                      type='text'
                      id='lastName'
                      name='lastName'
                      required
                      placeholder='Last name'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                </div>

                {/* Phone and Email */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 pt-2 p-4 lg:gap-x-6'>
                  {/* Phone */}
                  <div>
                    <label
                      htmlFor='phone'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Phone
                    </label>

                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      required
                      placeholder='(408) xxx xxxx'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Email
                    </label>

                    <input
                      type='email'
                      id='email'
                      name='email'
                      required
                      placeholder='Email'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                </div>

                {/* Address */}
                <div className='grid grid-cols-1 gap-4 pt-2 p-4  lg:gap-x-6'>
                  {/* Street Address */}
                  <div>
                    <label
                      htmlFor='street'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Street Address
                    </label>

                    <input
                      type='text'
                      id='street'
                      name='street'
                      required
                      placeholder='Example: 33100 Transit Ave.'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                </div>

                {/* City + State + Zipcode */}
                <div className='grid grid-cols-1 gap-4 md:gap-x-4 md:grid-cols-8 pt-2 p-4  lg:gap-x-6'>
                  {/* City */}
                  <div className='md:col-span-5'>
                    <label
                      htmlFor='city'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      City
                    </label>

                    <input
                      type='text'
                      id='city'
                      name='city'
                      required
                      placeholder='City'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>

                  {/* State */}
                  <div className='md:col-span-1'>
                    <label
                      htmlFor='state'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      State
                    </label>

                    <input
                      type='text'
                      id='state'
                      name='state'
                      defaultValue='CA'
                      readOnly
                      className='mt-1 w-full rounded-md border-gray-200 text-gray-500 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>

                  {/* Zipcode */}
                  <div className='md:col-span-2'>
                    <label
                      htmlFor='zipcode'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Zipcode
                    </label>

                    <input
                      type='text'
                      id='zipcode'
                      name='zipcode'
                      required
                      placeholder='Zipcode'
                      className='block mt-1 w-full rounded-md border-gray-200 focus-bg-white shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                </div>

                {/* Status + Department + Position */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3 pt-2 p-4 lg:gap-x-6'>
                  {/* Status */}
                  <div>
                    <label
                      htmlFor='status'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Status
                    </label>

                    <select
                      name='status'
                      id='status'
                      className='mt-1 w-full rounded-md shadow-sm sm:text-sm text-gray-500 bg-sky-50 border-gray-200 focus-bg-white'
                      defaultValue={'DEFAULT'}
                    >
                      <option value='DEFAULT' disabled>
                        Choose ...
                      </option>
                      <option value='active'>Active</option>
                      <option value='inactive'>Inactive</option>
                      <option value='terminated'>Terminated</option>
                    </select>
                  </div>

                  {/* Department */}
                  <div>
                    <label
                      htmlFor='department'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Department
                    </label>

                    <select
                      name='department'
                      id='department'
                      className='mt-1 w-full rounded-md shadow-sm sm:text-sm text-gray-500 bg-sky-50 border-gray-200 focus-bg-white'
                      defaultValue={'DEFAULT'}
                    >
                      <option value='DEFAULT' disabled>
                        Choose ...
                      </option>
                      <option value='office'>Office</option>
                      <option value='shop'>Shop</option>
                      <option value='install'>Installation</option>
                    </select>
                  </div>

                  {/* Position */}
                  <div>
                    <label
                      htmlFor='position'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Position
                    </label>

                    <select
                      name='position'
                      id='position'
                      className='mt-1 w-full rounded-md shadow-sm sm:text-sm text-gray-500 bg-sky-50 border-gray-200 focus-bg-white'
                      defaultValue={'DEFAULT'}
                    >
                      <option value='DEFAULT' disabled>
                        Choose ...
                      </option>
                      <option value='office'>Office Admin</option>
                      <option value='sales'>Sales</option>
                      <option value='manager'>Shop Manager</option>
                      <option value='shop'>Shop Helper</option>
                      <option value='polisher'>Polisher</option>
                      <option value='cutter'>Cutter</option>
                      <option value='cncOperator'>CNC Operator</option>
                      <option value='special'>Special Projects</option>
                      <option value='templates'>Template Technician</option>
                      <option value='installer'>Installer Main</option>
                      <option value='helper'>Installer Help</option>
                      <option value='driver'>Driver</option>
                    </select>
                  </div>
                </div>

                {/* Hire Date = Termination Date */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 p-4 lg:gap-x-6'>
                  {/* Hire Date */}
                  <div>
                    <label
                      htmlFor='hireDate'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Hire Date
                    </label>

                    <input
                      type='date'
                      id='hireDate'
                      name='hireDate'
                      required
                      placeholder='Employee ID Number'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>

                  {/* Termination Date */}
                  <div>
                    <label
                      htmlFor='terminationDate'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Termination Date
                    </label>

                    <input
                      type='date'
                      id='terminationDate'
                      name='terminationDate'
                      required
                      placeholder='First name'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                </div>

                {/* Emergency Contact Info */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 p-4  lg:gap-x-6'>
                  {/* Emergency Contact */}
                  <div>
                    <label
                      htmlFor='emergencyContact'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Emergency Contact
                    </label>

                    <input
                      type='text'
                      id='emergencyContact'
                      name='emergencyContact'
                      placeholder='Name of emergency contact'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>

                  {/* Emergency Contact Phone */}
                  <div>
                    <label
                      htmlFor='emergencyPhone'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Emergency Contact Phone
                    </label>

                    <input
                      type='tel'
                      id='emergencyPhone'
                      name='emergencyPhone'
                      placeholder='(408) xxx xxxx'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='emergencyContact'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Relation to Employee
                    </label>

                    <input
                      type='text'
                      id='emergencyRelation'
                      name='emergencyRelation'
                      placeholder='Relation to employee'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                </div>

                {/* Textarea for Notes */}
                <div className='grid grid-cols-1 lg:grid-cols-1 pt-2 p-4 '>
                  {/* Text Area for Special Notes with Customer */}
                  <div className=''>
                    <label
                      htmlFor='notes'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      {' '}
                      Internal Notes{' '}
                    </label>

                    <textarea
                      id='notes'
                      name='notes'
                      rows='1'
                      className='mt-1 w-full rounded-md py-4 border-gray-200 shadow-sm sm:text-sm'
                      placeholder='Enter notes about this employee ...'
                    ></textarea>
                  </div>
                </div>
                <div className='p-4'>
                  <span className=''>
                    <SubmitButton />
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
