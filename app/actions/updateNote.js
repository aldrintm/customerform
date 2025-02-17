'use server'
import connectDB from '@/config/db'
import Customer from '@/models/Customer'
import Project from '@/models/Project'
import { getSessionUser } from '@/utils/getSession'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// this action is added to the form to perform tasks
async function updateNote(customerId, projectId, formData) {
  // connect to DB
  await connectDB()

  // lets check for user session
  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required')
  }

  // lets get the userId then
  const { userId } = sessionUser

  const project = await Project.findById(projectId)

  if (!project) {
    throw new Error('Project not found')
  }
}

export default updateNote
