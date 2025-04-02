'use server'
import connectDB from '@/config/db'
import Schedule from '@/models/Schedule'
import Customer from '@/models/Customer'
import Project from '@/models/Project'
import { getSessionUser } from '@/utils/getSession'
import { revalidatePath } from 'next/cache'

/**
 * Create a new calendar schedule
 */
export async function createCalendarSchedule(formData) {
  try {
    await connectDB()

    // Get the current user from the session
    const sessionUser = await getSessionUser()
    if (!sessionUser || !sessionUser.userId) {
      throw new Error('User ID is required')
    }

    const { userId } = sessionUser

    // Extract form data
    const customerId = formData.get('customerId')
    const projectId = formData.get('projectId')
    const scheduleType = formData.get('scheduleType') // 'measure' or 'install'
    const scheduleDate = formData.get('scheduleDate')
    const scheduleTime = formData.get('scheduleTime')
    const scheduledBy = formData.get('scheduledBy')
    const description = formData.get('description')
    const notes = formData.get('notes')

    // Validate required fields
    if (!customerId || !scheduleDate || !scheduleType) {
      throw new Error('Customer, date, and schedule type are required')
    }

    // Verify the customer exists
    const customer = await Customer.findById(customerId)
    if (!customer) {
      throw new Error('Customer not found')
    }

    // Verify the project exists if provided
    if (projectId) {
      const project = await Project.findOne({
        _id: projectId,
        customer: customerId,
      })
      if (!project) {
        throw new Error('Project not found or does not belong to this customer')
      }
    }

    // Create schedule data based on type
    const scheduleData = {
      user: userId,
      customer: customerId,
      project: projectId || null,
    }

    // Add type-specific fields
    if (scheduleType === 'measure') {
      scheduleData.measureDescription = description
      scheduleData.measureDate = scheduleDate
      scheduleData.measureTime = scheduleTime
      scheduleData.measureBy = scheduledBy
      scheduleData.measureNotes = notes
    } else if (scheduleType === 'install') {
      scheduleData.installDescription = description
      scheduleData.installDate = scheduleDate
      scheduleData.installTime = scheduleTime
      scheduleData.installBy = scheduledBy
      scheduleData.installNotes = notes
    }

    // Create the schedule
    const newSchedule = new Schedule(scheduleData)
    await newSchedule.save()

    // Update project if provided
    if (projectId) {
      await Project.findByIdAndUpdate(projectId, {
        $addToSet: { schedules: newSchedule._id },
      })
    }

    // Revalidate relevant paths
    revalidatePath('/calendar')
    revalidatePath(`/dashboard/customers/${customerId}`)

    return { success: true, scheduleId: newSchedule._id }
  } catch (error) {
    console.error('Error creating calendar schedule:', error)
    return {
      success: false,
      error: error.message || 'Failed to create schedule',
    }
  }
}

/**
 * Update an existing calendar schedule
 */
export async function updateCalendarSchedule(formData) {
  try {
    await connectDB()

    // Get the current user from the session
    const sessionUser = await getSessionUser()
    if (!sessionUser || !sessionUser.userId) {
      throw new Error('User ID is required')
    }

    // Extract form data
    const scheduleId = formData.get('scheduleId')
    const customerId = formData.get('customerId')
    const projectId = formData.get('projectId')
    const scheduleType = formData.get('scheduleType') // 'measure' or 'install'
    const scheduleDate = formData.get('scheduleDate')
    const scheduleTime = formData.get('scheduleTime')
    const scheduledBy = formData.get('scheduledBy')
    const description = formData.get('description')
    const notes = formData.get('notes')

    // Validate required fields
    if (!scheduleId || !customerId || !scheduleDate || !scheduleType) {
      throw new Error(
        'Schedule ID, customer, date, and schedule type are required'
      )
    }

    // Get the existing schedule
    const existingSchedule = await Schedule.findById(scheduleId)
    if (!existingSchedule) {
      throw new Error('Schedule not found')
    }

    // Verify the customer exists
    const customer = await Customer.findById(customerId)
    if (!customer) {
      throw new Error('Customer not found')
    }

    // Check if project has changed and handle accordingly
    const previousProjectId = existingSchedule.project?.toString()

    if (previousProjectId !== projectId) {
      // Remove schedule from previous project
      if (previousProjectId) {
        await Project.findByIdAndUpdate(previousProjectId, {
          $pull: { schedules: scheduleId },
        })
      }

      // Add schedule to new project
      if (projectId) {
        const project = await Project.findOne({
          _id: projectId,
          customer: customerId,
        })

        if (!project) {
          throw new Error(
            'Project not found or does not belong to this customer'
          )
        }

        await Project.findByIdAndUpdate(projectId, {
          $addToSet: { schedules: scheduleId },
        })
      }
    }

    // Create update data based on type
    const updateData = {
      customer: customerId,
      project: projectId || null,
    }

    // Reset all schedule-type specific fields
    updateData.measureDescription = null
    updateData.measureDate = null
    updateData.measureTime = null
    updateData.measureBy = null
    updateData.measureNotes = null
    updateData.installDescription = null
    updateData.installDate = null
    updateData.installTime = null
    updateData.installBy = null
    updateData.installNotes = null

    // Set new values based on schedule type
    if (scheduleType === 'measure') {
      updateData.measureDescription = description
      updateData.measureDate = scheduleDate
      updateData.measureTime = scheduleTime
      updateData.measureBy = scheduledBy
      updateData.measureNotes = notes
    } else if (scheduleType === 'install') {
      updateData.installDescription = description
      updateData.installDate = scheduleDate
      updateData.installTime = scheduleTime
      updateData.installBy = scheduledBy
      updateData.installNotes = notes
    }

    // Update the schedule
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      scheduleId,
      updateData,
      { new: true }
    )

    // Revalidate relevant paths
    revalidatePath('/calendar')
    revalidatePath(`/dashboard/customers/${customerId}`)

    return { success: true, scheduleId: updatedSchedule._id }
  } catch (error) {
    console.error('Error updating calendar schedule:', error)
    return {
      success: false,
      error: error.message || 'Failed to update schedule',
    }
  }
}

