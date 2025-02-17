'use server'
import connectDB from '@/config/db'
import Note from '@/models/Note'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function deleteNote(noteId, customerId) {
  // Connect to the database
  await connectDB()

  if (!noteId) {
    throw new Error('Note ID is required')
  }

  // Attempt to delete the note
  const deletedNote = await Note.findByIdAndDelete(noteId)
  if (!deletedNote) {
    throw new Error('Note not found')
  }

  const plainDeletedNote = JSON.parse(JSON.stringify(deletedNote))
  return plainDeletedNote

  // Optionally, revalidate the page related to this note's customer
  // For example, if you want to revalidate the customer's detail page:
  // revalidatePath(`/dashboard/customers/${deletedNote.customer}`)

  // this will clear cached data in our form/memory
  // revalidatePath('/', 'layout')

  // redirect to newly created thank you page details
  // redirect(`/customers/${newCustomer._id}`)

  // redirect to the main table
  // redirect(`/dashboard/customers/${customerId}`)
}

export default deleteNote
