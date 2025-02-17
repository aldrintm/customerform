'use server'
import connectDB from '@/config/db'
import Customer from '@/models/Customer'
import Note from '@/models/Note'
import Project from '@/models/Project'
import { getSessionUser } from '@/utils/getSession'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// this action is added to the form to perform tasks
async function updateNote(noteId, newNoteText) {
  // connect to DB
  await connectDB()

  if (!noteId) {
    throw new Error('Note ID is required')
  }
  const updatedNote = await Note.findByIdAndUpdate(
    noteId,
    { note: newNoteText },
    { new: true }
  )

  if (!updatedNote) {
    throw new Error('Note Not Found')
  }

  revalidatePath(`/dashboard/customers/$(updatedNote.customer)`)

  // Convert to a plain object and return
  return JSON.parse(JSON.stringify(updatedNote))
}

export default updateNote