/**
 * Delete a calendar schedule
 */
export async function deleteCalendarSchedule(scheduleId) {
  try {
    await connectDB()

    // Get the current user from the session
    const sessionUser = await getSessionUser()
    if (!sessionUser || !sessionUser.userId) {
      throw new Error('User ID is required')
    }

    // Find the schedule
    const schedule = await Schedule.findById(scheduleId)
    if (!schedule) {
      throw new Error('Schedule not found')
    }

    const customerId = schedule.customer
    const projectId = schedule.project

    // Remove schedule reference from project
    if (projectId) {
      await Project.findByIdAndUpdate(projectId, {
        $pull: { schedules: scheduleId },
      })
    }

    // Delete the schedule
    await Schedule.findByIdAndDelete(scheduleId)

    // Revalidate relevant paths
    revalidatePath('/calendar')
    if (customerId) {
      revalidatePath(`/dashboard/customers/${customerId}`)
    }

    return { success: true }
  } catch (error) {
    console.error('Error deleting calendar schedule:', error)
    return {
      success: false,
      error: error.message || 'Failed to delete schedule',
    }
  }
}

/**
 * Get schedules for a specific date range (for calendar view)
 */
export async function getCalendarSchedules(startDate, endDate) {
  try {
    await connectDB()

    // Get the current user from the session
    const sessionUser = await getSessionUser()
    if (!sessionUser || !sessionUser.userId) {
      throw new Error('User ID is required')
    }

    // Convert dates to Date objects if they're strings
    const start = new Date(startDate)
    const end = new Date(endDate)

    // Find schedules within the date range
    const schedules = await Schedule.find({
      $or: [
        { measureDate: { $gte: start, $lte: end } },
        { installDate: { $gte: start, $lte: end } },
      ],
    })
      .populate('customer', 'firstName lastName phone address')
      .populate('project', 'description materialType materialColor status')
      .lean()

    // Format the schedules for easier consumption
    const formattedSchedules = schedules
      .map((schedule) => {
        const baseInfo = {
          id: schedule._id.toString(),
          customerId: schedule.customer?._id.toString(),
          customerName: schedule.customer
            ? `${schedule.customer.firstName} ${schedule.customer.lastName}`
            : 'Unknown',
          customerPhone: schedule.customer?.phone || '',
          address: schedule.customer?.address || {},
          projectId: schedule.project?._id.toString() || null,
          projectDesc: schedule.project?.description || '',
          materialInfo: schedule.project
            ? `${schedule.project.materialType || ''} ${
                schedule.project.materialColor || ''
              }`
            : '',
          status: schedule.project?.status || '',
        }

        // Create events for measure and install dates if they exist
        const events = []

        if (schedule.measureDate) {
          events.push({
            ...baseInfo,
            type: 'measure',
            date: schedule.measureDate,
            time: schedule.measureTime || '',
            description: schedule.measureDescription || 'Measure',
            assignedTo: schedule.measureBy || 'Unassigned',
            notes: schedule.measureNotes || '',
          })
        }

        if (schedule.installDate) {
          events.push({
            ...baseInfo,
            type: 'install',
            date: schedule.installDate,
            time: schedule.installTime || '',
            description: schedule.installDescription || 'Install',
            assignedTo: schedule.installBy || 'Unassigned',
            notes: schedule.installNotes || '',
          })
        }

        return events
      })
      .flat()

    return { success: true, schedules: formattedSchedules }
  } catch (error) {
    console.error('Error getting calendar schedules:', error)
    return {
      success: false,
      error: error.message || 'Failed to get schedules',
    }
  }
}
