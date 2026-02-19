'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Booking {
  id: string
  address: string
  service: string
  scheduledDate: string
  scheduledTime: string
  status: string
  price: number
  notes?: string
  cleanerId?: string
  cleaner?: { id: string; name: string } | null
  client: { name: string; email: string; phone: string }
}

interface Cleaner {
  id: string
  name: string
  active: boolean
}

const STATUS_VARIANT: Record<string, 'default' | 'success' | 'warning' | 'destructive' | 'outline'> = {
  pending: 'warning',
  confirmed: 'default',
  completed: 'success',
  cancelled: 'outline',
}

const SERVICE_LABELS: Record<string, string> = {
  standard: 'Standard Turnover',
  premium: 'Premium Turnover',
  deep: 'Deep Clean',
}

// SVG icons per service type rendered inline
const ServiceIcon = ({ service }: { service: string }) => {
  if (service === 'premium') return (
    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
  )
  if (service === 'deep') return (
    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  )
  return (
    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  )
}

function parseTime(timeStr: string): number {
  const cleaned = timeStr.trim().toUpperCase()
  const ampm = cleaned.includes('PM') ? 'PM' : cleaned.includes('AM') ? 'AM' : null
  const numeric = cleaned.replace(/AM|PM/g, '').trim()
  const [h, m = '0'] = numeric.split(':')
  let hour = parseInt(h)
  const min = parseInt(m)
  if (ampm === 'PM' && hour !== 12) hour += 12
  if (ampm === 'AM' && hour === 12) hour = 0
  return hour * 60 + min
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 400, damping: 28 } },
}

