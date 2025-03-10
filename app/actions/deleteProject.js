'use server'

import connectDB from '@/config/db'
import Project from '@/models/Project'
import Schedule from '@/models/Schedule'
import User from '@/models/User'
import { revalidatePath } from 'next/cache'

export async function deleteProject(projectId, customerId) {
  await connectDB()

  // Find the project to ensure it exists
  const project = await Project.findById(projectId)
  if (!project) {
    throw new Error('Project not found')
  }

  // Delete all schedules associated with this projectId
  await Schedule.deleteMany({ project: projectId })

  // Delete the project with this given projectId
  await Project.findByIdAndDelete(projectId)

  // Revalidate relevant paths to refresh cached data
  revalidatePath(`/dashboard/customers/${customerId}`)
  revalidatePath('/dashboard')

  return { success: true }
}
