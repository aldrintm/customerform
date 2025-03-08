'use server'

import { revalidatePath } from 'next/cache'

export async function refreshCustomerData() {
  revalidatePath('/dashboard', 'page')
  revalidatePath('/dashboard/customers', 'page')
  // using wildcard revalidation (2 argument = /[id] and page) and not template literal
  revalidatePath('dashboard/customers/[id]', 'page') // revalidates /dashboard/customers
  revalidatePath('/dashboard/customers/[id]/schedule', 'page') // revalidates schedule pages
  revalidatePath('/dashboard/customers/[id]/notes', 'page') // revalidates notes pages
  revalidatePath('/dashboard/customers/[id]/project', 'page') // revalidates project pages
}
