'use server'
import connectDB from '@/config/db'
import Schedule from '@/models/Schedule'
import { getSessionUser } from '@/utils/getSession'
import { revalidatePath } from 'next/cache'

// Create a new schedule event
export async function createScheduleEvent(formData) {
  try {
    await connectDB()

    // Get the current user from the session
    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.userId) {
      throw new Error('User ID is required')
    }

    const { userId } = sessionUser

    // Create event date by combining the date and time
    const eventDate = new Date(formData.date)

    // Parse time (assuming format like "09:30")
    if (formData.time) {
      const [hours, minutes] = formData.time.split(':').map(Number)
      eventDate.setHours(hours, minutes)
    }

    // Prepare schedule data
    const scheduleData = {
      user: userId,
      customer: formData.customer || null,
      project: formData.project || null,
      description: formData.title,
      measureDate: formData.type === 'measure' ? eventDate : null,
      measureTime: formData.type === 'measure' ? formData.time : null,
      measuredBy:
        formData.type === 'measure' ? formData.measuredBy || userId : null,
      installDate: formData.type === 'install' ? eventDate : null,
      installBy:
        formData.type === 'install' ? formData.installBy || userId : null,
      notes: formData.notes || '',
    }

    // Create new schedule event
    const newSchedule = new Schedule(scheduleData)
    await newSchedule.save()

    // Revalidate calendar page
    revalidatePath('/calendar')

    return { success: true, data: newSchedule }
  } catch (error) {
    console.error('Error creating schedule event:', error)
    return { success: false, error: error.message }
  }
}

// Update an existing schedule event
export async function updateScheduleEvent(id, formData) {
  try {
    await connectDB()

    // Get the current user from the session
    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.userId) {
      throw new Error('User ID is required')
    }

    // Create event date by combining the date and time
    const eventDate = new Date(formData.date)

    // Parse time (assuming format like "09:30")
    if (formData.time) {
      const [hours, minutes] = formData.time.split(':').map(Number)
      eventDate.setHours(hours, minutes)
    }

    // Prepare update data
    const updateData = {
      customer: formData.customer || null,
      project: formData.project || null,
      description: formData.title,
      notes: formData.notes || '',
    }

    // Update specific fields based on event type
    if (formData.type === 'measure') {
      updateData.measureDate = eventDate
      updateData.measureTime = formData.time
      updateData.measuredBy = formData.measuredBy || sessionUser.userId
    } else if (formData.type === 'install') {
      updateData.installDate = eventDate
      updateData.installBy = formData.installBy || sessionUser.userId
    }

    // Update the schedule event
    const updatedSchedule = await Schedule.findByIdAndUpdate(id, updateData, {
      new: true,
    })

    if (!updatedSchedule) {
      throw new Error('Schedule event not found')
    }

    // Revalidate calendar page
    revalidatePath('/calendar')

    return { success: true, data: updatedSchedule }
  } catch (error) {
    console.error('Error updating schedule event:', error)
    return { success: false, error: error.message }
  }
}

// Delete a schedule event
export async function deleteScheduleEvent(id) {
  try {
    await connectDB()

    // Get the current user from the session
    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.userId) {
      throw new Error('User ID is required')
    }

    // Delete the schedule event
    const deletedSchedule = await Schedule.findByIdAndDelete(id)

    if (!deletedSchedule) {
      throw new Error('Schedule event not found')
    }

    // Revalidate calendar page
    revalidatePath('/calendar')

    return { success: true }
  } catch (error) {
    console.error('Error deleting schedule event:', error)
    return { success: false, error: error.message }
  }
}

// Get all schedule events for a user
export async function getUserScheduleEvents() {
  try {
    await connectDB()

    // Get the current user from the session
    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.userId) {
      throw new Error('User ID is required')
    }

    const { userId } = sessionUser

    // Find all schedule events for the user
    const scheduleEvents = await Schedule.find({ user: userId })
      .populate('customer')
      .populate('project')
      .sort({ measureDate: 1, installDate: 1 })

    return { success: true, data: scheduleEvents }
  } catch (error) {
    console.error('Error getting user schedule events:', error)
    return { success: false, error: error.message }
  }
}

// Get schedule events for a specific date range
export async function getScheduleEventsForRange(startDate, endDate) {
  try {
    await connectDB()

    // Get the current user from the session
    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.userId) {
      throw new Error('User ID is required')
    }

    const { userId } = sessionUser

    // Convert dates to Date objects if they're not already
    const start = new Date(startDate)
    const end = new Date(endDate)

    // Find all schedule events within the date range
    const scheduleEvents = await Schedule.find({
      user: userId,
      $or: [
        { measureDate: { $gte: start, $lte: end } },
        { installDate: { $gte: start, $lte: end } },
      ],
    })
      .populate('customer')
      .populate('project')
      .sort({ measureDate: 1, installDate: 1 })

    return { success: true, data: scheduleEvents }
  } catch (error) {
    console.error('Error getting schedule events for range:', error)
    return { success: false, error: error.message }
  }
}
