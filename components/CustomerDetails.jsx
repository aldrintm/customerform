'use client'
import Link from 'next/link'
import { useState, useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  Paperclip,
  PhoneIncoming,
  Store,
  ShieldAlert,
  Plus,
  Trash2,
  Minus,
  SquarePen,
  Trash,
  Printer,
  Mail,
  NotepadText,
  NotepadTextDashed,
  MessageCircleMore,
  Lock,
} from 'lucide-react'
import Button from './Button'
import formatPhoneNumber from '@/app/actions/formatPhoneNumber'
import customerWithCapitalizedNames from '@/app/actions/customerWithCapitalizedNames'
import deleteCustomer from '@/app/actions/deleteCustomer'
import { deleteProject } from '@/app/actions/deleteProject'
import { toast } from 'react-toastify'
import updateNote from '@/app/actions/updateNote' // this server action for updating a note
import deleteNote from '@/app/actions/deleteNote'
import BookmarkButton from './BookmarkButton'
import { formatDate } from '@/utils/formatDate'
import { PrintProvider, usePrint } from '@/utils/printContext'
import { NoPrint, PrintVisibility } from '@/utils/printWrapper'
import { sendSmsAction } from '@/app/actions/sendSmsAction'
import { sendEmailAction } from '@/app/actions/sendEmailAction'
import ConfirmDialog from './ConfirmDialog'
import CustomerMap from './CustomerMap'

