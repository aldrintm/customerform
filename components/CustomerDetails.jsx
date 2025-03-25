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
} from 'lucide-react'
import Button from './Button'
import formatPhoneNumber from '@/app/actions/formatPhoneNumber'
import customerWithCapitalizedNames from '@/app/actions/customerWithCapitalizedNames'
import deleteCustomer from '@/app/actions/deleteCustomer'
import { deleteProject } from '@/app/actions/deleteProject'
import { toast } from 'react-toastify'
import CustomerMap from './CustomerMap'
import updateNote from '@/app/actions/updateNote' // this server action for updating a note
import deleteNote from '@/app/actions/deleteNote'
import BookmarkButton from './BookmarkButton'
import PrintButton from './PrintButton'
import { formatDate } from '@/utils/formatDate'

const CustomerDetails = ({ customer: initialCustomer, schedules }) => {
  // initialCustomer is now a plain object that includes a populated projects array.
  const [customer, setCustomers] = useState(initialCustomer)
  const [project, setProject] = useState('')
  const [selectedNote, setSelectedNote] = useState(null)
  const [editedNote, setEditedNote] = useState('')
  const [isNavigating, setIsNavigating] = useState(false) //navigation loading
  const [isPending, startTransition] = useTransition() //for smooth navigation
  const router = useRouter()

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

  // const dateObj = new Date(
  //   customer.projects[0].purchaseOrders[0].purchaseOrderDate
  // )

  // // Extract the month, date, and year
  // const month = dateObj.toLocaleString('default', { month: 'long' }) // Full month name (e.g., "January")
  // const day = dateObj.getDate() // Day of the month (e.g., 1, 2, etc.)
  // const year = dateObj.getFullYear() // Full year (e.g., 2025)

  // // Format the string as needed
  // const formattedDate = `${month} ${day}, ${year}`

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

  const handleDeleteCustomer = async (customerId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this customer?'
    )

    if (!confirmed) return

    await deleteCustomer(customerId)
    const updatedCustomers = customer.filter(
      (customer) => customerId !== customer._id
    )
    setCustomers(updatedCustomers)
    toast.success(`${customerId} is DELETED!`)
  }

  // console.log(customer)

  // const handleDeleteProject = async (projectId) => {
  //   const confirmed = window.confirm('Delete the project?')
  //   if (!confirmed) return
  //   await handleDeleteProject(projectId)
  //   const updatedProject = customer.project[0].filter(
  //     (project) => projectId !== customer.project[0]._id
  //   )
  //   setProject(updatedProject)
  //   toast.success(`${projectId} is DELETED!`)
  // }

  const printFile = async (customerId) => {
    window.print()
  }

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

      <div className='hidden container mx-auto md:grid md:grid-cols-2 print:hidden'>
        <div className='container text-left pl-1 py-2 text-md md:text-md text-blue-500 font-semibold'>
          Customer Details Page
        </div>

        <div className='pr-1 py-2 text-right print:hidden'>
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
        </div>
      </div>

      <div className='container mx-auto grid grid-flow-row gap-4 md:gap-8 pb-10'>
        {/* Customer Quick Top Contact Details*/}
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
                <PrintButton />
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
                          {formatDate(schedule.measureDate)}
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
        {/* Break */}
        {/* Main Box */}
        <div className='flex flex-col pt-2 sm:px-4 md:p-0 md:grid md:grid-row gap-0 md:gap-8 mx-4 md:mx-0'>
          <div className='grid lg:grid-cols-2 gap-4 md:gap-8'>
            {/* 1st - Customer Profile Details */}
            <div className='grid grid-cols-1 sm:border sm:border-gray-300 sm:rounded-lg p-0 sm:p-4 border-b-slate-300 border-b transition-all duration-300 hover:shadow-md'>
              <div className='pb-4 sm:p-4'>
                <div className='px-4 sm:px-0 flex justify-between'>
                  <h3 className='text-base font-semibold text-gray-700'>
                    Customer Profile Details
                  </h3>

                  <div className='flex gap-4 print:hidden'>
                    <Button onClick={printFile}>Print File</Button>

                    <Button
                      onClick={() => handleEditCustomerClick(customer._id)}
                      disabled={isPending || isNavigating}
                    >
                      {' '}
                      {isNavigating || isPending ? (
                        <span className='text-sm px-2'>Loading ...</span>
                      ) : (
                        'Edit'
                      )}
                    </Button>

                    <Button onClick={() => handleDeleteCustomer(customer._id)}>
                      Delete
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

            {/* 2nd - Internal Office Staff Notes */}
            <div className='hidden md:grid md:grid-cols-1 sm:border sm:border-gray-300 sm:rounded-lg sm:p-4 print:hidden transition-all duration-300 hover:shadow-md'>
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
                        'Add Notes'
                      )}
                    </Button>
                  </div>
                </div>
                {/* We will need to do Daisychaining here to fetch data - whether customer.officeNotes is >0 or an empty array display something or just say not notes yet something like this */}
                {sortedNotes && sortedNotes.length > 0 ? (
                  <div className='mt-4 border-t border-gray-100'>
                    <dl className=' mt-1'>
                      {sortedNotes.map((note, index) => {
                        // Format each purchase order date
                        const date = new Date(note.createdAt)
                        const day = date.getDate().toString().padStart(2, '0')
                        const month = date.toLocaleString('en-US', {
                          month: 'long',
                        })
                        const year = date.getFullYear()
                        const formattedDate = `${month} ${day}, ${year}`

                        return (
                          <div
                            key={index}
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
                              className='absolute top-2 right-0 text-sm text-red-400 font-nomral'
                              aria-label='Delete note'
                            >
                              x
                              {/* <Trash2 className='w-5 h-5 flex items-center text-center' /> */}
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
            <div className='grid grid-cols-1 md:border sm:border-gray-300 sm:rounded-lg sm:p-4 print:mb-8 print:border-b-2 transition-all duration-300 hover:shadow-md'>
              {customer.projects && customer.projects.length > 0 ? (
                customer.projects.map((project, index) => (
                  <div key={project._id} className='pb-4 sm:p-4'>
                    <div className='px-4 sm:px-0 flex justify-between'>
                      <h3 className='text-base font-semibold text-gray-700'>
                        Project Order Details{' '}
                        {customer.projects.length > 1 ? `#${index + 1}` : ''}
                      </h3>
                      <div className='flex gap-4 print:hidden'>
                        <Button
                          onClick={() => handleEditProjectClick(project._id)}
                          disabled={isPending || isNavigating}
                        >
                          {isNavigating || isPending ? (
                            <span className='text-sm px-2'>Loading ...</span>
                          ) : (
                            'Edit Project'
                          )}
                        </Button>

                        <Button
                          onClick={() =>
                            handleDeleteProject(project._id, customer)
                          }
                        >
                          Delete Project
                        </Button>
                      </div>
                    </div>
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
                                  const month = poDate.toLocaleString('en-US', {
                                    month: 'long',
                                  })
                                  const year = poDate.getFullYear()
                                  formattedPoDate = `${month} ${day}, ${year}`
                                }
                              }
                              return (
                                <div
                                  key={poIndex}
                                  className='px-4 py-1 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 flex items-stretch print:hidden'
                                >
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
                            Order Notes:
                          </dt>
                          <dd className='text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
                            {project.notes}
                          </dd>
                        </div>
                        {/* Schedules for this Project */}
                        {project.schedules && project.schedules.length > 0 ? (
                          <div>
                            {project.schedules.map((schedule) => {
                              const measureDate = new Date(schedule.measureDate)
                              const formattedMeasureDate =
                                measureDate.toLocaleDateString('en-US', {
                                  month: 'numeric',
                                  day: '2-digit', // 2-digit
                                  year: 'numeric',
                                })
                              const installDate = new Date(schedule.installDate)
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
            {/* Mapbox Div */}
            <div className='hidden md:grid md:grid-cols-1 h-auto md:border md:border-gray-300 md:rounded-lg p-4 relative transition-all duration-300 hover:shadow-md'>
              <CustomerMap customer={customer} />
            </div>
          </div>
        </div>
        {/* ... */}
        {/* Break */}
        {/* Template and Install Dates + Signature */}
        {customer.projects && customer.projects.length > 0 ? (
          <div className='hidden md:grid md:grid-cols-2 text-sm md:gap-8 mx-4 md:mx-0 sm:block print:block'>
            {customer?.projects[0]?.status === 'will call' ? (
              <div className='sm:grid sm:grid-cols-1 md:border md:border-gray-300 md:block md:rounded-lg p-0 md:p-2 transition-all duration-300 hover:shadow-md'>
                <div className='sm:flex sm:justify-between sm:px-4 md:p-4'>
                  <span className=''>Template Date: Jan 3, 2025</span>
                  <span>Measured By: Anilber Pena</span>
                </div>

                <div className='sm:p-4 md:col-span-2'>
                  Template Notes: There's no sink on site, I only took the sink
                  template. Contractor present and approved all overhangs
                </div>
              </div>
            ) : customer?.projects[0]?.status === 'for install' ? (
              <>
                <div className='sm:grid sm:grid-cols-1 md:border md:border-gray-300 md:block md:rounded-lg p-0 md:p-2 print:hidden transition-all duration-300 hover:shadow-md'>
                  <div className='sm:flex sm:justify-between sm:px-4 md:p-4'>
                    <span className=''>Template Date: Jan 3, 2025</span>
                    <span>Measured By: Anilber Pena</span>
                  </div>
                  <div className='sm:p-4 md:col-span-2'>
                    Template Notes: There's no sink on site, I only took the
                    sink template. Contractor present and approved all overhangs
                  </div>
                </div>
                <div className='grid grid-cols-1 md:border md:border-gray-300 md:rounded-lg p-0 md:p-2'>
                  <div className='sm:flex sm:justify-between sm:px-4 md:p-4'>
                    <span className=''>Install Date: Jan 25, 2025</span>
                    <span>Installed By: Ruben Oronia</span>
                  </div>

                  <div className='sm:p-4 md:col-span-2'>
                    Installation Notes: Contractor want to preserve the tiles,
                    please protect the floor as much as you can. They will keep
                    the sink so try to save it.
                  </div>
                  <div className='sm:flex sm:justify-between sm:px-4 md:p-4'>
                    <span className=''>
                      Sign On Install: ________________________
                    </span>
                    <span>Print Name: ________________________</span>
                  </div>
                </div>
              </>
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
    </>
  )
}

export default CustomerDetails
