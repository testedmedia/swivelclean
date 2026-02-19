'use client'

import { useEffect, useState } from 'react'

interface Booking {
  id: string
  address: string
  service: string
  scheduledDate: string
  scheduledTime: string
  status: string
  price: number
  cleanerId?: string
  cleaner?: { id: string; name: string } | null
  client: { name: string; phone: string; email: string }
}

const STATUS_BAR: Record<string, string> = {
  pending: 'bg-amber-400',
  confirmed: 'bg-blue-500',
  completed: 'bg-green-500',
  cancelled: 'bg-red-400',
}

const STATUS_BG: Record<string, string> = {
  pending: 'bg-amber-50 border-amber-100',
  confirmed: 'bg-blue-50 border-blue-100',
  completed: 'bg-green-50 border-green-100',
  cancelled: 'bg-gray-50 border-gray-100',
}

const STATUS_TEXT: Record<string, string> = {
  pending: 'text-amber-700',
  confirmed: 'text-blue-700',
  completed: 'text-green-700',
  cancelled: 'text-gray-400',
}

const STATUS_BADGE: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-gray-100 text-gray-500',
}

const SERVICE_LABELS: Record<string, string> = {
  standard: 'Standard',
  premium: 'Premium',
  deep: 'Deep Clean',
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export default function CalendarPage() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)

  useEffect(() => { fetchBookings() }, [year, month])

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/bookings')
      if (res.ok) {
        const data = await res.json()
        setBookings(Array.isArray(data) ? data : [])
      }
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const prevMonth = () => {
    setSelectedDay(null)
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }

  const nextMonth = () => {
    setSelectedDay(null)
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  const goToday = () => {
    setMonth(now.getMonth())
    setYear(now.getFullYear())
    setSelectedDay(now.getDate())
  }

  const updateStatus = async (id: string, status: string) => {
    setUpdatingStatus(id)
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
      }
    } catch (e) { console.error(e) }
    finally { setUpdatingStatus(null) }
  }

  // Build grid
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  // Group by day
  const byDay: Record<number, Booking[]> = {}
  bookings.forEach(b => {
    const d = new Date(b.scheduledDate)
    if (d.getFullYear() === year && d.getMonth() === month) {
      const day = d.getDate()
      if (!byDay[day]) byDay[day] = []
      byDay[day].push(b)
    }
  })

  // Sort each day's bookings by time
  Object.values(byDay).forEach(arr =>
    arr.sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime))
  )

  const todayDay = now.getFullYear() === year && now.getMonth() === month ? now.getDate() : null
  const selectedBookings = selectedDay ? (byDay[selectedDay] ?? []) : []

  // Month stats
  const monthBookings = Object.values(byDay).flat()
  const monthRevenue = monthBookings.filter(b => b.status !== 'cancelled').reduce((s, b) => s + b.price, 0)
  const monthPending = monthBookings.filter(b => b.status === 'pending').length
  const monthConfirmed = monthBookings.filter(b => b.status === 'confirmed').length
  const monthCompleted = monthBookings.filter(b => b.status === 'completed').length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Month Navigation + Stats */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-xl font-extrabold text-gray-900 w-52 text-center">
              {MONTHS[month]} {year}
            </span>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={goToday}
              className="ml-2 px-3 py-1.5 text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors"
            >
              Today
            </button>
          </div>

          {/* Month stats */}
          <div className="flex items-center gap-6 text-sm">
            <div className="text-right">
              <p className="text-xs text-gray-400 font-medium">This Month</p>
              <p className="font-extrabold text-gray-900">{monthBookings.length} jobs</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 font-medium">Revenue</p>
              <p className="font-extrabold text-teal-600">${monthRevenue.toLocaleString()}</p>
            </div>
            <div className="flex gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-amber-700">
                <span className="w-2 h-2 rounded-full bg-amber-400" />{monthPending} pending
              </span>
              <span className="flex items-center gap-1.5 text-blue-700">
                <span className="w-2 h-2 rounded-full bg-blue-500" />{monthConfirmed} confirmed
              </span>
              <span className="flex items-center gap-1.5 text-green-700">
                <span className="w-2 h-2 rounded-full bg-green-500" />{monthCompleted} done
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-0 h-[calc(100vh-160px)]">
        {/* Calendar Grid */}
        <div className={`flex-1 overflow-auto transition-all ${selectedDay ? 'pr-0' : ''}`}>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="bg-white h-full">
              {/* Day headers */}
              <div className="grid grid-cols-7 border-b border-gray-100 sticky top-0 bg-white z-10">
                {DAYS.map((d) => (
                  <div key={d} className="text-center text-xs font-bold text-gray-500 py-3 border-r border-gray-50 last:border-r-0">
                    {d}
                  </div>
                ))}
              </div>

              {/* Grid rows */}
              <div className="grid grid-cols-7" style={{ gridAutoRows: 'minmax(128px, auto)' }}>
                {cells.map((day, i) => {
                  const dayBookings = day ? (byDay[day] ?? []) : []
                  const isToday = day === todayDay
                  const isSelected = day === selectedDay
                  const hasBookings = dayBookings.length > 0
                  const visible = dayBookings.slice(0, 3)
                  const overflow = dayBookings.length - visible.length

                  return (
                    <div
                      key={i}
                      onClick={() => day && setSelectedDay(isSelected ? null : day)}
                      className={`border-b border-r border-gray-100 last:border-r-0 p-2 transition-colors ${
                        !day
                          ? 'bg-gray-50/60'
                          : isSelected
                            ? 'bg-teal-50 cursor-pointer'
                            : hasBookings
                              ? 'hover:bg-gray-50 cursor-pointer'
                              : 'cursor-pointer hover:bg-gray-50/50'
                      }`}
                    >
                      {day && (
                        <>
                          {/* Day number */}
                          <div className="flex items-center justify-between mb-1.5">
                            <span
                              className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${
                                isToday
                                  ? 'bg-teal-600 text-white'
                                  : isSelected
                                    ? 'bg-teal-100 text-teal-700'
                                    : 'text-gray-700'
                              }`}
                            >
                              {day}
                            </span>
                            {dayBookings.length > 0 && (
                              <span className="text-xs text-gray-400 font-medium">
                                ${dayBookings.filter(b => b.status !== 'cancelled').reduce((s, b) => s + b.price, 0)}
                              </span>
                            )}
                          </div>

                          {/* Appointment pills */}
                          <div className="space-y-1">
                            {visible.map((b) => (
                              <div
                                key={b.id}
                                className={`flex items-center gap-1.5 rounded-md px-1.5 py-1 border text-left ${STATUS_BG[b.status] ?? 'bg-gray-50 border-gray-100'}`}
                              >
                                <div className={`w-1 h-full min-h-[16px] rounded-full flex-shrink-0 ${STATUS_BAR[b.status] ?? 'bg-gray-300'}`} />
                                <div className="min-w-0 flex-1">
                                  <p className={`text-xs font-semibold truncate leading-tight ${STATUS_TEXT[b.status] ?? 'text-gray-700'}`}>
                                    {b.client.name}
                                  </p>
                                  <p className="text-xs text-gray-400 leading-tight truncate">
                                    {b.scheduledTime} · {SERVICE_LABELS[b.service] ?? b.service}
                                  </p>
                                </div>
                              </div>
                            ))}
                            {overflow > 0 && (
                              <p className="text-xs text-teal-600 font-bold pl-1">+{overflow} more</p>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Day Detail Panel */}
        {selectedDay && (
          <div className="w-80 flex-shrink-0 border-l border-gray-100 bg-white overflow-y-auto">
            {/* Panel header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h3 className="font-extrabold text-gray-900 text-base">
                  {MONTHS[month]} {selectedDay}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  {selectedBookings.length} appointment{selectedBookings.length !== 1 ? 's' : ''}
                  {selectedBookings.length > 0 && (
                    <> · ${selectedBookings.filter(b => b.status !== 'cancelled').reduce((s, b) => s + b.price, 0)} revenue</>
                  )}
                </p>
              </div>
              <button
                onClick={() => setSelectedDay(null)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {selectedBookings.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <svg className="w-10 h-10 text-gray-200 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-400 font-medium">No bookings this day</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {selectedBookings.map((b) => (
                  <div key={b.id} className="px-5 py-5">
                    {/* Status + time row */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${STATUS_BADGE[b.status] ?? 'bg-gray-100 text-gray-700'}`}>
                        {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {b.scheduledTime}
                      </div>
                    </div>

                    {/* Client */}
                    <p className="font-bold text-gray-900 text-sm mb-0.5">{b.client.name}</p>
                    <p className="text-xs text-gray-500 mb-1">{SERVICE_LABELS[b.service] ?? b.service}</p>
                    <p className="text-xs text-gray-400 mb-2 truncate">{b.address}</p>

                    {/* Price + cleaner */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-extrabold text-teal-600">${b.price}</span>
                      {b.cleaner ? (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold">
                          {b.cleaner.name}
                        </span>
                      ) : (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">
                          Unassigned
                        </span>
                      )}
                    </div>

                    {/* Quick actions */}
                    <div className="flex flex-wrap gap-2">
                      {b.status === 'pending' && (
                        <button
                          onClick={() => updateStatus(b.id, 'confirmed')}
                          disabled={updatingStatus === b.id}
                          className="flex-1 py-1.5 text-xs font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                          Confirm
                        </button>
                      )}
                      {b.status === 'confirmed' && (
                        <button
                          onClick={() => updateStatus(b.id, 'completed')}
                          disabled={updatingStatus === b.id}
                          className="flex-1 py-1.5 text-xs font-bold bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                          Mark Done
                        </button>
                      )}
                      <a
                        href={`tel:${b.client.phone}`}
                        className="flex-1 py-1.5 text-xs font-bold bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 border border-teal-200 transition-colors text-center"
                      >
                        Call
                      </a>
                      <a
                        href={`mailto:${b.client.email}`}
                        className="flex-1 py-1.5 text-xs font-bold bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center"
                      >
                        Email
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