function CustomerDetailsContent({ customer: initialCustomer, schedules }) {
  const router = useRouter()
  const { enablePrintMode: originalEnablePrintMode, printTarget } = usePrint()

  // initialCustomer is now a plain object that includes a populated projects array.
  const [customer, setCustomers] = useState(initialCustomer)
  const [project, setProject] = useState('')
  const [selectedNote, setSelectedNote] = useState(null)
  const [editedNote, setEditedNote] = useState('')
  const [isNavigating, setIsNavigating] = useState(false) //navigation loading
  const [isPending, startTransition] = useTransition() //for smooth navigation
  const [showPrintAnimation, setShowPrintAnimation] = useState(false) // for printing animation
  const [showEmailConfirm, setShowEmailConfirm] = useState(false) // for email confirmation
  const [showSmsConfirm, setShowSmsConfirm] = useState(false) // for SMS confirmation
  const [showDeleteCustomerConfirm, setShowDeleteCustomerConfirm] =
    useState(false) // for customer delete confirmation
  const [pendingAction, setPendingAction] = useState(null)

  // Sync local state with prop changes
  useEffect(() => {
    setCustomers(initialCustomer) // updates the state when prop changes
  }, [initialCustomer])

  // Prefetch the pages on mount
  useEffect(() => {
    if (customer?._id) {
      router.prefetch(`/dashboard/customers/${customer._id}/notes`)
      router.prefetch(`/dashboard/customers/${customer._id}/project`)
      router.prefetch(`/dashboard/customers/${customer._id}/editCustomer`)
      router.prefetch(`/dashboard/customers/${customer._id}/editProject`)
      router.prefetch(`/dashboard/customers/${customer._id}/schedule`)
    }
  }, [customer._id, router])

  // Print header component if needed
  // const PrintHeader = () => {
  //   const { printTarget } = usePrint()

  //   // Only show in print mode
  //   if (!printTarget) return null

  //   // Determine the title based on what's being printed
  //   let title = 'Complete Customer File'
  //   if (printTarget === 'customer') title = 'Customer Information'
  //   if (printTarget === 'project') title = 'Project Details'

  //   return (
  //     <div className='hidden print:block mb-6 text-center'>
  //       <div className='border-b border-gray-300 pb-4'>
  //         <h1 className='text-xl font-bold text-blue-600'>{title}</h1>
  //         <p className='text-sm text-gray-600'>
  //           {customerWithCapitalizedNames(customer.firstName)}{' '}
  //           {customerWithCapitalizedNames(customer.lastName)} -{' '}
  //           {formatPhoneNumber(customer.phone)}
  //         </p>
  //         <p className='text-sm text-gray-500 mt-1'>
  //           Printed on {new Date().toLocaleDateString()}
  //         </p>
  //       </div>
  //     </div>
  //   )
  // }

  // Enhanced print function for customer info only
  const printCustomerInfo = () => {
    setShowPrintAnimation(true)
    setTimeout(() => {
      originalEnablePrintMode('customer') // Pass 'customer' as the target
      setTimeout(() => {
        setShowPrintAnimation(false)
      }, 500)
    }, 500)
  }

  // Enhanced print function for customer info only
  const printProjectInfo = () => {
    setShowPrintAnimation(true)
    setTimeout(() => {
      originalEnablePrintMode('project') // Pass 'project' as the target
      setTimeout(() => {
        setShowPrintAnimation(false)
      }, 500)
    }, 500)
  }

  // Enhanced print function to include animation
  const enhancedPrintMode = () => {
    // Show Animation
    setShowPrintAnimation(true)
    // After animation plays, trigget actual print
    setTimeout(() => {
      originalEnablePrintMode()

      // Reset animation state after a printing
      setTimeout(() => {
        setShowPrintAnimation(false)
      }, 500) // Adjust the timeout as needed
    }, 500) // Adjust the timeout as needed
  }

  // Trigger for Print animation
  const PrintAnimation = () => {
    if (!showPrintAnimation) return null

    return (
      <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center transition-all duration-300 ease-in-out'>
        <div className='bg-white rounded-lg shadow-xl p-8 max-w-sm w-full mx-4 transform transition-all duration-300 scale-100'>
          <div className='flex flex-col items-center'>
            {/* Elegant spinner with gradient */}
            {/* <div className='relative mb-6'>
              <div className='w-16 h-16 border-4 border-blue-100 rounded-full'></div>
              <div className='absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 rounded-full animate-spin border-t-transparent'></div>
            </div> */}

            {/* Document icon */}
            <div className='bg-blue-50 p-3 rounded-full mb-5'>
              <svg
                className='w-8 h-8 text-blue-500'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
            </div>

            {/* Message with subtle animation */}
            <h3 className='text-lg font-medium text-gray-800 mb-1'>
              Preparing Document
            </h3>
            <p className='text-sm text-gray-500 mb-3 text-center'>
              Getting your document ready for printing...
            </p>

            {/* Old Progress bar */}
            {/* <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1 overflow-hidden">
              <div className="bg-blue-500 h-1.5 rounded-full animate-pulse"></div>
            </div> */}

            {/* Dynamic Progress bar */}
            <div className='w-full bg-gray-100 rounded-full h-1.5 mb-1 overflow-hidden'>
              <div className='relative w-full h-full'>
                <div
                  className='absolute inset-0 bg-blue-500 rounded-full animate-indeterminateProgress w-3/4'
                  // style={{
                  //   animation: 'indeterminateProgress 1.5s infinite linear',
                  //   width: '50%',
                  //   transformOrigin: 'left',
                  // }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Handle Edit Customer navigation with loading state
  const handleEditCustomerClick = () => {
    setIsNavigating(true)
    startTransition(() => {
      router.push(`/dashboard/customers/${customer._id}/editCustomer`) // this is the edit customer page
    })
  }

  // Handle Add Note navigation with loading state
  const handleAddNoteClick = () => {
    setIsNavigating(true)
    startTransition(() => {
      router.push(`/dashboard/customers/${customer._id}/notes`)
    })
  }

  // Handle Create Schedule navigation with loading state
  const handleAddScheduleClick = () => {
    setIsNavigating(true)
    startTransition(() => {
      router.push(`/dashboard/customers/${customer._id}/schedule`)
    })
  }

  // Handle Add Message navigation with loading state
  const handleSendAMessageClick = () => {
    setIsNavigating(true)
    startTransition(() => {
      router.push(`/dashboard/message`)
    })
  }

  // Handle Edit Schedule navigation with loading state and specific scheduleId
  const handleEditScheduleClick = (scheduleId) => {
    setIsNavigating(true)
    startTransition(() => {
      router.push(
        `/dashboard/customers/${customer._id}/editSchedule?scheduleId=${scheduleId}`
      )
    })
  }

  // Handle Add Project navigation with loading state
  const handleAddProjectClick = () => {
    setIsNavigating(true)
    startTransition(() => {
      router.push(`/dashboard/customers/${customer._id}/project`)
    })
  }

  // Handle Edit Project navigation with loading state and specific projectId
  const handleEditProjectClick = (projectId) => {
    setIsNavigating(true)
    startTransition(() => {
      router.push(
        `/dashboard/customers/${customer._id}/editProject?projectId=${projectId}`
      )
    })
  }

  // Old handleDeleteCustomer function
  // const handleDeleteCustomer = async (customerId) => {
  //   const confirmed = window.confirm(
  //     'Are you sure you want to delete this customer?'
  //   )

  //   if (!confirmed) return

  //   await deleteCustomer(customerId)
  //   const updatedCustomers = customer.filter(
  //     (customer) => customerId !== customer._id
  //   )
  //   setCustomers(updatedCustomers)
  //   toast.success(`${customerId} is DELETED!`)
  // }

  // Handle Delete Customer navigation with loading state
  const handleDeleteCustomer = async (customerId) => {
    setShowDeleteCustomerConfirm(true)
    setPendingAction(() => async () => {
      try {
        const result = await deleteCustomer(customerId)

        // Check if the deletion was successful
        // If successful, show a success message
        // If not, throw an error
        if (!result) {
          throw new Error('CustomerId is missing')
        }

        if (result.success) {
          setShowDeleteCustomerConfirm(false) // Hide dialog on success
          // Update local state to remove the deleted customer
          toast.success(
            `${customer.firstName} ${customer.lastName} was deleted succesfully!`
          )

          // Add a small delay before navigation to allow toast to show
          setTimeout(() => {
            router.push('/dashboard/customers')
            router.refresh()
          }, 1000)
          // const updatedCustomers = customer.filter(
          //   (customer) => customerId !== customer._id
          // )
          // setCustomers(updatedCustomers)
          // If the deletion was not successful, show an error message
        } else if (result.error) {
          throw new Error(result.error || 'Failed to delete customer')
        }
      } catch (error) {
        console.error('Error Deleting Customer:', error)
        toast.error(
          error.message || 'Failed to delete customer. Please try again'
        )
        setShowDeleteCustomerConfirm(false) // Hide dialog on error
      }
    })
  }

  const handleSendSms = async (to, body) => {
    setPendingAction(() => async () => {
      try {
        const formattedTo = to.startsWith('+1') ? to : `+1${to}`
        await sendSmsAction(formattedTo, body)
        toast.success(`SMS sent to ${formattedTo}`)
      } catch (error) {
        console.error('Error sending SMS:', error)
        toast.error('Failed to send SMS. Please try again')
      }
    })
    setShowSmsConfirm(true)
  }

  const handleSendEmail = async (to) => {
    setPendingAction(() => async () => {
      try {
        // Get schedule data from customer's projects
        const schedule = customer.projects?.[0]?.schedules?.[0]
        const measureDate = schedule?.measureDate
          ? formatDate(schedule.measureDate)
          : 'TBD'
        const measureTime = schedule?.measureTime || 'TBD'

        const emailData = {
          customerName: `${customerWithCapitalizedNames(
            customer.firstName
          )} ${customerWithCapitalizedNames(customer.lastName)}`,
          subject: `Countertop Appointment Confirmation for ${customerWithCapitalizedNames(
            customer.firstName
          )} ${customerWithCapitalizedNames(customer.lastName)}`,
          message: `Dear ${customerWithCapitalizedNames(
            customer.firstName
          )},<br><br>Thank you for scheduling with us. We look forward to serving you.`,
          appointmentDetails: {
            date: measureDate ? measureDate : ' n/a ',
            time: measureTime ? measureTime : ' n/a ',
            service: 'Measure Countertops',
          },
        }

        const result = await sendEmailAction(to, emailData)
        if (result.success) {
          toast.success(`Email sent to ${to}`)
        } else {
          throw new Error(result.error)
        }
      } catch (error) {
        console.error('Error sending Email:', error)
        toast.error(error.message || 'Failed to send Email. Please try again')
      }
    })
    setShowEmailConfirm(true)
  }

  // const handleSendEmail = async (to) => {
  //   try {
  //     if (!to) {
  //       throw new Error('Email address is required')
  //     }

  //     await sendEmailAction(to)

  //     toast.success(`Email sent to ${to}`)
  //   } catch (error) {
  //     console.error('Error sending Email:', error)
  //     toast.error(error.message || 'Failed to send Email. Please try again')
  //   }
  // }

  // this replaces the handleDeleteProject above
  const handleDeleteProject = async (projectId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this project and all of its schedules?'
    )
    if (!confirmed) return

    try {
      // Call the deleteProject server action with projectId and customerId
      const result = await deleteProject(projectId, customer._id)
      if (!result) {
        throw new Error('ProjectId or CustomerId is missing')
      }
      if (result.success) {
        // Update local state to remove the deleted project
        if (customer?.projects && customer.projects.length > 0) {
          const updatedProjects = customer.projects.filter(
            (project) => project._id !== projectId
          )
          setCustomers({
            ...customer,
            projects: updatedProjects,
          })
          toast.success(
            `Project ${projectId} for ${customer.firstName} ${customer.lastName} and its schedules are DELETED`
          )
        }
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      toast.error('Failed to delete project. Please try again')
    }
  }

  const sortedNotes = customer.officeNotes
    ? [...customer.officeNotes].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : []

  // When a note is clicked, open the modal and load its note text into state.
  const handleNoteClick = (note) => {
    setSelectedNote(note)
    setEditedNote(note.note)
  }

  // When the user saves the note:
  const handleSaveNote = async () => {
    // Call your updateNote server action.
    // updateNote should accept the note ID and new note text.
    try {
      await updateNote(selectedNote._id, editedNote)
      // Optionally update the local customer.officeNotes array so the UI reflects the change.
      const updatedNotes = sortedNotes.map((n) =>
        n._id === selectedNote._id ? { ...n, note: editedNote } : n
      )
      setCustomers({ ...customer, officeNotes: updatedNotes })
      setSelectedNote(null)
    } catch (error) {
      console.error('Failed to update note', error)
    }
  }

  // Handler to delete a note.
  const handleDeleteNote = async (noteId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this note?'
    )
    if (!confirmed) return

    try {
      await deleteNote(noteId, customer._id)
      // Update local state by filtering out the deleted note.
      const updatedNotes = sortedNotes.filter((note) => note._id !== noteId)
      setCustomers({ ...customer, officeNotes: updatedNotes })
      toast.success('Note deleted successfully.')
    } catch (error) {
      console.error('Error deleting note:', error)
      toast.error('Failed to delete note.')
    }
  }

  return (
    <>
      {/* Page Title */}
      {/* Print Header - will only show in print mode */}
      {/* <PrintHeader /> */}
      <div className='hidden container mx-auto md:grid md:grid-cols-2 print:hidden'>
        <div className='container text-left pl-1 py-2 text-md md:text-md text-blue-500 font-semibold'>
          Customer Details Page
        </div>

        {/* <div className='pr-1 py-2 text-right print:hidden'>
          {schedules && schedules.length > 0 ? (
            <div className='flex flex-col items-end'>
              {schedules.map((schedule) => (
                <Button
                  key={schedule._id}
                  onClick={() => handleEditScheduleClick(schedule._id)}
                  disabled={isPending || isNavigating}
                >
                  {isNavigating || isPending ? (
                    <span className='text-sm px-2'>Loading ... </span>
                  ) : (
                    `Edit Schedule: ${
                      schedule.measureDescription || schedule._id
                    }`
                  )}
                </Button>
              ))}
            </div>
          ) : (
            <Button
              icon={<Plus className='h-4 w-4 text-xs hover:text-white' />}
              onClick={handleAddScheduleClick}
              disabled={isPending || isNavigating}
            >
              {isNavigating || isPending ? (
                <span className='text-sm px-2'>Loading ... </span>
              ) : (
                'Add Schedule'
              )}
            </Button>
          )}
        </div> */}
        <div className='pr-1 py-2 text-right print:hidden'>
          <Button
            icon={<Lock className='h-4 w-4 text-xs hover:text-white' />}
            onClick={handleSendAMessageClick}
            disabled={isPending || isNavigating}
          >
            {isNavigating || isPending ? (
              <span className='text-sm px-2'>...</span>
            ) : (
              'Send Private Message'
            )}
          </Button>
        </div>
      </div>
      <div className='container mx-auto grid grid-flow-row gap-4 md:gap-8 pb-10'>
        {/* Customer Quick Top Contact Details*/}
        <PrintVisibility printVisible={true} printTarget='project'>
          <div className='md:grid md:grid-cols-1 gap-2 md:gap-8 mx-4 md:mx-0'>
            <div className='grid grid-cols-2 md:grid-cols-3 md:border border-gray-300 rounded-lg p-1 px-4 md:p-4'>
              <div className='grid grid-cols gap-2 align-middle'>
                <div className='text-md md:text-2xl font-semibold text-blue-500 underline flex items-center'>
                  {customerWithCapitalizedNames(customer.firstName)}{' '}
                  {customerWithCapitalizedNames(customer.lastName)}
                  <span className='pl-6 inline-flex text-sm print:hidden'>
                    <BookmarkButton customer={customer} />
                  </span>
                </div>
                <div className='flex text-sm md:text-base font-normal text-gray-600'>
                  <span className='items-center justify-center align-middle'>
                    {customer.address.street} {customer.address.city}{' '}
                    {customer.address.state} {customer.address.zipcode}
                  </span>
                </div>
              </div>
              <div className='hidden md:grid md:grid-cols-1 sm:gap-2 align-middle print:hidden'>
                {customer.projects && customer.projects.length > 0 ? (
                  <div className='text-lg md:text-3xl font-semibold text-white'>
                    {customer?.projects[0]?.customerType?.length > 0 ? (
                      <span className='inline-flex items-center justify-center align-middle rounded-full border border-amber-500 mr-3 px-2.5 py-0.5 text-amber-600'>
                        <Store className='h-4 w-4' />
                        <p className='whitespace-nowrap text-sm px-2 hidden md:block'>
                          {customer?.projects[0]?.customerType}{' '}
                          {customer?.projects[0]?.storeId}
                        </p>
                      </span>
                    ) : null}

                    {customer?.projects[0]?.status?.length > 0 && (
                      <span className='inline-flex items-center justify-center align-middle rounded-full border border-emerald-500 mr-3 px-2.5 py-0.5 text-emerald-600'>
                        <PhoneIncoming className='h-4 w-4' />

                        <p className='whitespace-nowrap text-sm px-2 hidden md:block'>
                          {customer?.projects[0]?.status}
                        </p>
                      </span>
                    )}

                    {customer.is_flagged && (
                      <span className='inline-flex items-center justify-center align-middle rounded-full border border-red-500 mr-3 px-2.5 py-0.5 text-red-600'>
                        <ShieldAlert className='h-4 w-4' />

                        <p className='whitespace-nowrap text-sm px-2 hidden md:block'>
                          Critical
                        </p>
                      </span>
                    )}
                    {customer.is_featured && (
                      <span className='inline-flex items-center justify-center align-middle rounded-full border border-fuchsia-500 px-2.5 py-0.5 text-fuchsia-600'>
                        <ShieldAlert className='h-4 w-4' />

                        <p className='whitespace-nowrap text-sm px-2 hidden md:block'>
                          Important Customer
                        </p>
                      </span>
                    )}
                  </div>
                ) : (
                  <div className='flex items-center'>
                    <p className='text-center text-base md:text-md font-semibold text-gray-700'>
                      "Project Order Details Empty"
                    </p>
                  </div>
                )}
                <div className='flex md:gap-6'>
                  <div className='flex text-sm md:text-base font-normal text-gray-600'>
                    <span className='items-center justify-center align-middle'>
                      {formatPhoneNumber(customer.phone)}
                    </span>
                  </div>
                  <div className='flex text-sm md:text-base font-normal text-gray-600'>
                    <span className='items-center justify-center align-middle'>
                      {customer.email}
                    </span>
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-1 gap-2 text-right'>
                <div className='text-sm md:text-md font-semibold text-gray-500'>
                  <span className='text-gray-500 pr-2'>Template:</span>
                  <span className='inline-flex'>
                    {schedules && schedules.length > 0 ? (
                      <span>
                        {schedules.map((schedule) => (
                          <span key={schedule._id}>
                            {formatDate(schedule.measureDate)} @{' '}
                            {schedule.measureTime}
                          </span>
                        ))}
                      </span>
                    ) : (
                      <p>no schedule</p>
                    )}
                  </span>
                </div>
                <div className='text-sm md:text-md font-semibold text-gray-500'>
                  <span className='text-gray-500 pr-2'>Install:</span>
                  <span className='inline-flex'>
                    {schedules && schedules.length > 0 ? (
                      <span>
                        {schedules.map((schedule) => (
                          <span key={schedule._id}>
                            {formatDate(schedule.installDate)}
                          </span>
                        ))}
                      </span>
                    ) : (
                      <p>no schedule</p>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </PrintVisibility>
        {/* Break */}
        {/* Main Box */}
        <div className='flex flex-col pt-2 sm:px-4 md:p-0 md:grid md:grid-row gap-0 md:gap-8 mx-4 md:mx-0'>
          <div className='grid lg:grid-cols-2 gap-4 md:gap-8'>
            {/* 1st - Customer Profile Details */}
            <PrintVisibility printVisible={true} printTarget='project'>
              <div className='grid grid-cols-1 sm:border sm:border-gray-300 sm:rounded-lg p-0 sm:p-4 border-b-slate-300 border-b transition-all duration-300 hover:shadow-md'>
                <div className='pb-4 sm:p-4'>
                  <div className='px-4 sm:px-0 flex justify-between'>
                    <h3 className='text-base font-semibold text-gray-700'>
                      Customer Profile Details
                    </h3>

                    <div className='flex gap-4 print:hidden'>
                      {/* <Button onClick={() => printFile()}>Print File</Button> */}
                      {/* <Button onClick={printCustomerInfo}>
                        Print Client Info
                      </Button> */}
                      <Button
                        onClick={() => handleEditCustomerClick(customer._id)}
                        disabled={isPending || isNavigating}
                      >
                        {' '}
                        {isNavigating || isPending ? (
                          <span className='text-sm'>...</span>
                        ) : (
                          <div className='flex items-center gap-1'>
                            <SquarePen className='h-4 w-4 text-xs hover:text-white' />
                            <span>Edit</span>
                          </div>
                        )}
                      </Button>

                      <Button
                        onClick={() => handleDeleteCustomer(customer._id)}
                      >
                        <div className='flex items-center gap-0 text-red-400 hover:scale-110 transition-transform duration-200'>
                          <Trash2 className='h-5 w-5 text-xs' />
                          <span></span>
                        </div>
                      </Button>
                    </div>
                  </div>
                  <div className='mt-4 border-t border-gray-100'>
                    <dl className=''>
                      {/* <div className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium text-gray-900'>
                        Purchase Order Number:
                      </dt>
                      <dd className='mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                        {customer.purchaseOrderNumber}
                      </dd>
                    </div> */}
                      {/* <div className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium text-gray-900'>
                        Puchase Order Date:
                      </dt>
                      <dd className='mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                        {formattedDate}
                      </dd>
                    </div> */}
                      <div className='px-4 py-1 mt-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 flex items-stretch'>
                        <dt className='text-sm font-medium text-gray-900 pr-2'>
                          Customer Name:
                        </dt>
                        <dd className='text-sm font-medium text-gray-700 sm:col-span-2 underline'>
                          {customerWithCapitalizedNames(customer.firstName)}{' '}
                          {customerWithCapitalizedNames(customer.lastName)}
                        </dd>
                      </div>
                      <div className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 flex items-stretch'>
                        <dt className='text-sm font-medium text-gray-900 pr-2'>
                          Address:
                        </dt>
                        <dd className='text-sm font-medium text-gray-700 sm:col-span-2 underline'>
                          {customer.address.street}, {customer.address.city}{' '}
                          {customer.address.state} {customer.address.zipcode}
                        </dd>
                      </div>
                      <div className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 flex items-stretch'>
                        <dt className='text-sm font-medium text-gray-900 pr-2'>
                          Phone:
                        </dt>
                        <dd className='text-sm font-medium text-gray-700 sm:col-span-2 underline'>
                          {formatPhoneNumber(customer.phone)}
                        </dd>
                      </div>
                      <div className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 flex items-stretch print:hidden'>
                        <dt className='text-sm font-medium text-gray-900 pr-2'>
                          Email:
                        </dt>
                        <dd className='text-sm font-medium text-gray-700 sm:col-span-2 underline'>
                          {customer.email}
                        </dd>
                      </div>
                      <div className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 flex items-stretch'>
                        <dt className='text-sm font-medium text-gray-900 pr-2'>
                          Contractor:
                        </dt>
                        <dd className='text-sm font-medium text-gray-700 sm:col-span-2 underline'>
                          {customer.contractorName}{' '}
                          {formatPhoneNumber(customer.contractorPhone)}
                        </dd>
                      </div>
                      <div className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 flex items-stretch print:hidden'>
                        <dt className='text-sm font-medium text-gray-900 pr-2'>
                          Order Notes:
                        </dt>
                        <dd className='text-sm font-medium text-gray-700 sm:col-span-2'>
                          {customer.notes}
                        </dd>
                      </div>

                      {/* Order Summary - Just a Divider */}
                      {/* <span className='flex items-center py-6'>
                    <span className='h-px flex-1 bg-gray-300'></span>
                    <span className='shrink-0 px-0 text-base font-semibold text-gray-700'></span>
                    <span className='h-px flex-1 bg-gray-300'></span>
                  </span> */}
                    </dl>
                  </div>
                </div>
              </div>
            </PrintVisibility>

            {/* 2nd - Internal Office Staff Notes */}
            <div className='invisible sm:visible md:grid md:grid-cols-1 sm:border sm:border-gray-300 sm:rounded-lg sm:p-4 print:hidden transition-all duration-300 hover:shadow-md'>
              <div className='pb-4 sm:p-4'>
                <div className='px-4 sm:px-0 flex justify-between'>
                  <h3 className='text-base font-semibold text-gray-700'>
                    Internal Office Staff Notes
                  </h3>
                  <div className='flex gap-4'>
                    <Button
                      icon={
                        <Plus className='h-4 w-4 text-xs hover:text-white' />
                      }
                      onClick={handleAddNoteClick}
                      disabled={isPending || isNavigating}
                    >
                      {isNavigating || isPending ? (
                        <span className='text-xs'>Loading ...</span>
                      ) : (
                        <NotepadText className='h-4 w-4 text-xs hover:text-white' />
                      )}
                    </Button>
                  </div>
                </div>
                {/* We will need to do Daisychaining here to fetch data - whether customer.officeNotes is >0 or an empty array display something or just say not notes yet something like this */}
                {sortedNotes && sortedNotes.length > 0 ? (
                  <div className='mt-4 border-t border-gray-100'>
                    <dl className=' mt-1'>
                      {sortedNotes.map((note, index) => {
                        // Format each note date with error handling
                        let formattedDate = `Note ${index + 1}`

                        try {
                          if (note.updatedAt) {
                            // Check if createdAt is a valid date
                            const date = new Date(note.updatedAt)
                            // Check if date is valid before formatting
                            if (!isNaN(date.getTime())) {
                              // Format the date
                              formattedDate = date.toLocaleDateString('en-US', {
                                month: 'long',
                                day: '2-digit',
                                year: 'numeric',
                              })
                            }
                          }
                        } catch (error) {
                          console.error('Error formatting date:', error)
                          // Keep the default 'Note ${index + 1}'
                        }

                        return (
                          <div
                            key={note._id}
                            onClick={() => {
                              setSelectedNote(note)
                              setEditedNote(note.note)
                            }}
                            className='relative cursor-pointer px-4 py-1 sm:grid sm:grid-cols-1 sm:gap-2 sm:px-0 flex items-stretch'
                          >
                            <dl className='flex sm:border-b sm:py-2'>
                              <dt className='text-sm font-medium text-gray-900 pr-5'>
                                <span className='font-medium text-gray-600 pr-2'>
                                  {formattedDate}
                                </span>
                              </dt>
                              <dt className='text-sm text-gray-700 sm:col-span-2 sm:mt-0 pr-5'>
                                <span className='font-medium text-gray-600 pr-2'>
                                  By:
                                </span>
                                {note.staff?.username || 'tbd'}
                              </dt>
                              <dt className='text-sm font-medium text-gray-700 pr-5'>
                                <span className='font-medium text-gray-800 pr-2'>
                                  Note:
                                </span>
                                {note.note.length > 20
                                  ? note.note.substring(0, 30) + ' ....'
                                  : note.note}
                              </dt>
                            </dl>
                            <button
                              onClick={(e) => {
                                e.stopPropagation() // Prevent any parent onClick events
                                handleDeleteNote(note._id, customer._id)
                              }}
                              className='absolute top-2 right-0 text-sm text-red-400 font-normal hover:text-red-500 hover:scale-110 transition-transform duration-200'
                              aria-label='Delete note'
                            >
                              <Trash2 className='w-5 h-5 flex items-center text-center' />
                            </button>
                          </div>
                        )
                      })}

                      {/* Divider */}
                      {/* <span className='flex items-center py-2'>
                      <span className='h-px flex-1 bg-gray-300'></span>
                      <span className='shrink-0 px-0 text-base font-semibold text-gray-700'></span>
                      <span className='h-px flex-1 bg-gray-300'></span>
                    </span> */}
                    </dl>
                  </div>
                ) : (
                  <div className='flex items-center justify-center h-3/4 '>
                    <p className='text-center text-base md:text-lg font-semibold text-gray-700'>
                      No Notes to See
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* Modal for displaying full note details */}
            {selectedNote && (
              <div
                className='fixed inset-0 flex items-center justify-center z-50'
                onClick={() => setSelectedNote(null)}
              >
                {/* Modal overlay */}
                <div className='fixed inset-0 bg-black opacity-60'></div>
                {/* Modal content */}
                <div
                  className='relative bg-white p-8 rounded-xl shadow-lg max-w-md w-full z-10'
                  onClick={(e) => e.stopPropagation()} // Prevent modal closing when clicking inside content
                >
                  <div className='flex justify-between mb-4 border-b pb-4'>
                    {/* Format the date for the selected note */}
                    {selectedNote.createdAt && (
                      <p className='text-md text-gray-500'>
                        {new Date(selectedNote.createdAt).toLocaleDateString(
                          'en-US',
                          {
                            month: 'long',
                            day: '2-digit',
                            year: 'numeric',
                          }
                        )}
                      </p>
                    )}
                    <p className='text-md text-gray-500 font-semibold'>
                      By: {selectedNote.staff?.username || 'Unknown'}
                    </p>
                  </div>
                  <div className='text-md text-gray-800 py-4'>
                    <p>{selectedNote.note}</p>
                    {/* if we need to edit in the modal we can turn this on later */}
                    {/* <textarea
                      className='w-full border p-4 rounded-xl'
                      value={editedNote}
                      onChange={(e) => setEditedNote(e.target.value)}
                      rows={6}
                    ></textarea> */}
                  </div>
                  <div className='mt-4 flex justify-end'>
                    {/* selectedNote changed to null takes us off from the modal */}
                    <span className='pr-0'>
                      <Button onClick={() => setSelectedNote(null)}>
                        close
                      </Button>
                    </span>
                    {/* <span>
                      <Button onClick={handleSaveNote}>save</Button>
                    </span> */}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* 2nd Main Box - Project + Mapbox */}
          <div className='grid lg:grid-cols-2 gap-4 md:gap-8'>
            {/* Project Order Details Box */}
            <PrintVisibility printVisible={true} printTarget='project'>
              <div className='grid grid-cols-1 md:border md:border-gray-300 md:rounded-lg sm:p-4 print:mb-8 print:border-b-2 transition-all duration-300 hover:md:shadow-md'>
                {customer.projects && customer.projects.length > 0 ? (
                  customer.projects.map((project, index) => (
                    <div key={project._id} className='pb-4 sm:p-4'>
                      <div className='px-4 sm:px-0 flex justify-between'>
                        <h3 className='text-base font-semibold text-gray-700'>
                          Project Order Details{' '}
                          {customer.projects.length > 1 ? `#${index + 1}` : ''}
                        </h3>
                        <NoPrint>
                          <div className='flex gap-4'>
                            <Button onClick={printProjectInfo}>
                              <div className='flex items-center gap-1'>
                                <Printer className='h-4 w-4 text-xs hover:text-white' />
                                <span>Print</span>
                              </div>
                            </Button>
                            {showPrintAnimation && <PrintAnimation />}
                            <Button
                              onClick={() =>
                                handleEditProjectClick(project._id)
                              }
                              disabled={isPending || isNavigating}
                            >
                              {isNavigating || isPending ? (
                                <span className='text-sm px-2'>
                                  Loading ...
                                </span>
                              ) : (
                                <div className='flex items-center gap-1'>
                                  <SquarePen className='h-4 w-4 text-xs hover:text-white' />
                                  <span>Edit</span>
                                </div>
                              )}
                            </Button>

                            <Button
                              onClick={() =>
                                handleSendEmail(
                                  customer.email,
                                  project.formattedMeasureDate
                                )
                              }
                            >
                              <Mail className='h-4 w-4 text-xs hover:text-white' />{' '}
                            </Button>

                            <Button
                              onClick={() =>
                                handleDeleteProject(project._id, customer)
                              }
                            >
                              <div className='flex items-center gap-0 text-red-400 hover:scale-110 transition-transform duration-200'>
                                <Trash2 className='h-5 w-5 text-xs' />
                                <span></span>
                              </div>
                            </Button>
                          </div>
                        </NoPrint>
                      </div>
                      {/* Added Project Tabs header */}

                      <div className='mt-4 border-t border-gray-100'>
                        <dl className='mt-1'>
                          {project.purchaseOrders &&
                          project.purchaseOrders.length > 0 ? (
                            project.purchaseOrders
                              .filter(
                                (po) =>
                                  po.purchaseOrderNumber ||
                                  po.purchaseOrderDate ||
                                  po.squareFeet ||
                                  po.purchaseOrderAmount
                              )
                              .map((po, poIndex) => {
                                const rawDate = po.purchaseOrderDate
                                let formattedPoDate = ''
                                if (rawDate) {
                                  const poDate = new Date(rawDate)
                                  if (!isNaN(poDate.getTime())) {
                                    const day = poDate
                                      .getDate()
                                      .toString()
                                      .padStart(2, '0')
                                    const month = poDate.toLocaleString(
                                      'en-US',
                                      {
                                        month: 'long',
                                      }
                                    )
                                    const year = poDate.getFullYear()
                                    formattedPoDate = `${month} ${day}, ${year}`
                                  }
                                }
                                return (
                                  <NoPrint
                                    key={
                                      poIndex ||
                                      `${po.purchaseOrderNumber}-${po.purchaseOrderDate}`
                                    }
                                  >
                                    <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 flex items-stretch'>
                                      <dt className='text-sm font-medium text-gray-900 pr-2'>
                                        PO Number:
                                      </dt>
                                      <dd className='text-sm text-gray-700 sm:col-span-3 md:mt-0 flex justify-between'>
                                        {po.purchaseOrderNumber && (
                                          <span>{po.purchaseOrderNumber}</span>
                                        )}
                                        {formattedPoDate && (
                                          <span>{formattedPoDate}</span>
                                        )}
                                        {po.purchaseOrderAmount && (
                                          <span>${po.purchaseOrderAmount}</span>
                                        )}
                                      </dd>
                                    </div>
                                  </NoPrint>
                                )
                              })
                          ) : (
                            <p className='text-sm text-gray-700 px-4 py-1'>
                              No Purchase Orders Found
                            </p>
                          )}
                          <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 flex items-stretch'>
                            <dt className='text-sm font-medium text-gray-900 pr-2'>
                              Description:
                            </dt>
                            <dd className='text-sm text-gray-700 sm:col-span-3 sm:mt-0'>
                              {project.description}
                            </dd>
                          </div>
                          <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 flex items-stretch'>
                            <dt className='text-sm font-medium text-gray-900 pr-2'>
                              Material:
                            </dt>
                            <dd className='text-sm text-gray-700 sm:col-span-3 sm:mt-0 md:flex md:justify-between'>
                              <span className='pr-2'>
                                {project.materialThickness}{' '}
                                {project.materialColor}
                              </span>
                              <span className='pr-2 underline'>
                                {project.materialBrand}
                              </span>
                              <span className='inline-flex items-center rounded-md sm:mr-2 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/10'>
                                {project.materialType}
                              </span>
                              <span className='inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
                                {project.materialFinish}
                              </span>
                            </dd>
                          </div>
                          <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 flex items-stretch'>
                            <dt className='text-sm font-medium text-gray-900 pr-2'>
                              Edge:
                            </dt>
                            <dd className='text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                              {project.edge}
                            </dd>
                          </div>
                          <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 flex items-stretch'>
                            <dt className='text-sm font-medium text-gray-900 pr-2'>
                              Sink:
                            </dt>
                            <dd className='text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                              {project.sinkQuantity} {project.sinkType}{' '}
                              {project.sinkLocation} ({project.sinkInfo})
                            </dd>
                          </div>
                          <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 flex items-stretch'>
                            <dt className='text-sm font-medium text-gray-900 pr-2'>
                              Stove:
                            </dt>
                            <dd className='text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                              {project.stove
                                ? 'Slide In Range'
                                : project.cooktop
                                ? 'Cooktop'
                                : 'n/a'}
                            </dd>
                          </div>
                          <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 flex items-stretch'>
                            <dt className='text-sm font-medium text-gray-900 pr-2'>
                              Splash:
                            </dt>
                            <dd className='text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                              {project.splash}
                            </dd>
                          </div>
                          <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 flex items-stretch'>
                            <dt className='text-sm font-medium text-gray-900 pr-2'>
                              Demo:
                            </dt>
                            <dd className='text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                              {project.demo
                                ? 'Demo Included ✓'
                                : 'Not Included'}
                            </dd>
                          </div>
                          <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 flex items-stretch'>
                            <dt className='text-sm font-medium text-gray-900 pr-2'>
                              Plumbing:
                            </dt>
                            <dd className='text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                              {project.plumbing
                                ? 'Plumbing Included ✓'
                                : 'Not Included'}
                            </dd>
                          </div>
                          <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 flex items-stretch'>
                            <dt className='text-sm font-medium text-gray-900 pr-2'>
                              Order Notes:
                            </dt>
                            <dd className='text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                              {project.notes}
                            </dd>
                          </div>
                          {/* Schedules for this Project */}
                          {project.schedules && project.schedules.length > 0 ? (
                            <div className='print:hidden'>
                              {project.schedules.map((schedule) => {
                                const measureDate = new Date(
                                  schedule.measureDate
                                )
                                const formattedMeasureDate =
                                  measureDate.toLocaleDateString('en-US', {
                                    month: 'numeric',
                                    day: '2-digit', // 2-digit
                                    year: 'numeric',
                                  })
                                const installDate = new Date(
                                  schedule.installDate
                                )
                                const formattedInstallDate =
                                  installDate.toLocaleDateString('en-US', {
                                    month: 'numeric',
                                    day: '2-digit', // 2-digit
                                    year: 'numeric',
                                  })

                                const rawMeasureDate = schedule.measureDate
                                let reformattedMeasureDate = ''
                                if (rawMeasureDate) {
                                  const measureDate = new Date(rawMeasureDate)
                                  if (!isNaN(measureDate.getTime())) {
                                    const day = measureDate
                                      .getDate()
                                      .toString()
                                      .padStart(2, '0')
                                    const month = measureDate.toLocaleString(
                                      'en-US',
                                      {
                                        month: 'short',
                                      }
                                    )
                                    const year = measureDate.getFullYear()
                                    reformattedMeasureDate = `${month} ${day}, ${year}`
                                  }
                                }

                                const rawInstallDate = schedule.installDate
                                let reformattedInstallDate = ''
                                if (rawInstallDate) {
                                  const measureDate = new Date(rawInstallDate)
                                  if (!isNaN(installDate.getTime())) {
                                    const day = installDate
                                      .getDate()
                                      .toString()
                                      .padStart(2, '0')
                                    const month = installDate.toLocaleString(
                                      'en-US',
                                      {
                                        month: 'short',
                                      }
                                    )
                                    const year = installDate.getFullYear()
                                    reformattedInstallDate = `${month} ${day}, ${year}`
                                  }
                                }

                                return (
                                  <div key={schedule._id}>
                                    <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 flex items-stretch'>
                                      <dt className='text-sm font-medium text-gray-900 pr-2 py-1'>
                                        Schedules:
                                      </dt>
                                      <dd className='text-sm text-gray-700 sm:col-span-3 sm:mt-0'>
                                        <div className='flex flex-col gap-2'>
                                          <button
                                            className='text-left border border-blue-400 rounded-md px-2 py-1 text-sm font-medium text-gray-700 hover:bg-blue-400 hover:text-white hover:scale-105 active:scale-100 transition-all ease-in-out duration-400'
                                            icon={
                                              <Plus className='h-4 w-4 text-xs hover:text-white' />
                                            }
                                            onClick={() =>
                                              handleEditScheduleClick(
                                                schedule._id
                                              )
                                            }
                                            disabled={isPending || isNavigating}
                                          >
                                            {isNavigating || isPending ? (
                                              <span className='text-sm px-2'>
                                                Loading ...{' '}
                                              </span>
                                            ) : (
                                              `Edit Schedule: ${
                                                schedule.measureDescription ||
                                                schedule._id
                                              }`
                                            )}
                                          </button>
                                        </div>
                                      </dd>
                                    </div>

                                    <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 flex items-stretch'>
                                      <dt className='text-sm font-medium text-gray-900 pr-2'>
                                        Measure Date:
                                      </dt>
                                      <dd className='text-sm text-gray-700 sm:col-span-1 sm:mt-0'>
                                        {formatDate(schedule.measureDate)}
                                      </dd>
                                      <dd className='text-sm text-gray-700 sm:col-span-1 sm:mt-0'>
                                        By: {schedule.measureBy}
                                      </dd>
                                      <dd className='text-sm text-gray-700 sm:col-span-1 sm:mt-0'>
                                        Time: {schedule.measureTime}
                                      </dd>
                                    </div>

                                    <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 flex items-stretch'>
                                      <dt className='text-sm font-medium text-gray-900 pr-2'>
                                        Install Date:
                                      </dt>
                                      <dd className='text-sm text-gray-700 sm:col-span-1 sm:mt-0'>
                                        {formatDate(schedule.installDate)}
                                      </dd>
                                      <dd className='text-sm text-gray-700 sm:col-span-1 sm:mt-0'>
                                        By: {schedule.installBy}
                                      </dd>
                                      <dd className='text-sm text-gray-700 sm:col-span-1 sm:mt-0'>
                                        Time: {schedule.installTime}
                                      </dd>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          ) : (
                            <div className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 flex items-stretch'>
                              <dt className='text-sm font-medium text-gray-900 pr-2'>
                                Schedules:
                              </dt>
                              <dd className='text-sm text-gray-700 sm:col-span-3 sm:mt-0'>
                                <Button
                                  icon={
                                    <Plus className='h-4 w-4 text-xs hover:text-white' />
                                  }
                                  onClick={handleAddScheduleClick}
                                  disabled={isPending || isNavigating}
                                >
                                  {isNavigating || isPending ? (
                                    <span className='text-sm px-2'>
                                      Loading ...{' '}
                                    </span>
                                  ) : (
                                    'Add Schedule'
                                  )}
                                </Button>
                              </dd>
                            </div>
                          )}
                        </dl>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='pb-4 sm:p-4'>
                    <div className='px-4 sm:px-0 flex justify-between'>
                      <h3 className='text-base font-semibold text-gray-700'>
                        Project Order Details
                      </h3>
                      <div className='flex gap-4 print:hidden'>
                        <Button
                          icon={
                            <Plus className='h-4 w-4 text-xs hover:text-white' />
                          }
                          onClick={handleAddProjectClick}
                          disabled={isPending || isNavigating}
                        >
                          {isNavigating || isPending ? (
                            <span className='text-sm'>Loading ...</span>
                          ) : (
                            'Add Project Details'
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className='flex items-center justify-center h-3/4 mt-4'>
                      <p className='text-center text-base md:text-lg font-semibold text-gray-700'>
                        No Projects Found
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </PrintVisibility>

            {/* Mapbox Div */}
            <PrintVisibility printVisible={false}>
              <div className='invisible sm:visible md:grid md:grid-cols-1 h-auto md:border md:border-gray-300 md:rounded-lg p-4 relative transition-all duration-300 hover:shadow-md'>
                <CustomerMap customer={customer} />
              </div>
            </PrintVisibility>
          </div>
        </div>
        {/* ... */}
        {/* Break */}
        {/* Template and Install Dates + Signature */}
        {customer.projects && customer.projects.length > 0 ? (
          <div className='hidden text-sm md:gap-8 mx-4 md:mx-0 sm:block'>
            {customer?.projects[0]?.status === 'for template' ? (
              <>
                {schedules.map((schedule) => (
                  <div
                    key={schedule._id}
                    className='sm:grid sm:grid-cols-1 md:border md:border-gray-300 md:block md:rounded-lg p-0 md:p-2 transition-all duration-300 hover:shadow-md'
                  >
                    <div className='sm:flex sm:justify-between sm:px-4 md:p-4'>
                      <span className=''>
                        Template Date: {formatDate(schedule.measureDate)} @{' '}
                        {schedule.measureTime}
                      </span>
                      <span>Measured By: {schedule.measureBy}</span>
                    </div>

                    <div className='sm:p-4 md:col-span-2'>
                      Template Notes: {schedule.measureNotes || ' '}
                    </div>
                  </div>
                ))}
              </>
            ) : customer?.projects[0]?.status === 'for install' ? (
              <div className=''>
                {schedules.map((schedule) => (
                  <div
                    key={schedule._id}
                    className='md:grid md:grid-cols-2 md:gap-8'
                  >
                    {/* Template Info */}
                    <div className='sm:grid sm:grid-cols-1 md:border md:border-gray-300 md:block md:rounded-lg p-0 md:p-2 print:hidden transition-all duration-300 hover:shadow-md'>
                      <div className='sm:flex sm:justify-between sm:px-4 md:p-4'>
                        <span className=''>
                          Template Date: {formatDate(schedule.measureDate)} @{' '}
                          {schedule.measureTime}
                        </span>
                        <span>Measured By: {schedule.measureBy}</span>
                      </div>
                      <div className='sm:p-4 md:col-span-2'>
                        Template Notes: {schedule.measureNotes || ' '}
                      </div>
                    </div>

                    {/* Install Info */}
                    <div
                      key={schedule.id}
                      className='grid grid-cols-1 md:border md:border-gray-300 md:rounded-lg p-0 md:p-2'
                    >
                      <div className='sm:flex sm:justify-between sm:px-4 md:p-4'>
                        <span className=''>
                          Install Date: {formatDate(schedule.installDate)}
                        </span>
                        <span>Installer: {schedule.installBy}</span>
                      </div>

                      <div className='sm:p-4 md:col-span-2'>
                        Install Notes: {schedule.installNotes || ' '}
                      </div>

                      <div className='sm:p-4 md:col-span-2'>
                        I hereby confirm that the materials and installation provided have been completed in accordance with the installation proposal. I have inspected the work performed and find it to be complete and satisfactory.
                      </div>
                      <div className='sm:flex sm:justify-between sm:px-4 md:p-4'>
                        <span className=''>
                          Customer Signature On Install: __________________
                        </span>
                        <span>Name: ________________________</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className='flex items-center justify-center h-3/4 '>
            <p className='text-center text-base md:text-lg font-semibold text-gray-700'>
              No Schedules Found
            </p>
          </div>
        )}
      </div>

      {/* Test Print Element */}
      <PrintVisibility printVisible={false} printTarget='test'>
        <div className='invisible border-4 from:border-green-500 to:border-blue-500 p-4 m-4'>
          <h2 className='text-xl font-bold'>This is a test</h2>
          <p>If you can see this, the print visibility is working.</p>
        </div>
      </PrintVisibility>

      {/* Body class controller for global print targets */}
      <style jsx global>{`
        @media print {
          body[data-print-target='customer'] .print-customer-visible {
            display: block !important;
          }
          body[data-print-target='customer'] .print-project-visible {
            display: none !important;
          }

          body[data-print-target='project'] .print-project-visible {
            display: block !important;
          }
          body[data-print-target='project'] .print-customer-visible {
            display: none !important;
          }

          body[data-print-target='all'] .print-customer-visible,
          body[data-print-target='all'] .print-project-visible {
            display: block !important;
          }
        }
      `}</style>

      <ConfirmDialog
        isOpen={showEmailConfirm}
        onClose={() => setShowEmailConfirm(false)}
        onConfirm={async () => {
          await pendingAction?.()
          setPendingAction(null)
        }}
        title='Send Email'
        message='Are you sure you want to send this email?'
      />

      <ConfirmDialog
        isOpen={showSmsConfirm}
        onClose={() => setShowSmsConfirm(false)}
        onConfirm={async () => {
          await pendingAction?.()
          setPendingAction(null)
        }}
        title='Send SMS'
        message='Are you sure you want to send this SMS?'
      />

      <ConfirmDialog
        isOpen={showDeleteCustomerConfirm}
        onClose={() => setShowDeleteCustomerConfirm(false)}
        onConfirm={async () => {
          await pendingAction?.()
          setPendingAction(null)
        }}
        title='Delete Customer'
        message='Are you sure you want to delete this customer from the database?'
      />
    </>
  )
}

export default function CustomerDetails({
  customer: initialCustomer,
  schedules,
}) {
  return (
    <PrintProvider>
      <CustomerDetailsContent
        customer={initialCustomer}
        schedules={schedules}
      />
    </PrintProvider>
  )
}

export function ProjectTabs({ children, project, customer }) {
  const [activeTab, setActiveTab] = useState('details')

  const tabs = [
    { id: 'details', label: 'Project Details' },
    { id: 'actions', label: 'Action Buttons' },
  ]

  return (
    <div className='w-full'>
      {/* Tab Navigation */}
      <div className='border-b border-gray-200'>
        <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className='mt-4'>
        {activeTab === 'details' && (
          <div className='space-y-4'>
            {/* Project Details Content */}
            <dl className='mt-1'>
              {/* Your existing project details content */}
              {children}
            </dl>
          </div>
        )}

        {activeTab === 'actions' && (
          <div className='space-y-4 p-4'>
            <div className='flex flex-wrap gap-4'>
              <Button onClick={() => handleEditProjectClick(project._id)}>
                Edit Project
              </Button>
              <Button onClick={() => handleSendEmail(customer.email)}>
                Send Email
              </Button>
              <Button
                onClick={() => handleDeleteProject(project._id, customer)}
              >
                Delete Project
              </Button>
              <Button onClick={printProjectInfo}>Print Project Info</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
