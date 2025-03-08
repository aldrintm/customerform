'use server'

import { revalidatePath } from 'next/cache'

export async function refreshCustomerData() {
  revalidatePath('/dashboard')
  revalidatePath('/dashboard/customers')
  // revalidatePath(`/dashboard/customers/${customerId}`)
  // revalidatePath(`/dashboard/customers/${customerId}/schedule`)
  // revalidatePath(`/dashboard/customers/${customerId}/editSchedule`)
  // revalidatePath(`/dashboard/customers/${customerId}/notes`)
  // revalidatePath(`/dashboard/customers/${customerId}/project`)
}
