// DashboardMobile.jsx — Minimal, clean mobile dashboard
// Render on small screens only (keep desktop UI untouched in Dashboard.jsx)

import Link from 'next/link'
import { Calendar, Users, Plus } from 'lucide-react'
import WeatherNow from './WeatherNow'
import DashboardTable from './DashboardTable'
import DashboardScheduleDisplay from './DashboardScheduleDisplay'
import { format, isSameDay, parseISO, startOfDay } from 'date-fns'
import CustomerSearchForm from './CustomerSearchForm'
import Customer from '@/models/Customer'

export default function DashboardMobile({ customers, sessionUser }) {
  // // Flatten today's measure schedules from customers -> projects -> schedules
  // const todayMeasureSchedules = []
  // try {
  //   for (const c of customers || []) {
  //     for (const p of c.projects || []) {
  //       for (const s of p.schedules || []) {
  //         const d =
  //           typeof s.measureDate === 'string'
  //             ? parseISO(s.measureDate)
  //             : new Date(s.measureDate)
  //         if (d && !isNaN(d) && isSameDay(startOfDay(d), today)) {
  //           todayMeasureSchedules.push({ ...s, customer: c_id, project: p })
  //         }
  //       }
  //     }
  //   }
  // } catch {
  //   // ignore — still render UI
  // }

  const currentDate = format(new Date(), 'EEEE, MMMM dd, yyyy')

  // Get all schedules with customer information
  const processedSchedules = customers.flatMap(
    (customer) =>
      customer.projects
        ?.filter((project) => project.schedules?.length > 0)
        ?.flatMap((project) =>
          project.schedules.map((schedule) => {
            // Parse MongoDB UTC date and keep it as UTC
            const measureDate = new Date(schedule.measureDate)

            return {
              ...schedule,
              customerName: `${customer.firstName} ${customer.lastName}`,
              customerAddress: customer.address,
              customerPhone: customer.phone,
              customerEmail: customer.email,
              customerType: project.customerType,
              measureDate: measureDate, // Keep as UTC Date object
              measureBy: schedule.measureBy || 'Unassigned',
              measureTime: schedule.measureTime || 'Unassigned',
              // installDate: schedule.installDate
              //   ? new Date(schedule.installDate)
              //   : null,
              // installBy: schedule.installBy || 'Unassigned',
              // installTime: schedule.installTime || 'No time set',
            }
          })
        ) || []
  )

  // Format it to a string that shows your local time
  const localTimeString = new Date().toLocaleString()

  // console.log(`Local California time: ${localTimeString}`)

  // Get today's date in local timezone
  const today = startOfDay(new Date())
  const todayLabel = format(today, 'EEEE, MMMM dd, yyyy')

  // Get today's date normalized to UTC midnight
  const todayUTC = new Date(
    Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate()
    )
  )

  const currentDateTodayUTC = format(todayUTC, 'EEEE, MMMM dd, yyyy')

  // Get today localtime to UTC for comparison
  const localTime = new Date()

  const localTimeInUTC = new Date(localTime.getTime())

  // console.log(
  //   `Local time: ${localTime.toLocaleString('en-US', {
  //     timeZone: 'America/Los_Angeles',
  //   })}`
  // )
  // console.log(`Same time in UTC format: ${localTimeInUTC.toISOString()}`)

  // console.log('Today:', today.toISOString())
  // console.log('Today UTC:', todayUTC.toISOString())
  // console.log('Current Date:', currentDate)

  const todayMeasureSchedules = processedSchedules.filter((schedule) => {
    try {
      // Get schedule date as UTC midnight
      const scheduleDayUTC = new Date(
        Date.UTC(
          schedule.measureDate.getUTCFullYear(),
          schedule.measureDate.getUTCMonth(),
          schedule.measureDate.getUTCDate()
        )
      )
      // const scheduleDay = startOfDay(schedule.measureDate)
      // const isToday = isSameDay(scheduleDayUTC, todayUTC)

      // Avoid using startOfDay as it might apply local timezone
      const isToday =
        scheduleDayUTC.toISOString().split('T')[0] ===
        todayUTC.toISOString().split('T')[0]

      // Debug logging with UTC formatting
      // console.log('Comparing dates:', {
      //   scheduleDay: format(scheduleDayUTC, 'yyyy-MM-dd'),
      //   today: format(todayUTC, 'yyyy-MM-dd'),
      //   isToday,
      //   originalDate: format(schedule.measureDate, 'yyyy-MM-dd'),
      //   rawMongoMeasureDate: schedule.measureDate.toISOString(),
      //   systemDate: new Date().toISOString(),
      // })

      // Debug logging with explicit UTC formatting
      // console.log('Comparing dates:', {
      //   scheduleDay: scheduleDayUTC.toISOString().split('T')[0], // Extract date in UTC
      //   // today: todayUTC.toISOString(), // Extract date in UTC
      //   today: todayUTC.toISOString().split('T')[0], // Extract date in local time
      //   isToday,
      //   originalDate: schedule.measureDate.toISOString().split('T')[0], // Extract date in UTC
      //   rawMongoMeasureDate: schedule.measureDate.toISOString(),
      //   systemDate: new Date().toISOString(),
      // })

      return isToday
    } catch (error) {
      console.error('Date comparison error:', error)
      return false
    }
  })

  // console.log("Today's Schedules:", todayMeasureSchedules)

  return (
    <div className='sm:hidden block'>
      {/* Page wrapper */}
      <div className='mx-auto max-w-sm min-h-[100dvh] bg-background'>
        {/* Header */}
        {/* <header className='sticky top-0 z-20 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80'>
          <div className='px-4 py-3 flex items-center justify-between gap-3'>
            <Link href='/dashboard'>
              <div className='flex-1 min-w-0'>
                <div className='font-semibold truncate'>
                  {sessionUser?.user?.name
                    ? 'Hi, ' + sessionUser.user.name.split(' ')[0]
                    : 'Welcome back'}
                </div>
                <div className='text-xs text-muted-foreground truncate'>
                  {todayLabel}
                </div>
              </div>
            </Link>

            <div className='flex-shrink-0 w-2/5'>
              <CustomerSearchForm />
            </div>
          </div>
        </header> */}

        {/* Content */}
        <main className='p-0 space-y-2 pb-5'>
          {/* Weather */}
          <section className='rounded-2xl bg-background'>
            <div className='flex justify-center'>
              <WeatherNow />
            </div>
          </section>

          {/* Total Customers in Database */}
          {/* <section className='rounded-2xl border bg-background p-4 shadow-sm'>
            <div className='text-2xl font-semibold leading-none'>
              {customers?.length ?? 0}
            </div>
            <div className='text-xs text-muted-foreground mt-1 inline-flex items-center gap-1'>
              <Users className='h-3.5 w-3.5' /> Customers
            </div>
          </section> */}

          {/* Today’s Measures */}
          <section className='rounded-2xl border bg-background p-4 shadow-sm'>
            <div className='flex items-center justify-between mb-2'>
              <h2 className='text-sm font-medium inline-flex items-center gap-2'>
                <Calendar className='h-4 w-4' /> Today’s Measures
              </h2>
              <span className='text-xs text-muted-foreground'>
                {todayMeasureSchedules.length} total
              </span>
            </div>
            <DashboardScheduleDisplay schedules={todayMeasureSchedules} />
          </section>

          {/* Dashboard Table — placed directly below Today's Measures */}
          <section className='rounded-2xl border bg-background shadow-sm'>
            <div className='px-4 pt-3 pb-2 text-sm font-medium'>Customers</div>
            {/* Make wide tables usable on small screens via horizontal scroll, without squishing columns */}
            <div className='-mx-4 overflow-x-auto'>
              <div className='min-w-[560px] px-4 pb-3'>
                <DashboardTable
                  customers={customers}
                  sessionUser={sessionUser}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
