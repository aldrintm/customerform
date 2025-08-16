// DashboardMobile.jsx
// Mobile-first dashboard shell. Desktop UI remains untouched — simply render this
// component only on small screens from your existing Dashboard.jsx.

import { Calendar, Users, Bookmark, Plus, ChevronRight } from 'lucide-react'
import WeatherNow from './WeatherNow'
import TotalCustomer from './TotalCustomer'
import DashboardBookmarkPage from './DashboardBookmarkPage'
import DashboardScheduleDisplay from './DashboardScheduleDisplay'
import { format, isSameDay, parseISO, startOfDay } from 'date-fns'

export default function DashboardMobile({
  customers = [],
  sessionUser,
  bookmarks = [],
}) {
  const today = startOfDay(new Date())
  const todayLabel = format(today, 'EEEE, MMMM dd, yyyy')

  // --- Flatten today's measure schedules from nested customers -> projects -> schedules
  const todayMeasureSchedules = []
  try {
    for (const c of customers || []) {
      for (const p of c.projects || []) {
        for (const s of p.schedules || []) {
          // Prefer ISO parsing; handle Date objects too
          const d =
            typeof s.measureDate === 'string'
              ? parseISO(s.measureDate)
              : new Date(s.measureDate)
          if (d && !isNaN(d) && isSameDay(startOfDay(d), today)) {
            todayMeasureSchedules.push({
              ...s,
              customer: c,
              project: p,
            })
          }
        }
      }
    }
  } catch (e) {
    // Fail silently — mobile UI should still render
  }

  // --- Recent customers (simple slice)
  const recentCustomers = (customers || []).slice(0, 5)

  return (
    <div className='sm:hidden block'>
      {/* Safe-area padded wrapper */}
      <div className='mx-auto max-w-sm min-h-[100dvh] bg-gradient-to-b from-background to-muted/30'>
        {/* Header */}
        <header className='sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/80 bg-white/95 border-b'>
          <div className='px-4 py-3 flex items-center justify-between'>
            <div>
              <div className='text-xs text-muted-foreground'>{todayLabel}</div>
              <div className='font-semibold'>
                {sessionUser?.user?.name
                  ? `Hi, ${sessionUser.user.name.split(' ')[0]}`
                  : 'Welcome back'}
              </div>
            </div>
            <div className='rounded-2xl border px-3 py-1 text-xs text-muted-foreground'>
              Dashboard
            </div>
          </div>
        </header>

        {/* Content */}
        <main className='p-4 pb-24 space-y-4'>
          {/* Weather + Totals */}
          <div className='grid grid-cols-2 gap-3'>
            <div className='col-span-2'>
              <WeatherNow />
            </div>
            <div className='rounded-2xl border bg-background p-4 shadow-sm'>
              <div className='text-2xl font-semibold leading-none'>
                {customers?.length ?? 0}
              </div>
              <div className='text-xs text-muted-foreground mt-1 flex items-center gap-1'>
                <Users className='h-3.5 w-3.5' /> Customers
              </div>
            </div>
            <div className='rounded-2xl border bg-background p-4 shadow-sm'>
              <div className='text-2xl font-semibold leading-none'>
                {bookmarks?.length ?? 0}
              </div>
              <div className='text-xs text-muted-foreground mt-1 flex items-center gap-1'>
                <Bookmark className='h-3.5 w-3.5' /> Bookmarks
              </div>
            </div>
          </div>

          {/* Today’s Measures (compact) */}
          <section className='rounded-2xl border bg-background p-4 shadow-sm'>
            <div className='flex items-center justify-between mb-2'>
              <h2 className='text-sm font-medium flex items-center gap-2'>
                <Calendar className='h-4 w-4' /> Today’s Measures
              </h2>
              <span className='text-xs text-muted-foreground'>
                {todayMeasureSchedules.length} total
              </span>
            </div>
            <DashboardScheduleDisplay schedules={todayMeasureSchedules} />
          </section>

          {/* Bookmarks (compact) */}
          {Array.isArray(bookmarks) && bookmarks.length > 0 && (
            <section className='rounded-2xl border bg-background p-2 shadow-sm'>
              <DashboardBookmarkPage bookmarks={bookmarks} />
            </section>
          )}

          {/* Recent customers list */}
          <section className='rounded-2xl border bg-background p-2 shadow-sm'>
            <div className='px-2 py-2 text-sm font-medium'>
              Recent Customers
            </div>
            <ul className='divide-y'>
              {recentCustomers.map((c) => (
                <li
                  key={c._id || c.id}
                  className='px-3 py-3 flex items-center justify-between'
                >
                  <div>
                    <div className='text-sm font-medium line-clamp-1'>
                      {c?.customerName || c?.name || 'Unnamed Customer'}
                    </div>
                    <div className='text-xs text-muted-foreground line-clamp-1'>
                      {c?.email || c?.phone || '—'}
                    </div>
                  </div>
                  <ChevronRight className='h-4 w-4 text-muted-foreground' />
                </li>
              ))}
              {recentCustomers.length === 0 && (
                <li className='px-3 py-6 text-center text-sm text-muted-foreground'>
                  No customers yet
                </li>
              )}
            </ul>
          </section>
        </main>

        {/* Floating CTA */}
        <a
          href='/dashboard/customers/add'
          className='fixed bottom-20 right-4 z-30 grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg active:scale-95'
          aria-label='Create customer'
        >
          <Plus className='h-5 w-5' />
        </a>

        {/* Bottom nav */}
        <nav className='fixed bottom-0 inset-x-0 z-30 border-t bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70'>
          <div className='mx-auto max-w-sm grid grid-cols-4 text-muted-foreground'>
            <a
              href='/dashboard'
              className='flex flex-col items-center justify-center py-2 text-foreground'
            >
              <svg viewBox='0 0 24 24' className='h-5 w-5'>
                <path d='M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-6v-6H10v6H4a1 1 0 0 1-1-1z' />
              </svg>
              <span className='text-[11px] mt-0.5'>Home</span>
            </a>
            <a
              href='/dashboard/customers'
              className='flex flex-col items-center justify-center py-2'
            >
              <svg viewBox='0 0 24 24' className='h-5 w-5'>
                <path d='M3 5h18M3 12h18M3 19h18' />
              </svg>
              <span className='text-[11px] mt-0.5'>Customers</span>
            </a>
            <a
              href='/dashboard/calendar'
              className='flex flex-col items-center justify-center py-2'
            >
              <svg viewBox='0 0 24 24' className='h-5 w-5'>
                <path d='M7 2v4M17 2v4M3 10h18M4 8h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z' />
              </svg>
              <span className='text-[11px] mt-0.5'>Calendar</span>
            </a>
            <a
              href='/dashboard/company'
              className='flex flex-col items-center justify-center py-2'
            >
              <svg viewBox='0 0 24 24' className='h-5 w-5'>
                <path d='M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z' />
              </svg>
              <span className='text-[11px] mt-0.5'>Admin</span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  )
}