export default function MissionBoardPage() {
  const [allBookings, setAllBookings] = useState<Booking[]>([])
  const [cleaners, setCleaners] = useState<Cleaner[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  )

  useEffect(() => {
    Promise.all([
      fetch('/api/bookings').then((r) => r.json()),
      fetch('/api/admin/cleaners').then((r) => r.json()),
    ])
      .then(([bookings, cleanerList]) => {
        setAllBookings(Array.isArray(bookings) ? bookings : [])
        setCleaners(Array.isArray(cleanerList) ? cleanerList.filter((c: Cleaner) => c.active) : [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const todayBookings = allBookings
    .filter((b) => {
      const d = new Date(b.scheduledDate).toISOString().split('T')[0]
      return d === selectedDate && b.status !== 'cancelled'
    })
    .sort((a, b) => parseTime(a.scheduledTime) - parseTime(b.scheduledTime))

  const cancelledToday = allBookings.filter((b) => {
    const d = new Date(b.scheduledDate).toISOString().split('T')[0]
    return d === selectedDate && b.status === 'cancelled'
  })

  const stats = {
    total: todayBookings.length,
    pending: todayBookings.filter((b) => b.status === 'pending').length,
    confirmed: todayBookings.filter((b) => b.status === 'confirmed').length,
    completed: todayBookings.filter((b) => b.status === 'completed').length,
    unassigned: todayBookings.filter((b) => !b.cleanerId).length,
    revenue: todayBookings.reduce((s, b) => s + b.price, 0),
  }

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id)
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        setAllBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)))
      }
    } catch (e) {
      console.error(e)
    } finally {
      setUpdating(null)
    }
  }

  const assignCleaner = async (bookingId: string, cleanerId: string) => {
    try {
      await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cleanerId: cleanerId || null }),
      })
      const cleaner = cleaners.find((c) => c.id === cleanerId) || null
      setAllBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId
            ? { ...b, cleanerId, cleaner: cleaner ? { id: cleaner.id, name: cleaner.name } : null }
            : b
        )
      )
    } catch (e) {
      console.error(e)
    }
  }

  const isToday = selectedDate === new Date().toISOString().split('T')[0]
  const displayDate = new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const prevDay = () => {
    const d = new Date(selectedDate + 'T12:00:00')
    d.setDate(d.getDate() - 1)
    setSelectedDate(d.toISOString().split('T')[0])
  }

  const nextDay = () => {
    const d = new Date(selectedDate + 'T12:00:00')
    d.setDate(d.getDate() + 1)
    setSelectedDate(d.toISOString().split('T')[0])
  }

  const inputClasses =
    'text-sm border border-input rounded-xl px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-background border-b border-border px-6 py-5 sticky top-0 z-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-foreground">Mission Board</h1>
              {isToday && <Badge>TODAY</Badge>}
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">Daily operations dispatch</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={prevDay}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={inputClasses}
            />
            <Button variant="ghost" size="icon" onClick={nextDay}>
              <ChevronRight className="w-4 h-4" />
            </Button>
            {!isToday && (
              <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}>
                Today
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <p className="text-sm font-semibold text-muted-foreground mb-5">{displayDate}</p>

        {/* Stats bar */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
          {[
            { label: 'Jobs', value: stats.total, color: 'text-foreground', bg: 'bg-background' },
            { label: 'Pending', value: stats.pending, color: 'text-yellow-600', bg: 'bg-yellow-50' },
            { label: 'Confirmed', value: stats.confirmed, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Done', value: stats.completed, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Unassigned', value: stats.unassigned, color: stats.unassigned > 0 ? 'text-destructive' : 'text-muted-foreground', bg: stats.unassigned > 0 ? 'bg-destructive/10' : 'bg-muted' },
            { label: 'Revenue', value: `$${stats.revenue.toLocaleString()}`, color: 'text-primary', bg: 'bg-secondary' },
          ].map((s, i) => (
            <Card key={i} depth={1} className={cn('px-4 py-4 text-center', s.bg)}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{s.label}</p>
              <p className={cn('text-2xl font-extrabold', s.color)}>{s.value}</p>
            </Card>
          ))}
        </div>

        {/* Jobs */}
        {loading ? (
          <Card depth={1} className="p-16 text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">Loading missions...</p>
          </Card>
        ) : todayBookings.length === 0 ? (
          <Card depth={1} className="p-16 text-center">
            <div className="flex justify-center mb-4">
              {isToday ? (
                <svg className="w-12 h-12 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                <svg className="w-12 h-12 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
                </svg>
              )}
            </div>
            <p className="font-bold text-foreground text-lg">{isToday ? 'No jobs today' : 'No jobs this day'}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {cancelledToday.length > 0 ? `${cancelledToday.length} cancelled` : 'Nothing scheduled'}
            </p>
          </Card>
        ) : (
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
            {todayBookings.map((booking, idx) => {
              const isDone = booking.status === 'completed'
              return (
                <motion.div key={booking.id} variants={item}>
                  <Card depth={1} className={cn('overflow-hidden transition-all', isDone && 'opacity-70')}>
                    <div className="flex items-stretch">
                      {/* Time column */}
                      <div className="flex-shrink-0 w-20 bg-muted/50 border-r border-border flex flex-col items-center justify-center py-4 px-2">
                        <span className="text-xs font-bold text-muted-foreground text-center leading-tight">
                          {booking.scheduledTime}
                        </span>
                        <span className="mt-1"><ServiceIcon service={booking.service} /></span>
                        <span className="text-xs text-muted-foreground font-semibold mt-1">#{idx + 1}</span>
                      </div>

                      {/* Main content */}
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="font-extrabold text-foreground text-base">{booking.client.name}</span>
                              <Badge variant={STATUS_VARIANT[booking.status] ?? 'outline'}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                              {!booking.cleanerId && (
                                <Badge variant="destructive">Unassigned</Badge>
                              )}
                            </div>
                            <p className="text-sm font-semibold text-foreground mb-0.5">
                              {SERVICE_LABELS[booking.service] ?? booking.service}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">{booking.address}</p>
                            {booking.notes && (
                              <p className="text-xs text-muted-foreground mt-1 italic">{booking.notes}</p>
                            )}
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xl font-extrabold text-primary">${booking.price}</p>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center gap-3 flex-wrap">
                          <select
                            value={booking.cleanerId ?? ''}
                            onChange={(e) => assignCleaner(booking.id, e.target.value)}
                            className={cn(
                              inputClasses,
                              'text-xs font-semibold',
                              booking.cleanerId
                                ? 'border-purple-200 bg-purple-50 text-purple-800'
                                : 'border-destructive/30 bg-destructive/10 text-destructive'
                            )}
                          >
                            <option value="">Assign cleaner...</option>
                            {cleaners.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>

                          <a
                            href={`tel:${booking.client.phone}`}
                            className="text-xs font-semibold text-muted-foreground bg-muted hover:bg-muted/80 px-2.5 py-1.5 rounded-xl transition-colors flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3" /> {booking.client.phone}
                          </a>

                          <div className="flex gap-1.5 ml-auto">
                            {booking.status === 'pending' && (
                              <Button size="sm" onClick={() => updateStatus(booking.id, 'confirmed')} disabled={updating === booking.id}>
                                Confirm
                              </Button>
                            )}
                            {booking.status === 'confirmed' && (
                              <Button size="sm" onClick={() => updateStatus(booking.id, 'completed')} disabled={updating === booking.id}>
                                Mark Done
                              </Button>
                            )}
                            {booking.status === 'completed' && (
                              <Badge variant="success">Completed</Badge>
                            )}
                            {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                              <Button size="sm" variant="destructive" onClick={() => updateStatus(booking.id, 'cancelled')} disabled={updating === booking.id}>
                                Cancel
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {/* Cancelled jobs */}
        {cancelledToday.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              {cancelledToday.length} Cancelled
            </p>
            <div className="space-y-1">
              {cancelledToday.map((b) => (
                <div key={b.id} className="bg-muted/50 rounded-xl px-4 py-2.5 border border-border flex items-center justify-between opacity-60">
                  <span className="text-sm text-muted-foreground line-through">{b.client.name}</span>
                  <span className="text-xs text-muted-foreground">{b.scheduledTime} · ${b.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
