'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, Plus, ChevronDown, Calendar, Phone, Mail, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Cleaner {
  id: string
  name: string
  active: boolean
}

interface Booking {
  id: string
  address: string
  service: string
  scheduledDate: string
  scheduledTime: string
  price: number
  status: string
  notes?: string
  cleanerId?: string
  cleaner?: { id: string; name: string } | null
  client: {
    name: string
    email: string
    phone: string
  }
}

const STATUS_VARIANT: Record<string, 'default' | 'success' | 'warning' | 'destructive' | 'outline'> = {
  pending: 'warning',
  confirmed: 'default',
  completed: 'success',
  cancelled: 'destructive',
}

const STATUS_FLOW = ['pending', 'confirmed', 'completed']

const SERVICE_LABELS: Record<string, string> = {
  standard: 'Standard Turnover',
  premium: 'Premium Turnover',
  deep: 'Deep Clean',
}

const BLANK_BOOKING = {
  clientName: '', clientEmail: '', clientPhone: '',
  address: '', service: 'standard', scheduledDate: '', scheduledTime: '10:00',
  notes: '', price: '180',
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [cleaners, setCleaners] = useState<Cleaner[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [syncing, setSyncing] = useState<string | null>(null)
  const [syncMsg, setSyncMsg] = useState<Record<string, string>>({})
  const [showNewBooking, setShowNewBooking] = useState(false)
  const [newBooking, setNewBooking] = useState(BLANK_BOOKING)
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState('')

  useEffect(() => {
    fetchBookings()
    fetchCleaners()
  }, [])

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/bookings')
      if (!res.ok) throw new Error('Unauthorized')
      const data = await res.json()
      setBookings(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const fetchCleaners = async () => {
    try {
      const res = await fetch('/api/admin/cleaners')
      if (res.ok) {
        const data = await res.json()
        setCleaners(data.filter((c: Cleaner) => c.active))
      }
    } catch (e) {
      console.error(e)
    }
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
        setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)))
      }
    } catch (e) {
      console.error(e)
    } finally {
      setUpdating(null)
    }
  }

  const assignCleaner = async (bookingId: string, cleanerId: string) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cleanerId: cleanerId || null }),
      })
      if (res.ok) {
        const cleaner = cleaners.find((c) => c.id === cleanerId) || null
        setBookings((prev) =>
          prev.map((b) =>
            b.id === bookingId
              ? { ...b, cleanerId, cleaner: cleaner ? { id: cleaner.id, name: cleaner.name } : null }
              : b
          )
        )
      }
    } catch (e) {
      console.error(e)
    }
  }

  const createBooking = async () => {
    setCreating(true)
    setCreateError('')
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newBooking.clientName,
          email: newBooking.clientEmail,
          phone: newBooking.clientPhone,
          address: newBooking.address,
          service: newBooking.service,
          date: newBooking.scheduledDate,
          time: newBooking.scheduledTime,
          notes: newBooking.notes,
          price: parseFloat(newBooking.price),
        }),
      })
      if (!res.ok) {
        const d = await res.json()
        setCreateError(d.error || 'Failed to create booking')
      } else {
        setShowNewBooking(false)
        setNewBooking(BLANK_BOOKING)
        fetchBookings()
      }
    } catch {
      setCreateError('Network error — try again')
    } finally {
      setCreating(false)
    }
  }

  const syncToCalendar = async (bookingId: string) => {
    setSyncing(bookingId)
    setSyncMsg((prev) => ({ ...prev, [bookingId]: '' }))
    try {
      const res = await fetch('/api/admin/calendar/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId }),
      })
      const data = await res.json()
      if (res.ok) {
        setSyncMsg((prev) => ({ ...prev, [bookingId]: 'Synced to calendar' }))
      } else {
        setSyncMsg((prev) => ({ ...prev, [bookingId]: data.error || 'Sync failed' }))
      }
    } catch {
      setSyncMsg((prev) => ({ ...prev, [bookingId]: 'Sync failed' }))
    } finally {
      setSyncing(null)
    }
  }

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    revenue: bookings.filter((b) => b.status !== 'cancelled').reduce((s, b) => s + b.price, 0),
    earned: bookings.filter((b) => b.status === 'completed').reduce((s, b) => s + b.price, 0),
  }

  const filtered = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter)

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

  const inputClasses =
    'w-full h-11 px-4 bg-muted/50 border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors text-sm'

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-background border-b border-border px-6 py-5 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-foreground">Bookings</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Manage all cleaning jobs</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchBookings}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm" onClick={() => setShowNewBooking(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total, color: 'text-foreground', bg: 'bg-background' },
            { label: 'Pending', value: stats.pending, color: 'text-yellow-600', bg: 'bg-yellow-50' },
            { label: 'Confirmed', value: stats.confirmed, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Completed', value: stats.completed, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Pipeline', value: `$${stats.revenue.toLocaleString()}`, color: 'text-primary', bg: 'bg-secondary' },
            { label: 'Earned', value: `$${stats.earned.toLocaleString()}`, color: 'text-primary', bg: 'bg-secondary' },
          ].map((s, i) => (
            <Card key={i} depth={1} className={cn('p-5', s.bg)}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{s.label}</p>
              <p className={cn('text-3xl font-extrabold', s.color)}>{s.value}</p>
            </Card>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border',
                filter === f
                  ? 'bg-primary text-primary-foreground border-primary shadow-depth-1'
                  : 'bg-background text-muted-foreground border-border hover:border-primary/30'
              )}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f !== 'all' && (
                <span className={cn('ml-1.5 text-xs px-1.5 py-0.5 rounded-full', filter === f ? 'bg-primary-foreground/20' : 'bg-muted text-muted-foreground')}>
                  {bookings.filter((b) => b.status === f).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Bookings list */}
        {loading ? (
          <Card depth={1} className="p-16 text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">Loading bookings...</p>
          </Card>
        ) : filtered.length === 0 ? (
          <Card depth={1} className="p-16 text-center">
            <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground font-medium">No {filter !== 'all' ? filter : ''} bookings</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {filtered.map((booking) => (
              <Card key={booking.id} depth={1} className="overflow-hidden">
                {/* Main row */}
                <div className="flex items-center gap-4 px-6 py-4">
                  <Badge variant={STATUS_VARIANT[booking.status] ?? 'outline'}>
                    {booking.status.toUpperCase()}
                  </Badge>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-bold text-foreground">{booking.client.name}</span>
                      <span className="text-xs text-muted-foreground">{booking.client.phone}</span>
                      {booking.cleaner && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold">
                          {booking.cleaner.name}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{booking.address}</p>
                  </div>

                  <div className="hidden sm:block text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-foreground">
                      {SERVICE_LABELS[booking.service] ?? booking.service}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {fmtDate(booking.scheduledDate)} · {booking.scheduledTime}
                    </p>
                  </div>

                  <div className="flex-shrink-0 text-right">
                    <p className="text-lg font-extrabold text-primary">${booking.price}</p>
                  </div>

                  <button
                    onClick={() => setExpanded(expanded === booking.id ? null : booking.id)}
                    className="flex-shrink-0 p-2 hover:bg-muted rounded-xl transition-colors"
                  >
                    <ChevronDown className={cn('w-4 h-4 text-muted-foreground transition-transform', expanded === booking.id && 'rotate-180')} />
                  </button>
                </div>

                {/* Expanded detail */}
                <AnimatePresence>
                  {expanded === booking.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border px-6 py-5 bg-muted/30">
                        <div className="grid sm:grid-cols-2 gap-6 mb-5">
                          <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Client Info</p>
                            <div className="space-y-1.5">
                              <p className="text-sm"><span className="text-muted-foreground">Name:</span> <span className="font-semibold">{booking.client.name}</span></p>
                              <p className="text-sm"><span className="text-muted-foreground">Email:</span> <a href={`mailto:${booking.client.email}`} className="font-semibold text-primary">{booking.client.email}</a></p>
                              <p className="text-sm"><span className="text-muted-foreground">Phone:</span> <a href={`tel:${booking.client.phone}`} className="font-semibold text-primary">{booking.client.phone}</a></p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Job Details</p>
                            <div className="space-y-1.5">
                              <p className="text-sm"><span className="text-muted-foreground">Address:</span> <span className="font-semibold">{booking.address}</span></p>
                              <p className="text-sm"><span className="text-muted-foreground">Date:</span> <span className="font-semibold">{fmtDate(booking.scheduledDate)} at {booking.scheduledTime}</span></p>
                              <p className="text-sm"><span className="text-muted-foreground">Service:</span> <span className="font-semibold">{SERVICE_LABELS[booking.service] ?? booking.service}</span></p>
                              {booking.notes && <p className="text-sm"><span className="text-muted-foreground">Notes:</span> <span className="font-semibold">{booking.notes}</span></p>}
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Assign Cleaner</p>
                          <select
                            value={booking.cleanerId ?? ''}
                            onChange={(e) => assignCleaner(booking.id, e.target.value)}
                            className={cn(inputClasses, 'min-w-[200px] w-auto')}
                          >
                            <option value="">— Unassigned —</option>
                            {cleaners.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {STATUS_FLOW.filter((s) => s !== booking.status).map((s) => (
                            <Button
                              key={s}
                              size="sm"
                              variant={s === 'completed' ? 'default' : s === 'confirmed' ? 'secondary' : 'outline'}
                              onClick={() => updateStatus(booking.id, s)}
                              disabled={updating === booking.id}
                            >
                              {updating === booking.id ? 'Updating...' : `Mark ${s.charAt(0).toUpperCase() + s.slice(1)}`}
                            </Button>
                          ))}
                          {booking.status !== 'cancelled' && (
                            <Button size="sm" variant="destructive" onClick={() => updateStatus(booking.id, 'cancelled')} disabled={updating === booking.id}>
                              Cancel
                            </Button>
                          )}
                          <Button size="sm" variant="outline" onClick={() => syncToCalendar(booking.id)} disabled={syncing === booking.id}>
                            <Calendar className="w-3.5 h-3.5 mr-1.5" />
                            {syncing === booking.id ? 'Syncing...' : 'Sync to Calendar'}
                          </Button>
                          <a href={`tel:${booking.client.phone}`}>
                            <Button size="sm" variant="outline">
                              <Phone className="w-3.5 h-3.5 mr-1.5" /> Call Client
                            </Button>
                          </a>
                          <a href={`mailto:${booking.client.email}`}>
                            <Button size="sm" variant="ghost">
                              <Mail className="w-3.5 h-3.5 mr-1.5" /> Email Client
                            </Button>
                          </a>
                        </div>
                        {syncMsg[booking.id] && (
                          <p className={cn('text-xs mt-2 font-semibold', syncMsg[booking.id].includes('Synced') ? 'text-emerald-600' : 'text-destructive')}>
                            {syncMsg[booking.id]}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* New Booking Modal */}
      <AnimatePresence>
        {showNewBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 4 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            >
              <Card depth={3} className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-extrabold text-foreground">New Booking</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">Create a booking manually</p>
                  </div>
                  <button
                    onClick={() => { setShowNewBooking(false); setNewBooking(BLANK_BOOKING); setCreateError('') }}
                    className="p-2 hover:bg-muted rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                <div className="px-6 py-5 space-y-6">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Client Info</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-foreground block mb-1">Full Name *</label>
                        <input type="text" value={newBooking.clientName} onChange={e => setNewBooking(p => ({ ...p, clientName: e.target.value }))} placeholder="Jane Smith" className={inputClasses} />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground block mb-1">Phone *</label>
                        <input type="tel" value={newBooking.clientPhone} onChange={e => setNewBooking(p => ({ ...p, clientPhone: e.target.value }))} placeholder="(310) 555-0123" className={inputClasses} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-foreground block mb-1">Email *</label>
                        <input type="email" value={newBooking.clientEmail} onChange={e => setNewBooking(p => ({ ...p, clientEmail: e.target.value }))} placeholder="jane@example.com" className={inputClasses} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Job Details</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-foreground block mb-1">Property Address *</label>
                        <input type="text" value={newBooking.address} onChange={e => setNewBooking(p => ({ ...p, address: e.target.value }))} placeholder="1234 Sunset Blvd, West Hollywood, CA 90028" className={inputClasses} />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground block mb-1">Service *</label>
                        <select
                          value={newBooking.service}
                          onChange={e => {
                            const svc = e.target.value
                            const prices: Record<string, string> = { standard: '180', premium: '220', deep: '350' }
                            setNewBooking(p => ({ ...p, service: svc, price: prices[svc] ?? p.price }))
                          }}
                          className={inputClasses}
                        >
                          <option value="standard">Standard Turnover — $180</option>
                          <option value="premium">Premium Turnover — $220</option>
                          <option value="deep">Deep Clean — $350</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground block mb-1">Price ($)</label>
                        <input type="number" value={newBooking.price} onChange={e => setNewBooking(p => ({ ...p, price: e.target.value }))} className={inputClasses} />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground block mb-1">Date *</label>
                        <input type="date" value={newBooking.scheduledDate} onChange={e => setNewBooking(p => ({ ...p, scheduledDate: e.target.value }))} className={inputClasses} />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground block mb-1">Time *</label>
                        <input type="time" value={newBooking.scheduledTime} onChange={e => setNewBooking(p => ({ ...p, scheduledTime: e.target.value }))} className={inputClasses} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-foreground block mb-1">Notes</label>
                        <textarea value={newBooking.notes} onChange={e => setNewBooking(p => ({ ...p, notes: e.target.value }))} placeholder="Access code, special instructions..." rows={3} className={cn(inputClasses, 'h-auto py-3 resize-none')} />
                      </div>
                    </div>
                  </div>

                  {createError && (
                    <p className="text-sm text-destructive font-medium bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3">{createError}</p>
                  )}

                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" className="flex-1" onClick={() => { setShowNewBooking(false); setNewBooking(BLANK_BOOKING); setCreateError('') }}>
                      Cancel
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={createBooking}
                      disabled={creating || !newBooking.clientName || !newBooking.clientEmail || !newBooking.clientPhone || !newBooking.address || !newBooking.scheduledDate}
                    >
                      {creating ? 'Creating...' : 'Create Booking'}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
